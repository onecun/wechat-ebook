<template>
<div id="app">
    <router-view />
    <span class="text">123123</span>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['test'])
    },
    mounted() {
        this.$store.dispatch('setTest', 21).then(() => {
            console.log(this.test)
        })
    }
}

// 设置 html 的字号， 方便统一适配移动端
document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
})
</script>

<style lang='scss' scoped>
@import './assets/styles/global.scss';

.text {
    font-size: px2rem(30);
    color: orange;
}
</style>
