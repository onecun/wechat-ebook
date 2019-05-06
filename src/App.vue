<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    
}

// 设置 html 的字号， 方便统一适配移动端
document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
})
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
@import './assets/styles/global.scss';

#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
