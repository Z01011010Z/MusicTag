import BlessedVue from 'blessed-vue'
import Vuex from 'vuex'

// File reader
const fs = require('fs');

// Song Player
const mpg = require('mpg123');
const player = new mpg.MpgPlayer();

// Song Metadata
const mm = require('music-metadata');

// DB
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

BlessedVue.use(Vuex);

// Drivers ENUM
const drivers = Object.freeze({
    LOCAL: 'local'
});

db.defaults({
    "songs": [],
    "categories": [],
    "config": {
        "libraryPath": `/home/${process.env.USER}/Music/`
    }
}).write();

const state = {
    db,
    driver: drivers.LOCAL,
    currentSong: null,
    selectedSong: null,
    categories: [],
    playlist: [],
    currentPlaylist: [],
    playing: false,
    currentSec: 0,
    currentIndexPlaying: null,
    currentIndexSelected: 0,
    shuffle: false,
};

const mutations = {
    setPlayingSong(state, index) { // TODO Should this accept a song object?
        state.playing = true;
        state.currentSec = 0;
        state.currentSong = state.currentPlaylist[index];
    },
    setCurrentIndexPlaying(state, index) {
        state.currentIndexPlaying = index;
    },
    setShuffle(state, value) {
        state.shuffle = value;
    },
    shufflePlaylist(state, index) {
        const copy = [...state.playlist];
        const currentSong = copy.splice(index, 1)[0]; // This removes the current song from the playlist and returns it
        const shuffled = shuffleArray(copy);
        state.currentPlaylist = [currentSong, ...shuffled];
    },
    setCurrentPlaylist(playlist) {
        state.currentPlaylist = playlist;
    },
    stopPlaying(state) {
        state.playing = false;
        state.currentIndexPlaying = null;
        state.currentSong = null;
        player.stop();
    },
    setSelectedSong(state, index) {
        state.currentIndexSelected = index;
        if (state.playlist.length > 0)
            state.selectedSong = state.playlist[index];
        else
            state.selectedSong = null;
    },
    setLibraryPath(state, path) {
        state.db.get('config').assign({'libraryPath': path}).write();
    },
    filterInclude(state, include) {
        for (const includeIds of Object.values(include)) {
            if (includeIds.length > 0) {
                state.playlist = state.playlist.filter(song =>
                    song.tags.some(songTag => includeIds.includes(songTag.id))
                );
            }
        }
    },
    filterExclude(state, exclude) {
        for (const excludeIds of Object.values(exclude)) {
            if (excludeIds.length > 0) {
                state.playlist = state.playlist.filter(song =>
                    !song.tags.some(songTag => excludeIds.includes(songTag.id))
                );
            }
        }
    },
    addTagToPlaylist(state, {tag, id}) {
        const song = state.playlist.find(song => song.id === id);
        if(song) song.tags.push(tag);
    },
    addTagToDB(state, {tag, id}) {
        state.db.get('songs').find({id}).get('tags').push(tag).write();
    },
    setEditCategory(state, category) { //TODO move to event
        state.editCategory = category;
    },
    async checkLocalLibrary(state) {
        // TODO MAKE MORE EFFICIENT
        let libraryPath = state.db.get('config.libraryPath').value();

        // Add slash if not include
        if (!libraryPath.endsWith('/'))
            libraryPath += '/';

        let songsInLibrary = [];
        if (fs.existsSync(libraryPath))
            songsInLibrary = fs.readdirSync(libraryPath);

        // Delete songs from db if not in library
        state.db.get('songs')
            .remove((song) => !songsInLibrary.includes(song.file))
            .write();

        // Filter new songs
        const newSongsPaths = songsInLibrary.filter(songPath =>
            !state.db.get('songs').map(song => song.file).value().includes(songPath)
        );

        // Add new songs to db
        let newSongs = [];
        for (const newSongPath of newSongsPaths) {
            const metadata = await mm.parseFile(libraryPath + newSongPath);
            newSongs.push({
                'id': shortid.generate(),
                'title': metadata.common.title || 'No Title',
                'artist': metadata.common.artist || 'No Artist',
                'album': metadata.common.album || 'No Album',
                'length': metadata.format.duration || 0,
                'file': newSongPath,
                'tags': []
            });
        }
        state.db.get('songs').push(...newSongs).write();

        const songs = state.db.get('songs').sortBy('title').value();
        state.playlist = songs;
        state.currentPlaylist = songs;
    }
};

const actions = {
    updateSongsCategory({state}, changes) {
        state.playlist.forEach(song => {
            song.tags.forEach((tag, index, tags) => {
                if (changes.tagsEdited.includes(tag.id)) {
                    tag.color = changes.color;
                    state.db.get('songs').find({id: song.id}).get('tags').find({id: tag.id}).assign({color: changes.color}).write();
                }
                if (changes.tagsDeleted.includes(tag.id)) {
                    tags.splice(index, 1);
                    state.db.get('songs').find({id: song.id}).get('tags').remove({id: tag.id}).write();
                }
                // TODO add logic for renamed
            });
        });
    },
    addTag({commit, state}, tag) {
        if (!state.selectedSong.tags.map(tag => tag.id).includes(tag.id)) {
            const id = state.selectedSong.id;

            // Add tag to playlist,
            commit('addTagToPlaylist', {tag, id});

            // Save tag to db
            commit('addTagToDB', {tag, id});
        }
    },
    removeTag({state}, tagId) {
        const id = state.selectedSong.id;

        // Remove from playlist
        let song = state.playlist.find(song => song.id === id);
        if (song) song.tags = song.tags.filter(tag => tagId !== tag.id);

        //Remove from selectedSong
        state.selectedSong.tags = state.selectedSong.tags.filter(tag => tagId !== tag.id);

        // Remove from db
        state.db.get('songs').find({id}).get('tags').remove({id: tagId}).write();
    },
    filterPlaylist({commit, state, getters}, filters) {
        state.playlist = state.db.get('songs').value();

        // Filter
        commit('filterInclude', filters.include);
        commit('filterExclude', filters.exclude);

        // Set selected to first
        commit('setSelectedSong', 0);

        // Update current playing
        if (state.playing) {
            const index = getters.currentSongIndex;
            if (index === -1)  // Not found in current playlist
                commit('stopPlaying');
            else
                commit('setCurrentIndexPlaying', index);
        }
    },
    pickSong({commit, state, dispatch}, index) {
        // index is the playlist index which is always in order
        if (state.shuffle) {
            // If shuffle option is active then each time a song is pick a new shuffled playlist is created
            // The picked song (index) must be the first one in the current playlist
            commit('shufflePlaylist', index);
            dispatch('playSong', 0)
        } else {
            // If the shuffle option is inactive then index of playlist === index of currentPlaylist
            dispatch('playSong', index)
        }
    },
    toggleShuffle({commit, state, getters}) {
        commit('setShuffle', !state.shuffle);
        if(state.playing) {
            if(state.shuffle) {
                // Shuffle the playlist setting the current song to the first one
                commit('shufflePlaylist', getters.currentSongIndex);
                commit('setCurrentIndexPlaying', 0);
            } else {
                // Set current playlist to playlist and set current index to the corresponding index
                commit('setCurrentPlaylist', state.playlist);
                commit('setPlayingSong', getters.currentSongIndex);
                commit('setCurrentIndexPlaying', getters.currentSongIndex);
            }
        }
    },
    playSong({commit, state}, index) {
        // index of the current playlist
        commit('setPlayingSong', index);
        commit('setCurrentIndexPlaying', index);
        const libraryPath = state.db.get('config.libraryPath').value();
        player.play(libraryPath + state.currentSong.file);
    },
    togglePlay({state}) {
        if (!state.currentSong) {
            state.playing = !state.playing;
            player.pause();
        }
    },
    prev({state, dispatch}) {
        if (state.playing) {
            if (state.currentSec > 10)
                player.seek(0);
            else if (state.currentIndexPlaying !== 0)
                dispatch('playSong', state.currentIndexPlaying - 1);
        }
    },
    next({state, dispatch}) {
        if (state.currentIndexPlaying < state.currentPlaylist.length - 1) {
            dispatch('playSong', state.currentIndexPlaying + 1);
        }
    },
};

const getters = {
    currentSongIndex: state => {
        return state.playlist.findIndex(song => song.id === state.currentSong.id);
    },
    songById: state => id => {
        return state.playlist.find(song => song.id === id);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

const shuffleArray = array => // I really wish to know how does this work
    [...Array(array.length)]
        .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
        .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

store.commit('checkLocalLibrary');

// Song Player Event Listener
player.on('frame', ([cFrame, rFrame, cTime, rTime]) => {
    store.state.currentSec = cTime;
});

player.on('format', () => {
    store.state.currentSong.length = player.length;
});

player.on('end', () => {
    if (store.state.playing)
        store.dispatch('next');
});

export default store;
