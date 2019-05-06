<template>
  <div class="ebook-reader">
      <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub

export default {
    computed: {
        // 混入 vuex 中的属性
        ...mapGetters(['fileName'])
    },
    methods: {
        initEpub() {
            // 本地资源路径
            const baseUrl = 'http://172.27.240.84:8081/'
            const resourceUrl = `${baseUrl}${this.fileName}.epub`
            // 显示图书
            this.book = new Epub(resourceUrl)
            this.rendition = this.book.renderTo('read', {
                width: innerWidth,
                height: innerHeight,
                method: 'defoult',
            })
            this.rendition.display()
        }
    },
    mounted() {
        const fileName = this.$route.params.fileName.split('|').join('/')
        // 调用 vuex 的 action，把 fileName 存入 vuex 方便组件们使用
        this.$store.dispatch('setFileName', fileName).then(() => {
            this.initEpub()
        })
    }
}

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import '../../assets/styles/global';
</style>