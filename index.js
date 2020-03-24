import Vue from 'blessed-vue'
import App from './app.vue'
import store from './store'

const el = Vue.dom.createElement();

Vue.dom.append(el);


Vue.mixin({
    methods: {
        formatTime(time) {
            const min = ~~(time / 60);
            const sec = time % 60 < 10 ? `0${~~(time % 60)}` : ~~(time % 60);
            return `${min}:${sec}`;
        },
        constrainStr(str, max) {
            max -= 3;
            return str.length > max ? str.substring(0, max) + '...' : str;
        },
        formatColor(str, color) {
            return `{${color}-fg}${str}{/${color}-fg}`;
        }
    }
});

export const EventBus = new Vue();

const instance = new Vue({
    name: 'app',
    components: {
        App
    },
    store,
    template: '<App />'
}).$mount(el)

