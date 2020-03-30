<template>
    <listtable
            ref='songList'
            :style='style'
            :data='playlist'
            :position='position'
            :border='border'
            :mouse='true'
            :keys='true'
            :interactive='true'
            :vi='true'
            :search='true'
            :tags='true'
            @select='pickSong'
    ></listtable>
</template>

<script>
    export default {
        name: 'songList',
        data: function () {
            return {}
        },
        mounted: function () {
            this.$refs.songList.on('select item', this.selectSong);
            this.$store.commit('setSelectedSong', 0);

            this.$refs.songList.on('mouseover', () => {
                this.$refs.songList.focus();
            });
        },
        methods: {
            selectSong() {
                const index = this.$refs.songList.selected - 1;
                this.$store.commit('setSelectedSong', index);
            },
            pickSong() {
                const index = this.$refs.songList.selected - 1; // Blessed list starts on 1!
                this.$store.dispatch('pickSong', index)
            }
        },
        computed: {
            playlist() {
                const headers = ['Title', 'Artist', 'Album', 'Duration'];
                const songs = this.$store.state.playlist.map(({id, title, artist, album, length}) => {
                    if (this.$store.state.playing) {
                        if (id === this.$store.state.currentSong.id) {
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
    }
</script>
