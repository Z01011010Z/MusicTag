<template>
    <box ref="modalEditCategory" width="40%" height="80%" left="center" top="center" :border="modalBorder"
         style="bg: black; border.bg: blue" :hidden="hidden">
        <text :height="1" left="center" :top="1"
              style="fg: blue; bg: black; bold: true; underline: true"
              content="Edit Category"/>
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
              :content="category.color"
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
                :content="`Default mode: ${category.state === 'include' ? formatColor(category.state, 'yellow') : formatColor(category.state, 'magenta')}`"/>
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
                :left="8" :bottom="1" :height="3" width="25%"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: red; bg: black; bold: true; border.fg: red; border.bg: black"
                align="center"
                :border="border"
                @press="cancelCreate"
                content="Cancel"/>
        <button ref="saveCategoryButton"
                left="center" :bottom="1" :height="3" width="25%"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: green; bg: black; bold: true; border.fg: green; border.bg: black"
                align="center"
                :border="border"
                @press="saveCategory"
                content="Save Category"/>
        <button ref="deleteButton"
                :right="8" :bottom="1" :height="3" width="25%"
                :mouse="true" :keys='true' :interactive='true'
                style="fg: red; bg: black; bold: true; border.fg: red; border.bg: black"
                align="center"
                :border="border"
                @press="deleteCategory"
                content="Delete"/>
    </box>
</template>
<script>
    import {EventBus} from "../index";

    export default {
        name: 'newCategory',
        mounted: function () {
            EventBus.$on('setModal', ({modal, state}) => {
                if(modal === 'editCategory')
                    this.hidden = state
            });

            EventBus.$on('editCategory', (category) => {
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
                const newColor = this.colors[this.$refs.categoryColor.selected];
                if (this.category.color !== newColor) {
                    // Add to changes
                    this.changes.color = newColor;
                    this.changes.tagsEdited = [...this.category.tags.map(tag => tag.id)];
                }
                this.category.color = newColor;
                this.category.name = this.$refs.categoryName.value;

                const low = require('lowdb');
                const FileSync = require('lowdb/adapters/FileSync');
                const adapter = new FileSync('db.json');
                const db = low(adapter);

                db.get('categories').find({id: this.category.id}).assign(this.category).write();
                EventBus.$emit('updateCategory', {category: this.category, changes: this.changes});
                EventBus.$emit('setModal', {modal: 'editCategory', state: true});
            },
            cancelCreate() {
                EventBus.$emit('setModal', {modal: 'editCategory', state: true});
            },
            deleteCategory() {
                this.changes.tagsDeleted = this.category.tags.map(tag => tag.id);
                EventBus.$emit('deleteCategory', {id: this.category.id, changes: this.changes});
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
    }
</script>