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

// Song
// {
//  'title': 'Song Title',
//  'artist': 'Song Artist',
//  'album': 'Song Album',
//  'length': 'Song Length',
//  'file': 'song.mp3',
//  'tags': ['Tag 1', 'Tag 2']
// }

// Categories
// {
//  'name': 'Category 1'
//  'tags': [
//      {'name': 'Tag 1', 'Color': 'red'}
//  ]
// }


db.defaults({
    "songs": [],
    "categories": [],
    "config": {
        "libraryPath": `/home/${process.env.USER}/Music/`
    }
}).write();

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    libraryPath: db.get('config.libraryPath').value(),
    currentSong: {
        title: 'No Song Selected',
    },
    selectedSong: {
        tags: []
    },
    categories: [],
    playlist: [],
    currentPlaylist: [],
    playing: false,
    currentSec: 0,
    maxSec: 0,
    currentIndexPlaying: 0,
    currentIndexSelected: 0,
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    setSong(state, index) {
        state.playing = true;
        state.currentIndexPlaying = index;
        state.currentSong = state.currentPlaylist[index];
    },
    stopPlaying(state) {
        state.playing = false;
        state.currentSec = 0;
        state.maxSec = 0;
        state.currentIndexPlaying = -1;
        state.currentSong = {title: 'No Song Selected'};
        player.stop();
    },
    setSelectedSong(state, index) {
        state.currentIndexSelected = index;
        if (state.currentPlaylist.length > 0) {
            state.selectedSong = state.currentPlaylist[index];
        } else {
            state.selectedSong = {tags: []};
        }
    },
    addToPlaylist(state, song) {
        state.currentPlaylist.push(song);
    },
    setPlaylist(state, songs) {
        state.playlist = songs;
        state.currentPlaylist = songs;
    },
    setLibraryPath(state, path) {
        state.libraryPath = path;
        db.get('config').assign({'libraryPath': path}).write();
    },
    setCategories(state, categories) {
        state.categories = categories;
    },
    filterInclude(state, include) {
        for (const includeIds of Object.values(include)) {
            if (includeIds.length > 0) {
                state.currentPlaylist = state.currentPlaylist.filter(song => {
                    return song.tags.some(songTag => includeIds.includes(songTag.id))
                });
            }
        }
    },
    filterExclude(state, exclude) {
        for (const excludeIds of Object.values(exclude)) {
            if (excludeIds.length > 0) {
                state.currentPlaylist = state.currentPlaylist.filter(song => {
                    return !song.tags.some(songTag => excludeIds.includes(songTag.id))
                });
            }
        }
    },
    addTagToPlaylist(state, {tag, id}) {
        state.playlist.find(song => song.id === id).tags.push(tag);
    },
    addTagToDB(state, {tag, id}) {
        db.read();
        db.get('songs').find({id}).get('tags').push(tag).write();
    },
    setModal(state, {modal, visibility}) {
        state.modals[modal] = visibility;
    },
    setEditCategory(state, category) {
        state.editCategory = category;
    },
    async checkLibrary(state) {
        // TODO METODO NADA EFICIENTE
        // Add slash if not include
        if (!state.libraryPath.endsWith('/'))
            state.libraryPath += '/';

        let songsInLibrary = [];
        if (fs.existsSync(state.libraryPath))
            songsInLibrary = fs.readdirSync(state.libraryPath);

        // Borrar canciones que ya no existen
        db.get('songs')
            .remove((song) => {
                return !songsInLibrary.includes(song.file)
            }).write();

        // Filtrar nuevas canciones
        const newSongsPaths = songsInLibrary.filter(songPath =>
            !db.get('songs').map(song => song.file).value().includes(songPath)
        );

        // Agregar nuevas
        let newSongs = [];
        for (const newSongPath of newSongsPaths) {
            const metadata = await mm.parseFile(state.libraryPath + newSongPath);
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
        db.get('songs').push(...newSongs).write();

        db.read();
        const songs = db.get('songs').sortBy('title').value();
        state.playlist = songs;
        state.currentPlaylist = songs;
    }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
        updateSongsCategory({state}, changes) {
            db.read();
            state.playlist.forEach(song => {
                song.tags.forEach((tag, index, tags) => {
                    if (changes.tagsEdited.includes(tag.id)) {
                        tag.color = changes.color;
                        db.get('songs').find({id: song.id}).get('tags').find({id: tag.id}).assign({color: changes.color}).write();
                    }
                    if (changes.tagsDeleted.includes(tag.id)) {
                        tags.splice(index, 1);
                        db.get('songs').find({id: song.id}).get('tags').remove({id: tag.id}).write();
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
            db.read();
            const id = state.selectedSong.id;

            // Remove from playlist
            let songTags = state.playlist.find(song => song.id === id).tags;
            songTags = songTags.filter(tag => tagId !== tag.id);

            //Remove from selectedSong
            state.selectedSong.tags = state.selectedSong.tags.filter(tag => tagId !== tag.id);

            // Remove from db
            db.get('songs').find({id}).get('tags').remove({id: tagId}).write();
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
                    commit('setSong', index);
                }
            }
        },
        playSong({commit, state}, index) {
            commit('setSong', index);
            player.play(state.libraryPath + state.currentSong.file);
            state.maxSec = player.length;
        },
        togglePlay({state}) {
            if (state.currentSong.file) {
                state.playing = !state.playing;
                player.pause();
            }
        },
        prev({state, dispatch}) {
            if (state.currentSec > 10) {
                player.seek(0);
            } else {
                if (state.currentIndexPlaying !== 0) {
                    dispatch('playSong', state.currentIndexPlaying - 1);
                }
            }
        },
        next({state, dispatch}) {
            if (state.currentIndexPlaying < state.currentPlaylist.length - 1) {
                dispatch('playSong', state.currentIndexPlaying + 1);
            }
        },
    }
;

// getters are functions
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
    store.state.maxSec = player.length;
});

player.on('end', () => {
    if (store.state.playing) {
        store.dispatch('next');
    }
});

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default store;
