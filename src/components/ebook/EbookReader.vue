<template>
<div class="ebook-reader">
    <div id="read"></div>
    <div id="control" @touchstart='touchStart' @touchend='touchEnd'></div>
</div>
</template>

<script>
import {
    ebookMixin
} from '../../utils/mixin.js'
import Epub from 'epubjs'
import {
    getFontFamily,
    saveFontFamily,
    saveFontSize,
    getFontSize,
    getTheme,
    saveTheme,
} from '../../utils/localStorage.js'
import {
    addCss
} from '../../utils/book.js'
import {
    setTimeout
} from 'timers';

// import { constants } from 'crypto';
global.ePub = Epub

export default {
    mixins: [ebookMixin],
    methods: {
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
        pageing(offsetX, time) {
            if (time < 500 && offsetX > 40) {
                this.nextPage()
            } else if (time < 500 && offsetX < -40) {
                this.prePage()
            } else {
                this.toggleTitleAndMenu()
            }
        },
        initFont() {
            // 初始化 fontFamily
            let font = getFontFamily()
            if (!font) {
                saveFontFamily(this.defaultFontFamily)
            } else {
                this.setDefaultFontFamily(font).then(() => {
                    setTimeout(() => {
                        this.currentBook.rendition.themes.font(this.defaultFontFamily)
                    }, 300)
                })
            }
            // 初始化 fontSize
            let fontSize = getFontSize()
            if (!fontSize) {
                saveFontSize(this.defaultFontSize)
            } else {
                this.setDefaultFontSize(fontSize).then(() => {
                    setTimeout(() => {
                        this.currentBook.rendition.themes.fontSize(this.defaultFontSize)
                    }, 300)
                })
            }
        },
        initTheme() {
            let defaultTheme = getTheme()
            if (!defaultTheme) {
                defaultTheme = this.themeList[0].name
                saveTheme(defaultTheme)
            } else {
                this.setDefaultTheme(defaultTheme)
            }
            this.themeList.forEach(theme => {
                // 注册样式
                this.rendition.themes.register(theme.name, theme.style)
            })
            this.rendition.themes.select(this.defaultTheme)
        },
        initRendition() {
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
            this.rendition.display().then(() => {
                this.initFont()
                this.initTheme()
                this.initGlobleStyle()
            })
        },
        initGesture() {
            // 绑定事件, epubjs v0.3 绑定事件方法 
            this.rendition.hooks.content.register((contents) => {
                const el = contents.document.documentElement
                this.bindEvents(el)
                // 加入字体
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/cabin.css`)
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/daysOne.css`)
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/montserrat.css`)
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/tangerine.css`)
                this.currentBook.rendition.themes.fontSize(this.defaultFontSize)
            })
        },
        initPagination() {
            // book 解析完以后
            this.book.ready.then(() => {
                // 解析目录
                this.setNavigation(this.currentBook.navigation)
                // 简单分页， 默认 750 页 * （屏幕宽度 / 默认宽度375） * (字号大小 / 默认字号16)
                return this.book.locations.generate(750 * (window.innerWidth / 375) * getFontSize() / 16)
            }).then((locations) => {
                this.setBookAvailable(true)
            })
        },
        initEpub() {
            this.initRendition()
            this.initGesture()
            this.initPagination()
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
