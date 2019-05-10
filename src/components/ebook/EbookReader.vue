<template>
<div class="ebook-reader">
    <div id="read"></div>
    <div id="control" @touchstart='touchStart' @touchend='touchEnd'></div>
</div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin.js'
import Epub from 'epubjs'
import { constants } from 'crypto';
global.ePub = Epub

export default {
    mixins: [ebookMixin],
    methods: {
        bindEvents(el) {
            if (el) {
                el.addEventListener('touchstart', (event) => {
                    this.touchStart(event)
                })
                el.addEventListener('touchend', (event) => {
                    this.touchEnd(event)
                })
            }
        },
        prePage() {
            if (this.rendition) {
                this.rendition.prev()
                this.hideTitleAndMenu()
            }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next()
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu() {
            if (this.menuVisible) {
                this.setSettingVisible(-1)
                this.setFontFamilyVisible(false)                
            }
            this.setMenuVisible(!this.menuVisible)
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            // 同时隐藏 设置栏
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        pageing(offsetX, time) {
            if (time < 500 && offsetX > 40) {
                this.nextPage()
            } else if (time < 500 && offsetX < -40) {
                this.prePage()
            } else {
                this.toggleTitleAndMenu()
            }
        },
        initEpub() {
            const me = this
            // 本地资源路径
            const baseUrl = 'http://172.27.240.84:8081/'
            const resourceUrl = `${baseUrl}${this.fileName}.epub`

            // 显示图书 epubjs v0.3 api
            // 传入地址
            this.book = new Epub(resourceUrl)
            this.setCurrentBook(this.book)
            // 配置
            this.rendition = this.book.renderTo('read', {
                width: innerWidth,
                height: innerHeight,
                method: 'default'
            })
            // 显示
            this.rendition.display()
            // 绑定事件, epubjs v0.3 绑定事件方法 
            this.rendition.hooks.content.register((contents) => {
                const el = contents.document.documentElement
                me.bindEvents(el)
                // 加入字体
                Promise.all([
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/cabin.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/daysOne.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/montserrat.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/tangerine.css`),
                ]).then(() => {
                    console.log('字体加载完成。。。')
                })
            })

        },
        // touch 时，获取 手指 的初始位置和时间
        touchStart(event) {
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
        },
        // 手指抬起时，获取 手指的 末位置和时间, 并计算如何翻页
        touchEnd(event) {
            this.touchEndX = event.changedTouches[0].clientX
            this.touchEndTime = event.timeStamp
            const offsetX = this.touchStartX - this.touchEndX
            const time = this.touchEndTime - this.touchStartTime
            // 翻页，显示菜单
            this.pageing(offsetX, time)
            // 禁止事件默认方法调用和传播
            event.preventDefault()
            event.stopPropagation()
        },
    },
    mounted() {
        const fileName = this.$route.params.fileName.split('|').join('/')
        // 调用 vuex 的 action，把 fileName 存入 vuex 方便组件们使用
        this.setFileName(fileName).then(() => {
            // 初始化，显示书籍
            this.initEpub()
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

</style>
