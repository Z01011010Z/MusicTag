<template>
    <screen ref='screen' :smartCSR="true" :keys="true">
        <topButtons></topButtons>
        <tags></tags>
        <songList></songList>
        <songPlayer></songPlayer>
        <newCategory></newCategory>
        <editCategory></editCategory>
        <config></config>
    </screen>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    import topButtons from "./components/topButtons.vue";
    import tags from './components/tags.vue'
    import songList from './components/songList.vue'
    import songPlayer from './components/songPlayer.vue'
    import newCategory from "./components/newCategory.vue";
    import editCategory from "./components/editCategory.vue";
    import config from "./components/config.vue";

    export default {
        name: 'app',
        components: {
            topButtons,
            newCategory,
            editCategory,
            tags,
            songList,
            songPlayer,
            config,
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
    }
</script>
