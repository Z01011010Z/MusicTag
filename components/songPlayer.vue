<template>
    <box :bottom='0' width="100%" , :height='6' style='bg: red'>
        <progressbar :style='barStyle' :border='border' :height='3' width='100%' :filled='progress'>
            <text style="fg: white;" :top='-1' left='center' :height='1' :content="`${currentTime} / ${maxTime}`"/>
        </progressbar>
        <text label='Currently Playing' :border='border' :style='currentlyPlayingStyle' :bottom='0' width='100%-19'
              :height='3' :content="currentSong.title"/>
        <controls></controls>
    </box>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    import controls from './controls.vue';

    export default {
        name: 'songPlayer',
        components: {
            controls
        },
        methods: {},
        data: () => {
            return {}
        },
        computed: {
            progress() {
                if (this.$store.state.maxSec === 0) return 0;
                return (100 * this.$store.state.currentSec / this.$store.state.maxSec) | 0
            },
            currentTime() {
                return this.formatTime(this.$store.state.currentSec);
            },
            maxTime() {
                return this.formatTime(this.$store.state.maxSec);
            },
            currentSong() {
                return this.$store.state.currentSong;
            },
            barStyle() {
                return {
                    bg: 'black',
                    bar: {bg: 'blue'},
                    focus: {border: {fg: "cyan"}},
                    label: {fg: 'white'},
                }
            },
            border() {
                return {
                    type: 'line',
                    fg: 'lightcyan',
                }
            },
            currentlyPlayingStyle() {
                return {
                    focus: {border: {fg: "cyan"}},
                    label: {fg: 'white',}
                }
            }
        },
    }
</script>
