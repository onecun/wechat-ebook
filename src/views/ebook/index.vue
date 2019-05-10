<template>
  <div class="ebook">
      <ebook-reader></ebook-reader>
      <ebook-title></ebook-title>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader.vue'
import EbookTitle from '../../components/ebook/EbookTitle.vue'
import EbookMenu from '../../components/ebook/EbookMenu.vue'

export default {
    components: {
        EbookReader,
        EbookTitle,
        EbookMenu,
    },
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import '../../assets/styles/global';
</style>