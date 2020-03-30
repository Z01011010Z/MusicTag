<template>
    <box :bottom='0' width="100%" , :height='6' style='bg: red'>
        <progressbar :style='barStyle' :border='border' :height='3' width='100%' :filled='progress'>
            <text style="fg: white;" :top='-1' left='center' :height='1' :content="`${currentTime} / ${maxTime}`"/>
        </progressbar>
        <text label='Currently Playing' :border='border' :style='currentlyPlayingStyle' :bottom='0' width='100%-33'
              :height='3' :content="currentSong.title"/>
        <controls></controls>
    </box>
</template>

<script>
    import controls from './controls.vue';

    export default {
        name: 'songPlayer',
        components: {
            controls
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
    }
</script>
