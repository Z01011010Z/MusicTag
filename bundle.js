(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_blessed_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(16);




const el = __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.dom.createElement();

__WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.dom.append(el);

__WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.$db = 'DB!';
__WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.prototype.$db = __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.$db;

__WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.mixin({
    data: () => {
        return {
            db: 'DB!!'
        }
    },
    methods: {
        formatTime(time) {
            const min = ~~(time / 60);
            const sec = time % 60 < 10 ? `0${~~(time % 60)}` : ~~(time % 60);
            return `${min}:${sec}`;
        },
        constrainStr(str, max) {
            max -= 3;
            return str.length > max ? str.substring(0, max) + '...' : str;
        },
        formatColor(str, color) {
            return `{${color}-fg}${str}{/${color}-fg}`;
        }
    }
});

const EventBus = new __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a();
/* harmony export (immutable) */ __webpack_exports__["EventBus"] = EventBus;


const instance = new __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a({
    name: 'app',
    components: {
        App: __WEBPACK_IMPORTED_MODULE_1__app_vue__["a" /* default */]
    },
    store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */],
    template: '<App />'
}).$mount(el)



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("blessed-vue");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_topButtons_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_tags_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_songPlayer_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_newCategory_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_editCategory_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_msg_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_local_songList_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_local_config_vue__ = __webpack_require__(19);
//
//
//
//
//
//
//
//
//
//
//
//
//




// Shared







// Local Driver



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'app',
    components: {
        topButtons: __WEBPACK_IMPORTED_MODULE_2__components_topButtons_vue__["a" /* default */],
        newCategory: __WEBPACK_IMPORTED_MODULE_5__components_newCategory_vue__["a" /* default */],
        editCategory: __WEBPACK_IMPORTED_MODULE_6__components_editCategory_vue__["a" /* default */],
        tags: __WEBPACK_IMPORTED_MODULE_3__components_tags_vue__["a" /* default */],
        songList: __WEBPACK_IMPORTED_MODULE_8__components_local_songList_vue__["a" /* default */],
        songPlayer: __WEBPACK_IMPORTED_MODULE_4__components_songPlayer_vue__["a" /* default */],
        config: __WEBPACK_IMPORTED_MODULE_9__components_local_config_vue__["a" /* default */],
        msg: __WEBPACK_IMPORTED_MODULE_7__components_msg_vue__["a" /* default */]
    },
    computed: {},
    methods: {},
    data: () => {
        return {};
    },
    mounted() {
        this.$refs.screen.key(['C-c'], () => {
            process.exit(0)
        });
    },
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'controls',
    methods: {
        prev() {
            this.$store.dispatch('prev');
        },
        togglePlay() {
            this.$store.dispatch('togglePlay');
        },
        next() {
            this.$store.dispatch('next');
        },
    },
    data: () => {
        return {
            style: {
                fg: 'blue',
                bg: 'normal',
                focus: { bg: 'lightblack' },
                hover: { bg: 'lightblack' },
            },
            border: { type: 'line', fg: 'cyan' },
            padding: { left: 1, right: 1 }
        }
    },
    computed: {
        playButtonText() {
            return this.$store.state.playing ? 'Pause' : 'Play ';
        }
    },
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'newCategory',
    mounted: function () {
        __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$on('setModal', ({modal, state}) => {
            if(modal === 'editCategory')
                this.hidden = state
        });

        __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$on('editCategory', (category) => {
            this.category = Object.assign({}, category);
            this.changes = { tagsEdited: [], tagsDeleted: [], tagsRenamed: [] };
            const colorIndex = this.colors.findIndex(color => color === category.color);
            this.$refs.categoryColor.select(colorIndex);
            this.$refs.categoryName.setValue(category.name);
        });
        this.$refs.categoryColor.on('select item', () => {
            this.currentColor = this.$refs.categoryColor.selected
        });
    },
    methods: {
        removeTag() {
            const tagIndex = this.$refs.categoryTags.selected;
            this.category.tags = this.category.tags.filter((tag, i) => {
                if (i === tagIndex) {
                    // Add to changes
                    this.changes.tagsDeleted.push(tag.id);
                    return false
                }
                return true
            });
        },
        addTag() {
            if (this.$refs.newTagInput.value) {
                const shortid = __webpack_require__(2);

                const tag = {
                    id: shortid.generate(),
                    selected: false,
                    name: this.$refs.newTagInput.value
                };

                this.category.tags = [...this.category.tags, tag]; // Push is not reactive
                this.$refs.newTagInput.value = '';
            }
        },
        toggleMode() {
            if (this.category.state === 'include') {
                this.category.state = 'exclude'
            } else {
                this.category.state = 'include'
            }
        },
        saveCategory() {
            const newColor = this.colors[this.$refs.categoryColor.selected];
            if (this.category.color !== newColor) {
                // Add to changes
                this.changes.color = newColor;
                this.changes.tagsEdited = [...this.category.tags.map(tag => tag.id)];
            }
            this.category.color = newColor;
            this.category.name = this.$refs.categoryName.value;

            this.$store.state.db.get('categories').find({id: this.category.id}).assign(this.category).write();
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('updateCategory', {category: this.category, changes: this.changes});
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('setModal', {modal: 'editCategory', state: true});
        },
        cancelCreate() {
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('setModal', {modal: 'editCategory', state: true});
        },
        deleteCategory() {
            this.changes.tagsDeleted = this.category.tags.map(tag => tag.id);
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('deleteCategory', {id: this.category.id, changes: this.changes});
        }
    },
    data: function () {
        return {
            hidden: true,
            category: {id: '', name: '', state: '', color: '', tags: []},
            colors: ['normal', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'],
            currentColor: 0,
            border: {type: 'line', fg: 'lightcyan', bg: 'black'},
            modalBorder: {type: '█', fg: 'green', bg: 'green'},
            changes: { tagsEdited: [], tagsDeleted: [], tagsRenamed: [] }
        }
    },
    computed: {
        getTags() {
            return this.category.tags.map(tag => tag.name);
        },
        categoryColorStyle() {
            return {
                selected: {fg: this.colors[this.currentColor]},
                label: {bg: 'black', fg: 'white', bold: true}
            }
        },
        defaultModeStyle() {
            return {
                bold: true,
                bg: 'black',
                fg: 'white',
                border: {fg: this.category.state === 'include' ? 'yellow' : 'magenta', bg: 'black'},
            }
        }
    }
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'configModal',
    mounted: function () {
        this.$refs.libraryPath.setValue(this.$store.state.db.get('config.libraryPath').value());
        __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$on('setModal', ({modal, state}) => {
            if(modal === 'config')
                this.hidden = state
        });
    },
    methods: {
        async saveLibraryPath() {
            await this.$store.commit('setLibraryPath', this.$refs.libraryPath.value);
            this.updateLibrary();
        },
        updateLibrary() {
            this.$store.commit('checkLibrary');
        },
        closeModal() {
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('setModal', {modal: 'config', state: true});
        }
    },
    data: function () {
        return {
            hidden: true,
            border: {type: 'line', fg: 'lightcyan', bg: 'black'},
            modalBorder: {type: '█', fg: 'lightblack', bg: 'lightblack'}
        }
    },
    computed: {
        libraryPath() {
            return this.$store.state.libraryPath;
        }
    }
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'songList',
    data: function () {
        return {}
    },
    mounted: function () {
        this.$refs.songList.on('select item', this.selectedSong);
        this.$store.commit('setSelectedSong', 0);

        this.$refs.songList.on('mouseover', () => {
            this.$refs.songList.focus();
        });
    },
    methods: {
        selectedSong() {
            const index = this.$refs.songList.selected - 1;
            this.$store.commit('setSelectedSong', index);
        },
        pickedSong() {
            const index = this.$refs.songList.selected - 1;
            this.$store.dispatch('playSong', index)
        }
    },
    computed: {
        playlist() {
            const headers = ['Title', 'Artist', 'Album', 'Duration'];
            const songs = this.$store.state.currentPlaylist.map(({title, artist, album, length}, index) => {
                if (this.$store.state.playing) {
                    if (index === this.$store.state.currentIndexPlaying) {
                        title = this.formatColor(title, 'yellow');
                    }
                }
                return [title, artist, album, this.formatTime(length)];
            });
            return [headers, ...songs];
        },
        style() {
            return {
                bg: "normal",
                fg: "normal",
                border: {type: 'line', fg: 'lightcyan'},
                label: {fg: 'white'},
                header: {
                    bold: true,
                    underline: true,
                    fg: 'blue',
                },
                cell: {
                    fg: 'normal',
                    bg: 'normal',
                    selected: {
                        bold: true,
                        fg: 'blue',
                        bg: 'black',
                    },
                    item: {
                        fg: 'normal',
                        bg: 'normal',
                    },
                },
                focus: {
                    border: {fg: 'cyan'},
                },
            }
        },
        position() {
            return {
                width: '70%',
                height: '100%-6',
                top: 0,
                right: 0
            }
        },
        border() {
            return {
                type: 'line',
                fg: 'lightcyan',
            }
        }
    },
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'msg',
    data: () => {
        return {
            hidden: true,
            border: {type: 'line', 'fg': 'blue'},
            style: {bg: 'black'}
        };
    },
    mounted() {
        __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$on('message', ({msg, isError}) => {
            this.hidden = false;
            if (isError)
                this.$refs.message.error(msg, 3, () => this.hidden = false);
            else
                this.$refs.message.log(msg, 3, () => this.hidden = false);
        })
    },
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'newCategory',
    mounted: function () {
        __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$on('setModal', ({modal, state}) => {
            if(modal === 'newCategory')
                this.hidden = state
        });

        this.$refs.categoryColor.on('select item', () => {
            this.currentColor = this.$refs.categoryColor.selected
        });
    },
    methods: {
        removeTag() {
            const tagIndex = this.$refs.categoryTags.selected;
            this.category.tags = this.category.tags.filter((_, i) => i !== tagIndex);
        },
        addTag() {
            if (this.$refs.newTagInput.value) {
                const shortid = __webpack_require__(2);

                const tag = {
                    id: shortid.generate(),
                    selected: false,
                    name: this.$refs.newTagInput.value
                };

                this.category.tags = [...this.category.tags, tag]; // Push is not reactive
                this.$refs.newTagInput.value = '';
            }
        },
        toggleMode() {
            if (this.category.state === 'include') {
                this.category.state = 'exclude'
            } else {
                this.category.state = 'include'
            }
        },
        saveCategory() {
            if(this.category.tags.length > 0 ) {
                const shortid = __webpack_require__(2);

                const category = {
                    'id': shortid.generate(),
                    'name': this.$refs.categoryName.value,
                    'state': this.category.state,
                    'color': this.colors[this.$refs.categoryColor.selected],
                    'tags': this.category.tags
                };

                this.$store.state.db.get('categories').push(category).write();

                __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('newCategory', category);
                this.hidden = true;
                this.reset();
            } else {
                __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('message', {msg: 'You must create at least one tag!', isError: true});
            }
        },
        cancelCreate() {
            this.hidden = true;
            this.reset();
        },
        reset() {
            this.category = { name: '', state: 'include', color: 'normal', tags: [] };
            this.$refs.categoryName.setValue('');
            this.$refs.categoryColor.select(0);
            this.currentColor = 0;
        }
    },
    data: function () {
        return {
            hidden: true,
            category: {
                name: '',
                state: 'include',
                color: 'normal',
                tags: []
            },
            colors: ['normal', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'],
            currentColor: 0,
            border: {type: 'line', fg: 'lightcyan', bg: 'black'},
            modalBorder: {type: '█', fg: 'green', bg: 'green'}
        }
    },
    computed: {
        getTags() {
            return this.category.tags.map(tag => tag.name);
        },
        categoryColorStyle() {
            return {
                selected: {fg: this.colors[this.currentColor]},
                label: {bg: 'black', fg: 'white', bold: true}
            }
        },
        defaultModeStyle() {
            return {
                bold: true,
                bg: 'black',
                fg: 'white',
                border: {fg: this.category.state === 'include' ? 'yellow' : 'magenta', bg: 'black'},
            }
        }
    }
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls_vue__ = __webpack_require__(17);
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'songPlayer',
    components: {
        controls: __WEBPACK_IMPORTED_MODULE_0__controls_vue__["a" /* default */]
    },
    methods: {},
    data: () => {
        return {
            barStyle: {
                bg: 'black',
                bar: {bg: 'blue'},
                focus: {border: {fg: "cyan"}},
                label: {fg: 'white'},
            },
            currentlyPlayingStyle: {
                focus: {border: {fg: "cyan"}},
                label: {fg: 'white',}
            },
            border: {
                type: 'line',
                fg: 'lightcyan',
            }
        }
    },
    computed: {
        progress() {
            if (!this.$store.state.currentSong) return 0;
            return (100 * this.$store.state.currentSec / this.$store.state.currentSong.length) | 0
        },
        currentTime() {
            if (!this.$store.state.currentSong) return '0:00';
            return this.formatTime(this.$store.state.currentSec);
        },
        maxTime() {
            if (!this.$store.state.currentSong) return '0:00';
            return this.formatTime(this.$store.state.currentSong.length);
        },
        currentSong() {
            return this.$store.state.currentSong || {title: 'No song playing'};
        },
    },
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'tags',
    methods: {
        updateCategory({category, changes}) {
            const index = this.categories.findIndex(c => c.id === category.id);
            this.categories[index] = category;
            this.categories = [...this.categories]; // Set so it reloads
            this.$store.dispatch('updateSongsCategory', changes);
        },
        addCategory(category) {
            const index = this.categories.length;
            this.categories = [...this.categories, category];

            // Children in v-for loop do not exist until next tick
            this.$nextTick(() => {
                this.addCategoryEvents(index, category);

                // Weird bug in which the items are duplicated until the element is re render ¯\_(ツ)_/¯
                this.$refs.category[0].emit('key t');
                this.$refs.category[0].emit('key t');

                this.$refs.currentTags.height = this.$refs.currentTags.parent.height - this.$refs.categorySelect.height - 9
            });
        },
        deleteCategory({id, changes}) {
            const index = this.categories.findIndex(category => category.id === id );
            this.$refs.category[index].destroy();
            this.categories = this.categories.filter(category => category.id !== id);
            this.$store.dispatch('updateSongsCategory', changes);
        },
        selectTag(tag) {
            const selectedCategory = this.categories[tag.parent.$.index];
            const selectedTag = selectedCategory.tags[tag.parent.selected];
            selectedTag.selected = !selectedTag.selected;

            if (selectedTag.selected) { // Add Tag
                this.filters[selectedCategory.state][selectedCategory.id].push(selectedTag.id);
            } else {
                this.filters[selectedCategory.state][selectedCategory.id].splice(this.filters[selectedCategory.state][selectedCategory.id].indexOf(selectedTag.id), 1)
            }

            this.$store.dispatch('filterPlaylist', this.filters)
        },
        addCategoryEvents(index, category) {
            this.filters.include[category.id] = [];
            this.filters.exclude[category.id] = [];

            this.$refs.category[index].$.index = index;

            this.$refs.category[index].on('mouseover', () => {
                this.$refs.category[index].focus();
            });

            this.$refs.category[index].on('key t', () => {
                category.state = category.state === 'include' ? 'exclude' : 'include';
            });

            this.$refs.category[index].on('key a', () => {
                const tagIndex = this.$refs.category[index].selected;
                const color = category.color;
                const {id, name} = this.categories[index].tags[tagIndex];
                const tag = {color, id, name};
                this.$store.dispatch('addTag', tag);
            });

            this.$refs.category[index].on('key e', () => {
                __WEBPACK_IMPORTED_MODULE_1__index__["EventBus"].$emit('editCategory', category);
                __WEBPACK_IMPORTED_MODULE_1__index__["EventBus"].$emit('setModal', {modal: 'editCategory', state: false});
            });
        }
    },
    data: () => {
        return {
            categories: [],
            filters: {
                include: {},
                exclude: {}
            },
            currentSongHeight: '50%'
        };
    },
    mounted: function () {
        __WEBPACK_IMPORTED_MODULE_1__index__["EventBus"].$on('newCategory', this.addCategory);
        __WEBPACK_IMPORTED_MODULE_1__index__["EventBus"].$on('deleteCategory', this.deleteCategory);
        __WEBPACK_IMPORTED_MODULE_1__index__["EventBus"].$on('updateCategory', this.updateCategory);

        this.categories = this.$store.state.db.get('categories').value();

        this.$refs.currentTags.on('key r', () => {
            const selected = this.$refs.currentTags.selected;
            const tag = this.$store.state.selectedSong.tags[selected];
            this.$store.dispatch('removeTag', tag.id)
        });

        this.$refs.currentTags.on('mouseover', () => {
            this.$refs.currentTags.focus();
        });


        // Children in v-for loop do not exist until next tick
        this.$nextTick(() => {
            for (let [index, category] of this.categories.entries()) {
                this.addCategoryEvents(index, category);
            }

            // Weird bug in which the items are duplicated until the element is re render ¯\_(ツ)_/¯
            if(this.categories.length > 0) {
                this.$refs.category[0].emit('key t');
                this.$refs.category[0].emit('key t');
            }

            this.$refs.currentTags.height = this.$refs.currentTags.parent.height - this.$refs.categorySelect.height - 9
        });
    },
    computed: {
        getCategories() {
            return this.categories.map(({id, name, state, tags, color}) => {
                const label = `${color !== 'normal' ? this.formatColor(name, color) : name} (${state === 'include' ? this.formatColor(state, 'yellow') : this.formatColor(state, 'magenta')})`;
                tags = tags.map(tag => ` [${tag.selected ? 'X' : ' '}] ${tag.name}`);
                const style = {
                    selected: {bold: true, bg: 'black'},
                    border: {fg: color,},
                    label: {bold: true}
                };
                return {id, label, tags, style}
            });
        },
        currentSongTags() {
            return this.$store.state.selectedSong ? this.$store.state.selectedSong.tags.map(tag => {
                return this.formatColor(tag.name, tag.color);
            }) : [];
        },
        style() {
            return {
                selected: {
                    bold: true,
                    bg: 'black'
                },
                label: {'fg': 'white'},
            }
        },
        border() {
            return {
                type: 'line',
                fg: 'lightcyan',
            }
        },
        scrollbar() {
            return {
                track: {bg: 'yellow',},
                style: {bg: 'lightblack',},
            }
        },
    },
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'topButtons',
    computed: {},
    methods: {
        newCategoryModal() {
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('setModal', {modal: 'newCategory', state: false});
        },
        config() {
            __WEBPACK_IMPORTED_MODULE_0__index__["EventBus"].$emit('setModal', {modal: 'config', state: false});
        }
    },
    data: () => {
        return {};
    },
    mounted() {}
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(5);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_381730fa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(29);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "f20f78da"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_381730fa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blessed_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_blessed_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);



// File reader
const fs = __webpack_require__(36);

// Song Player
const mpg = __webpack_require__(39);
const player = new mpg.MpgPlayer();

// Song Metadata
const mm = __webpack_require__(40);

// DB
const shortid = __webpack_require__(2);
const low = __webpack_require__(37);
const FileSync = __webpack_require__(38);
const adapter = new FileSync('db.json');
const db = low(adapter);

__WEBPACK_IMPORTED_MODULE_0_blessed_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

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
        state.db.read();
        state.db.get('songs').find({id}).get('tags').push(tag).write();
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
        const libraryPath = state.db.get('config.libraryPath').value();

        if (!libraryPath.endsWith('/'))
            libraryPath += '/';

        let songsInLibrary = [];
        if (fs.existsSync(libraryPath))
            songsInLibrary = fs.readdirSync(libraryPath);

        // Borrar canciones que ya no existen
        state.db.get('songs')
            .remove((song) => {
                return !songsInLibrary.includes(song.file)
            }).write();

        // Filtrar nuevas canciones
        const newSongsPaths = songsInLibrary.filter(songPath =>
            !state.db.get('songs').map(song => song.file).value().includes(songPath)
        );

        // Agregar nuevas
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

// actions are functions that cause side effects and can involve
// asynchronous operations.
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

// getters are functions
const getters = {};

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
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
/* harmony default export */ __webpack_exports__["a"] = (store);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_controls_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_405feff1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_controls_vue__ = __webpack_require__(31);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "fa6ca7fe"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_controls_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_405feff1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_controls_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/controls.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_editCategory_vue__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ecd7be3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editCategory_vue__ = __webpack_require__(33);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "e24aa01a"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_editCategory_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ecd7be3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editCategory_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/editCategory.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_config_vue__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ad1a3be_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_config_vue__ = __webpack_require__(26);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "3aa46231"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_config_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ad1a3be_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_config_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/local/config.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_songList_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48a0e81c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_songList_vue__ = __webpack_require__(32);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "4d3ffc02"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_songList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48a0e81c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_songList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/local/songList.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_msg_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5693d4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_msg_vue__ = __webpack_require__(27);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "e8ac9ff4"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_msg_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5693d4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_msg_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/msg.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_newCategory_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a572f45a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_newCategory_vue__ = __webpack_require__(35);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "3bba8fc3"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_newCategory_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a572f45a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_newCategory_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/newCategory.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_songPlayer_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c0f94d1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_songPlayer_vue__ = __webpack_require__(28);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "7afa8ce1"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_songPlayer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c0f94d1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_songPlayer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/songPlayer.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_tags_vue__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53e5bd54_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tags_vue__ = __webpack_require__(34);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "0c300164"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_tags_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53e5bd54_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tags_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/tags.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_topButtons_vue__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d255de7_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_topButtons_vue__ = __webpack_require__(30);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "e7df5412"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_topButtons_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d255de7_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_topButtons_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/topButtons.vue"

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "box",
    {
      ref: "modalNewCategory",
      staticStyle: { bg: "black", "border.bg": "lightblack" },
      attrs: {
        width: "40%",
        height: "80%",
        left: "center",
        top: "center",
        border: _vm.modalBorder,
        hidden: _vm.hidden
      }
    },
    [
      _c("text", {
        staticStyle: {
          fg: "lightblack",
          bg: "black",
          bold: "true",
          underline: "true"
        },
        attrs: { height: 1, left: "center", top: 1, content: "Config" }
      }),
      _vm._v(" "),
      _c("textbox", {
        ref: "libraryPath",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true"
        },
        attrs: {
          inputOnFocus: true,
          left: 3,
          top: 4,
          height: 3,
          width: "70%-3",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          label: "Library Path"
        }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "saveLibraryPathButton",
        staticStyle: {
          fg: "cyan",
          bg: "black",
          bold: "true",
          "border.fg": "cyan",
          "border.bg": "black"
        },
        attrs: {
          right: 3,
          top: 4,
          height: 3,
          width: "30%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Save"
        },
        on: { press: _vm.saveLibraryPath }
      }),
      _vm._v(" "),
      _c(
        "text",
        { attrs: { left: 3, width: "100%-7", top: 7, border: _vm.border } },
        [
          _vm._v(
            "\n        Thank you for using MusicTag!\n\n        * How add tags:\n        Hover over the tag in the category and press 'a'\n        * How to remove tags:\n        Select the tag in the \"Current Tags\" and press 'r'\n        * How to edit a category:\n        Hover over the category and press 'e'\n        * How to toggle between modes of filtering\n        Hover over a category and press 't'\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c("button", {
        ref: "updateLibrariesButton",
        staticStyle: {
          fg: "cyan",
          bg: "black",
          bold: "true",
          "border.fg": "cyan",
          "border.bg": "black"
        },
        attrs: {
          left: "center",
          bottom: 6,
          height: 3,
          width: "30%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Update Library"
        },
        on: { press: _vm.updateLibrary }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "closeConfigButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          left: "center",
          bottom: 2,
          height: 3,
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Close"
        },
        on: { press: _vm.closeModal }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("message", {
    ref: "message",
    attrs: {
      bottom: 1,
      left: 2,
      width: "25%",
      height: "15%",
      border: _vm.border,
      hidden: _vm.hidden
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "box",
    {
      staticStyle: { bg: "red" },
      attrs: { bottom: 0, width: "100%", ",": "", height: 6 }
    },
    [
      _c(
        "progressbar",
        {
          style: _vm.barStyle,
          attrs: {
            border: _vm.border,
            height: 3,
            width: "100%",
            filled: _vm.progress
          }
        },
        [
          _c("text", {
            staticStyle: { fg: "white" },
            attrs: {
              top: -1,
              left: "center",
              height: 1,
              content: _vm.currentTime + " / " + _vm.maxTime
            }
          })
        ]
      ),
      _vm._v(" "),
      _c("text", {
        style: _vm.currentlyPlayingStyle,
        attrs: {
          label: "Currently Playing",
          border: _vm.border,
          bottom: 0,
          width: "100%-19",
          height: 3,
          content: _vm.currentSong.title
        }
      }),
      _vm._v(" "),
      _c("controls")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "screen",
    { ref: "screen", attrs: { smartCSR: true, keys: true } },
    [
      _c("topButtons"),
      _vm._v(" "),
      _c("tags"),
      _vm._v(" "),
      _c("songList"),
      _vm._v(" "),
      _c("songPlayer"),
      _vm._v(" "),
      _c("newCategory"),
      _vm._v(" "),
      _c("editCategory"),
      _vm._v(" "),
      _c("config"),
      _vm._v(" "),
      _c("msg")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("box", { attrs: { width: "30%", height: 3 } }, [
    _c("button", {
      staticStyle: {
        "border.fg": "lightblack",
        fg: "lightblack",
        bold: "true"
      },
      attrs: {
        width: "35%",
        border: "line",
        mouse: true,
        keys: true,
        interactive: true,
        align: "center",
        content: "Config"
      },
      on: { press: _vm.config }
    }),
    _vm._v(" "),
    _c("button", {
      staticStyle: { "border.fg": "green", fg: "green", bold: "true" },
      attrs: {
        width: "65%",
        left: "35%",
        border: "line",
        mouse: true,
        keys: true,
        interactive: true,
        align: "center",
        content: "Create New Category"
      },
      on: { press: _vm.newCategoryModal }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "layout",
    {
      attrs: {
        layout: "inline-block",
        bottom: 0,
        right: 0,
        width: 19,
        ",": "",
        height: 3
      }
    },
    [
      _c("button", {
        style: _vm.style,
        attrs: { mouse: true, height: 3, border: _vm.border, content: "Prev" },
        on: { press: _vm.prev }
      }),
      _vm._v(" "),
      _c("button", {
        style: _vm.style,
        attrs: {
          mouse: true,
          height: 3,
          border: _vm.border,
          content: _vm.playButtonText
        },
        on: { press: _vm.togglePlay }
      }),
      _vm._v(" "),
      _c("button", {
        style: _vm.style,
        attrs: { mouse: true, height: 3, border: _vm.border, content: "Next" },
        on: { press: _vm.next }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("listtable", {
    ref: "songList",
    style: _vm.style,
    attrs: {
      data: _vm.playlist,
      position: _vm.position,
      border: _vm.border,
      mouse: true,
      keys: true,
      interactive: true,
      vi: true,
      search: true,
      tags: true
    },
    on: { select: _vm.pickedSong }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "box",
    {
      ref: "modalEditCategory",
      staticStyle: { bg: "black", "border.bg": "blue" },
      attrs: {
        width: "40%",
        height: "80%",
        left: "center",
        top: "center",
        border: _vm.modalBorder,
        hidden: _vm.hidden
      }
    },
    [
      _c("text", {
        staticStyle: {
          fg: "blue",
          bg: "black",
          bold: "true",
          underline: "true"
        },
        attrs: { height: 1, left: "center", top: 1, content: "Edit Category" }
      }),
      _vm._v(" "),
      _c("textbox", {
        ref: "categoryName",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true"
        },
        attrs: {
          inputOnFocus: true,
          left: 3,
          top: 4,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          label: "Category Name"
        }
      }),
      _vm._v(" "),
      _c("list", {
        ref: "categoryColor",
        style: _vm.categoryColorStyle,
        attrs: {
          mouse: true,
          keys: true,
          interactive: true,
          right: 3,
          top: 4,
          height: 3,
          width: "50%-4",
          border: _vm.border,
          label: "Category Color",
          align: "center",
          content: _vm.category.color,
          items: _vm.colors
        }
      }),
      _vm._v(" "),
      _c("list", {
        ref: "categoryTags",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true",
          "selected.bg": "black"
        },
        attrs: {
          mouse: true,
          keys: true,
          interactive: true,
          left: 3,
          top: 8,
          height: "100%-18",
          width: "50%-4",
          border: _vm.border,
          label: "Category Tags",
          align: "center",
          items: _vm.getTags
        }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "defaultModeButton",
        style: _vm.defaultModeStyle,
        attrs: {
          right: 3,
          top: 8,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          tags: true,
          align: "center",
          content:
            "Default mode: " +
            (_vm.category.state === "include"
              ? _vm.formatColor(_vm.category.state, "yellow")
              : _vm.formatColor(_vm.category.state, "magenta"))
        },
        on: { press: _vm.toggleMode }
      }),
      _vm._v(" "),
      _c("textbox", {
        ref: "newTagInput",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true"
        },
        attrs: {
          inputOnFocus: true,
          right: 3,
          bottom: 8,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          label: "New Tag"
        }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "newTagButton",
        staticStyle: {
          fg: "cyan",
          bg: "black",
          bold: "true",
          "border.fg": "cyan",
          "border.bg": "black"
        },
        attrs: {
          right: 3,
          bottom: 5,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Add Tag"
        },
        on: { press: _vm.addTag }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "deleteTagButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          left: 3,
          bottom: 5,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Delete Tag"
        },
        on: { press: _vm.removeTag }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "cancelButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          left: 8,
          bottom: 1,
          height: 3,
          width: "25%",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Cancel"
        },
        on: { press: _vm.cancelCreate }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "saveCategoryButton",
        staticStyle: {
          fg: "green",
          bg: "black",
          bold: "true",
          "border.fg": "green",
          "border.bg": "black"
        },
        attrs: {
          left: "center",
          bottom: 1,
          height: 3,
          width: "25%",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Save Category"
        },
        on: { press: _vm.saveCategory }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "deleteButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          right: 8,
          bottom: 1,
          height: 3,
          width: "25%",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Delete"
        },
        on: { press: _vm.deleteCategory }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "box",
    { attrs: { width: "30%", height: "100%-9", top: 3 } },
    [
      _c(
        "layout",
        {
          ref: "categorySelect",
          attrs: { layout: "inline-block", width: "100%", height: "50%" }
        },
        _vm._l(_vm.getCategories, function(category) {
          return _c("list", {
            key: category.id,
            ref: "category",
            refInFor: true,
            style: category.style,
            attrs: {
              label: category.label,
              items: category.tags,
              mouse: true,
              keys: true,
              interactive: true,
              width: "50%",
              height: category.tags.length + 2,
              border: "line",
              scrollbar: _vm.scrollbar,
              tags: true
            },
            on: { select: _vm.selectTag }
          })
        }),
        1
      ),
      _vm._v(" "),
      _c("list", {
        ref: "currentTags",
        style: _vm.style,
        attrs: {
          items: _vm.currentSongTags,
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          label: "Current Tags",
          width: "100%",
          height: _vm.currentSongHeight,
          bottom: 0,
          scrollbar: _vm.scrollbar,
          border: _vm.border,
          tags: true
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "box",
    {
      ref: "modalNewCategory",
      staticStyle: { bg: "black", "border.bg": "green" },
      attrs: {
        width: "40%",
        height: "80%",
        left: "center",
        top: "center",
        border: _vm.modalBorder,
        hidden: _vm.hidden
      }
    },
    [
      _c("text", {
        staticStyle: {
          fg: "green",
          bg: "black",
          bold: "true",
          underline: "true"
        },
        attrs: { height: 1, left: "center", top: 1, content: "New Category" }
      }),
      _vm._v(" "),
      _c("textbox", {
        ref: "categoryName",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true"
        },
        attrs: {
          inputOnFocus: true,
          left: 3,
          top: 4,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          label: "Category Name"
        }
      }),
      _vm._v(" "),
      _c("list", {
        ref: "categoryColor",
        style: _vm.categoryColorStyle,
        attrs: {
          mouse: true,
          keys: true,
          interactive: true,
          right: 3,
          top: 4,
          height: 3,
          width: "50%-4",
          border: _vm.border,
          label: "Category Color",
          align: "center",
          items: _vm.colors
        }
      }),
      _vm._v(" "),
      _c("list", {
        ref: "categoryTags",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true",
          "selected.bg": "black"
        },
        attrs: {
          mouse: true,
          keys: true,
          interactive: true,
          left: 3,
          top: 8,
          height: "100%-18",
          width: "50%-4",
          border: _vm.border,
          label: "Category Tags",
          align: "center",
          items: _vm.getTags
        }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "defaultModeButton",
        style: _vm.defaultModeStyle,
        attrs: {
          right: 3,
          top: 8,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          tags: true,
          align: "center",
          content:
            "Default mode: " +
            (_vm.category.state == "include"
              ? _vm.formatColor(_vm.category.state, "yellow")
              : _vm.formatColor(_vm.category.state, "magenta"))
        },
        on: { press: _vm.toggleMode }
      }),
      _vm._v(" "),
      _c("textbox", {
        ref: "newTagInput",
        staticStyle: {
          "label.bg": "black",
          "label.fg": "white",
          "label.bold": "true"
        },
        attrs: {
          inputOnFocus: true,
          right: 3,
          bottom: 8,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          border: _vm.border,
          label: "New Tag"
        }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "newTagButton",
        staticStyle: {
          fg: "cyan",
          bg: "black",
          bold: "true",
          "border.fg": "cyan",
          "border.bg": "black"
        },
        attrs: {
          right: 3,
          bottom: 5,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Add Tag"
        },
        on: { press: _vm.addTag }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "deleteTagButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          left: 3,
          bottom: 5,
          height: 3,
          width: "50%-4",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Delete Tag"
        },
        on: { press: _vm.removeTag }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "cancelButton",
        staticStyle: {
          fg: "red",
          bg: "black",
          bold: "true",
          "border.fg": "red",
          "border.bg": "black"
        },
        attrs: {
          left: "15%-2",
          bottom: 1,
          height: 3,
          width: "35%",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Cancel"
        },
        on: { press: _vm.cancelCreate }
      }),
      _vm._v(" "),
      _c("button", {
        ref: "saveCategoryButton",
        staticStyle: {
          fg: "green",
          bg: "black",
          bold: "true",
          "border.fg": "green",
          "border.bg": "black"
        },
        attrs: {
          left: "50%+2",
          bottom: 1,
          height: 3,
          width: "35%",
          mouse: true,
          keys: true,
          interactive: true,
          align: "center",
          border: _vm.border,
          content: "Save Category"
        },
        on: { press: _vm.saveCategory }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("mpg123");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("music-metadata");

/***/ })
/******/ ])));