<template>
    <message ref="message" :bottom="1" :left="2" width="25%" height="15%" :border="border" :hidden="hidden"/>
</template>

<script>
    import {EventBus} from "../index";

    export default {
        name: 'msg',
        data: () => {
            return {
                hidden: true,
                border: {type: 'line', 'fg': 'blue'},
                style: {bg: 'black'}
            };
        },
        mounted() {
            EventBus.$on('message', ({msg, isError}) => {
                this.hidden = false;
                if (isError)
                    this.$refs.message.error(msg, 3, () => this.hidden = false);
                else
                    this.$refs.message.log(msg, 3, () => this.hidden = false);
            })
        },
    }
</script>
