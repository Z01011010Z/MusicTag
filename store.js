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
};

const mutations = {
    setPlayingSong(state, index) {
        state.playing = true;
        state.currentSec = 0;
        state.currentIndexPlaying = index;
        state.currentSong = state.currentPlaylist[index];
    },
    stopPlaying(state) {
        state.playing = false;
        state.currentIndexPlaying = null;
        state.currentSong = null;
        player.stop();
    },
    setSelectedSong(state, index) {
        state.currentIndexSelected = index;
        if (state.currentPlaylist.length > 0)
            state.selectedSong = state.currentPlaylist[index];
        else
            state.selectedSong = null;

    },
    setPlaylist(state, songs) {
        state.playlist = songs;
        state.currentPlaylist = songs;
    },
    setLibraryPath(state, path) {
        state.db.get('config').assign({'libraryPath': path}).write();
    },
    filterInclude(state, include) {
        for (const includeIds of Object.values(include)) {
            if (includeIds.length > 0) {
                state.currentPlaylist = state.currentPlaylist.filter(song =>
                    song.tags.some(songTag => includeIds.includes(songTag.id))
                );
            }
        }
    },
    filterExclude(state, exclude) {
        for (const excludeIds of Object.values(exclude)) {
            if (excludeIds.length > 0) {
                state.currentPlaylist = state.currentPlaylist.filter(song =>
                    !song.tags.some(songTag => excludeIds.includes(songTag.id))
                );
            }
        }
    },
    addTagToPlaylist(state, {tag, id}) {
        state.playlist.find(song => song.id === id).tags.push(tag);
    },
    addTagToDB(state, {tag, id}) {
        state.db.get('songs').find({id}).get('tags').push(tag).write();
    },
    setEditCategory(state, category) {
        state.editCategory = category;
    },
    async checkLibrary(state) {
        // TODO MAKE MORE EFFICIENT
        // Add slash if not include
        const libraryPath = state.db.get('config.libraryPath').value();

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
                'title': metadata.common.title,
                'artist': metadata.common.artist,
                'album': metadata.common.album,
                'length': metadata.format.duration,
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
            let songTags = state.playlist.find(song => song.id === id).tags;
            songTags = songTags.filter(tag => tagId !== tag.id);

            //Remove from selectedSong
            state.selectedSong.tags = state.selectedSong.tags.filter(tag => tagId !== tag.id);

            // Remove from db
            state.db.get('songs').find({id}).get('tags').remove({id: tagId}).write();
        },
        filterPlaylist({commit, state}, filters) {
            state.currentPlaylist = [...state.playlist]; //Copy playlist

            // Filter
            commit('filterInclude', filters.include);
            commit('filterExclude', filters.exclude);

            // Set selected to first
            commit('setSelectedSong', 0);

            // Update current playing
            if (state.playing) {
                const index = state.currentPlaylist.findIndex(song => song.id === state.currentSong.id);
                if (index === -1) { // Not found in current playlist
                    commit('stopPlaying');
                } else {
                    commit('setPlayingSong', index);
                }
            }
        },
        playSong({commit, state}, index) {
            commit('setPlayingSong', index);
            const libraryPath = state.db.get('config.libraryPath').value();
            player.play(libraryPath + state.currentSong.file);
        },
        togglePlay({state}) {
            if (state.currentSong.file) {
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
    }
;

const getters = {};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

store.commit('checkLibrary');

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

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default store;
