import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    themeList,
    addCss,
} from './book.js'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList() {
            return themeList(this)
        },
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        initGlobleStyle() {
            let themes = {
                'Default': `${process.env.VUE_APP_RES_URL}/theme/default.css`,
                'Eye': `${process.env.VUE_APP_RES_URL}/theme/eye.css`,
                'Gold': `${process.env.VUE_APP_RES_URL}/theme/grace.css`,
                'Night': `${process.env.VUE_APP_RES_URL}/theme/night.css`,
            }
            addCss(themes[this.defaultTheme])
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            // 同时隐藏 设置栏
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
    },
}
