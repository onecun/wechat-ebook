<template>
<div class="home">
    <div id="read"></div>
    <span class="icon-back"></span>
    <span class="icon-add"></span>
</div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub

// const log = function () {
//     return console.log.apply(console, arguments)
// }

export default {
}
</script>

<style scoped>
    .icon-add {
        font-size: 50px;
        color: red;
    }
</style>
