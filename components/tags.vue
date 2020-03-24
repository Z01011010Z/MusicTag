<template>
    <box width='30%' height='100%-9' :top="3">
        <layout ref='categorySelect' layout='inline-block' width='100%' height='50%'>
            <list v-for="category in getCategories"
                  :key="category.id"
                  ref="category"
                  :label="category.label"
                  :items="category.tags"
                  :mouse='true' :keys='true' :interactive='true'
                  width="50%" :height="category.tags.length + 2"
                  :style='category.style'
                  border='line'
                  :scrollbar='scrollbar'
                  :tags='true'
                  @select="selectTag"/>
        </layout>
        <list
                ref="currentTags"
                :items="currentSongTags"
                :mouse='true'
                :keys='true'
                :interactive='true'
                align='center'
                label='Current Tags'
                width='100%' :height='currentSongHeight'
                :bottom='0'
                :style='style'
                :scrollbar='scrollbar'
                :border="border"
                :tags='true'/>
    </box>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {EventBus} from "../index";

    export default {
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
                    EventBus.$emit('editCategory', category);
                    EventBus.$emit('setModal', {modal: 'editCategory', state: false});
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
            EventBus.$on('newCategory', this.addCategory);
            EventBus.$on('deleteCategory', this.deleteCategory);
            EventBus.$on('updateCategory', this.updateCategory);

            const low = require('lowdb');

            const FileSync = require('lowdb/adapters/FileSync');
            const adapter = new FileSync('db.json');
            const db = low(adapter);
            db.read();

            this.categories = db.get('categories').value();

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
                    const label = `${this.formatColor(name, color)} (${state === 'include' ? this.formatColor(state, 'yellow') : this.formatColor(state, 'magenta')})`;
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
                return this.$store.state.selectedSong.tags.map(tag => {
                    return this.formatColor(tag.name, tag.color);
                });
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
    }
</script>
