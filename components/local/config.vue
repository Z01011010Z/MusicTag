<template>
    <box ref="modalNewCategory" width="40%" height="80%" left="center" top="center" :border="modalBorder"
         style="bg: black; border.bg: lightblack" :hidden="hidden">
        <text :height="1" left="center" :top="1"
              style="fg: lightblack; bg: black; bold: true; underline: true"
              content="Config"/>
        <textbox ref="libraryPath"
                 :inputOnFocus="true"
                 :left="3" :top="4" :height="3" width="70%-3"
                 :mouse="true" :keys='true' :interactive='true'
                 style="label.bg: black; label.fg: white; label.bold: true"
                 :border="border"
                 label="Library Path"/>
        <button ref="saveLibraryPathButton"
                :right="3" :top="4" :height="3" width="30%-4"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: cyan; bg: black; bold: true; border.fg: cyan; border.bg: black"
                align="center"
                :border="border"
                @press="saveLibraryPath"
                content="Save"/>
        <text :left="3" width="100%-7" :top="7" :border="border">
            Thank you for using MusicTag!

            * How add tags:
            Hover over the tag in the category and press 'a'
            * How to remove tags:
            Select the tag in the "Current Tags" and press 'r'
            * How to edit a category:
            Hover over the category and press 'e'
            * How to toggle between modes of filtering
            Hover over a category and press 't'
        </text>
        <button ref="updateLibrariesButton"
                left="center" :bottom="6" :height="3" width="30%-4"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: cyan; bg: black; bold: true; border.fg: cyan; border.bg: black"
                align="center"
                :border="border"
                @press="updateLibrary"
                content="Update Library"/>
        <button ref="closeConfigButton"
                left="center" :bottom="2" :height="3"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: red; bg: black; bold: true; border.fg: red; border.bg: black"
                align="center"
                :border="border"
                @press="closeModal"
                content="Close"/>
    </box>
</template>

<script>
    import {EventBus} from "../../index";

    export default {
        name: 'configModal',
        mounted: function () {
            this.$refs.libraryPath.setValue(this.$store.state.db.get('config.libraryPath').value());
            EventBus.$on('setModal', ({modal, state}) => {
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
                EventBus.$emit('setModal', {modal: 'config', state: true});
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
    }
</script>