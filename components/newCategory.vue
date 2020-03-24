<template>
    <box ref="modalNewCategory" width="40%" height="80%" left="center" top="center" :border="modalBorder" style="bg: black; border.bg: green" :hidden="hidden">
        <text :height="1" left="center" :top="1"
              style="fg: green; bg: black; bold: true; underline: true"
              content="New Category"/>
        <textbox ref="categoryName"
                 :inputOnFocus="true"
                 :left="3" :top="4" :height="3" width="50%-4"
                 :mouse="true" :keys='true' :interactive='true'
                 style="label.bg: black; label.fg: white; label.bold: true"
                 :border="border"
                 label="Category Name"/>
        <list ref="categoryColor"
              :mouse="true" :keys="true" :interactive="true"
              :right="3" :top="4" :height="3" width="50%-4"
              :style="categoryColorStyle"
              :border="border"
              label="Category Color"
              align="center"
              :items="colors"/>
        <list ref="categoryTags"
              :mouse="true" :keys="true" :interactive="true"
              :left="3" :top="8" height="100%-18" width="50%-4"
              style="label.bg: black; label.fg: white; label.bold: true; selected.bg: black"
              :border="border"
              label="Category Tags"
              align="center"
              :items="getTags"/>
        <button ref="defaultModeButton"
                :right="3" :top="8" :height="3" width="50%-4"
                :mouse="true" :keys='true' :interactive='true'
                :border="border"
                :style="defaultModeStyle"
                :tags="true"
                align="center"
                @press="toggleMode"
                :content="`Default mode: ${category.state == 'include' ? formatColor(category.state, 'yellow') : formatColor(category.state, 'magenta')}`"/>
        <textbox ref="newTagInput"
                 :inputOnFocus="true"
                 :right="3" :bottom="8" :height="3" width="50%-4"
                 :mouse="true" :keys='true' :interactive='true'
                 style="label.bg: black; label.fg: white; label.bold: true"
                 :border="border"
                 label="New Tag"/>
        <button ref="newTagButton"
                :right="3" :bottom="5" :height="3" width="50%-4"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: cyan; bg: black; bold: true; border.fg: cyan; border.bg: black"
                align="center"
                :border="border"
                @press="addTag"
                content="Add Tag"/>
        <button ref="deleteTagButton"
                :left="3" :bottom="5" :height="3" width="50%-4"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: red; bg: black; bold: true; border.fg: red; border.bg: black"
                align="center"
                :border="border"
                @press="removeTag"
                content="Delete Tag"/>
        <button ref="cancelButton"
                left="15%-2" :bottom="1" :height="3" width="35%"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: red; bg: black; bold: true; border.fg: red; border.bg: black"
                align="center"
                :border="border"
                @press="cancelCreate"
                content="Cancel"/>
        <button ref="saveCategoryButton"
                left="50%+2" :bottom="1" :height="3" width="35%"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: green; bg: black; bold: true; border.fg: green; border.bg: black"
                align="center"
                :border="border"
                @press="saveCategory"
                content="Save Category"/>
    </box>
</template>
<script>
    import {EventBus} from "../index";

    export default {
        name: 'newCategory',
        mounted: function () {
            EventBus.$on('setModal', ({modal, state}) => {
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
                    const shortid = require('shortid');

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
                const shortid = require('shortid');

                const category = {
                    'id': shortid.generate(),
                    'name': this.$refs.categoryName.value,
                    'state': this.category.state,
                    'color': this.colors[this.$refs.categoryColor.selected],
                    'tags': this.category.tags
                };

                const low = require('lowdb');
                const FileSync = require('lowdb/adapters/FileSync');
                const adapter = new FileSync('db.json');
                const db = low(adapter);
                db.get('categories').push(category).write();

                EventBus.$emit('newCategory', category);
                this.hidden = true;
                this.reset();
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
    }
</script>