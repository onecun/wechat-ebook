<template>
<transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
        <div class="ebook-popup-title">
            <div class="ebook-popup-title-icon" @click="hide">
                <span class="icon-down2"></span>
            </div>
            <div class="ebook-popup-title-text">选择字体</div>
        </div>
        <div class="ebook-popup-list-wrapper">
            <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
                <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{ item.font}}</div>
                <div class="ebook-popup-item-check" v-if="isSelected(item)">
                    <span class="icon-check"></span>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { ebookMixin } from '../../../utils/mixin.js'
import { FONT_FAMILY } from '../../../utils/book.js'
import { saveFontFamily } from '../../../utils/localStorage.js'

export default {
    mixins: [ebookMixin],
    data() {
        return {
            fontFamilyList: FONT_FAMILY,
        }
    },
    methods: {
        setFontFamily(font) {
            this.setDefaultFontFamily(font)
            // 缓存到 localSorage 中
            saveFontFamily(this.fileName, font)
            // 使用 epubjs 提供的方法改变字体
            if (font === 'Default') {
                this.currentBook.rendition.themes.font('Arial')
            } else {
                this.currentBook.rendition.themes.font(font)
            }
        },
        isSelected(item) {
            // 判断默认字体是否是当前选中的 
            return item.font === this.defaultFontFamily
        },
        hide() {
            this.setFontFamilyVisible(false)
        }
    },
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import '../../../assets/styles/global';
.ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
    text-align: center;
    background: white;
    .ebook-popup-title {
        position: relative;
        padding: px2rem(15);
        box-sizing: border-box;
        border-bottom: px2rem(1) solid #b8b9bb;
        text-align: center;
        width: 100%;
        @include center;
        
        .ebook-popup-title-icon {
            position: absolute;
            left: px2rem(15);
            top: 0;
            font-weight: bold;
            height: 100%;
            font-size: px2rem(16);
            @include center;
        }
        .ebook-popup-title-text {
            font-size: px2rem(14);
            font-weight: bold;
        }
    }
    .ebook-popup-list-wrapper{
        .ebook-popup-item {
            display: flex;
            font-size: px2rem(14);
            padding: px2rem(15);
            .ebook-popup-item-text {
                flex: 1;
                text-align: left;
                &.selected {
                    color: #346cb9;
                }  
            }
            .ebook-popup-item-check {
                flex: 1;
                text-align: right;
                font-weight: bold;
                color: #346cb9;
            }
        }
    }
}
</style>