<template>
    <box width="30%" :height="3">
        <button width="35%"
                border="line"
                style="border.fg: lightblack; fg: lightblack; bold: true"
                :mouse='true' :keys='true' :interactive='true'
                align="center"
                @press="config"
                content="Config"/>
        <button width="65%" left="35%"
                border="line"
                style="border.fg: green; fg: green; bold: true"
                :mouse='true' :keys='true' :interactive='true'
                align="center"
                @press="newCategoryModal"
                content="Create New Category"/>
    </box>
</template>
<script>
    import {EventBus} from "../index";

    export default {
        name: 'topButtons',
        computed: {},
        methods: {
            newCategoryModal() {
                EventBus.$emit('setModal', {modal: 'newCategory', state: false});
            },
            config() {
                EventBus.$emit('setModal', {modal: 'config', state: false});
            }
        },
        data: () => {
            return {};
        },
        mounted() {}
    }
</script>
</script>