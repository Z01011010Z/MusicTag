<template>
    <layout layout='inline-block' :bottom='0' :right='0' :width="19", :height='3'>
        <button :style="style" @press='prev' :mouse='true' :height='3' :border='border' content="Prev" />
        <button @press='togglePlay' :mouse='true' :height='3' :border='border' :style='style' :content="playButtonText" />
        <button @press='next' :mouse='true' :height='3' :border='border' :style='style' content="Next" />
    </layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
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
        }
    },
    computed: {
        playButtonText() {
            return this.$store.state.playing ? 'Pause' : 'Play ';
        },
        style() {
            return {
                fg: 'blue',
                bg: 'normal',
                focus: { bg: 'lightblack' },
                hover: { bg: 'lightblack' },
            }
        },
        border() {
            return {
                type: 'line',
                fg: 'cyan',
            }
        },
        padding() {
            return { left: 1, right: 1 }
        }
    },
}
</script>
