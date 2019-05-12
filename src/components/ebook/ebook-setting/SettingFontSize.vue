<template>
<transition name="slide-up">
    <div class="setting-bar" v-show="menuVisible && settingVisible === 0">
        <div class="setting-font-size">
            <div class="preview small-a" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
            <div class="select">
                <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
                    <div class="line"></div>
                    <div class="point-wrapper">
                        <div class="point" v-show="defaultFontSize === item.fontSize">
                            <div class="small-point"></div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="preview large-a" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>
        <div class="setting-font-family" @click="showFontFamilyPopup">
            <div class="setting-font-family-text-wrapper">
                <span class="setting-font-family-text">{{ defaultFontFamily }}</span>
            </div>
            <div class="setting-font-family-icon-wrapper">
                <span class="icon-forward"></span>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {
    ebookMixin
} from '../../../utils/mixin.js'
import {
    FONT_SIZE_LIST
} from '../../../utils/book.js'
import { saveFontSize } from '../../../utils/localStorage.js'


export default {
    mixins: [ebookMixin],
    data() {
        return {
            fontSizeList: FONT_SIZE_LIST,
        }
    },
    methods: {
        setFontSize(fontSize) {
            this.setDefaultFontSize(fontSize)
            // 缓存字号到本地
            saveFontSize(fontSize)
            // 使用 epubjs 提供的方法
            this.currentBook.rendition.themes.fontSize(fontSize)
        },
        showFontFamilyPopup() {
            this.setFontFamilyVisible(true)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global';

.setting-bar {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    height: px2rem(90);
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 101;

    .setting-font-size {
        flex: 2;
        display: flex;
        height: 100%;

        .preview {
            flex: 0 0 px2rem(40);
            @include center;
        }

        .select {
            flex: 1;
            display: flex;

            .select-wrapper {
                &:first-child {
                    .line {
                        &:first-child {
                            border-top: none;
                        }
                    }
                }

                &:last-child {
                    .line {
                        &:last-child {
                            border-top: none;
                        }
                    }
                }

                flex: 1;
                display: flex;
                align-items: center;

                .line {
                    flex: 1;
                    height: 0;
                    border-top: px2rem(1) solid #ccc;
                }

                .point-wrapper {
                    position: relative;
                    flex: 0 0 0;
                    width: 0;
                    height: px2rem(7);
                    border-left: px2rem(1) solid #ccc;

                    .point {
                        position: absolute;
                        top: px2rem(-6);
                        left: px2rem(-8);
                        width: px2rem(18);
                        height: px2rem(18);
                        border-radius: 50%;
                        border: px2rem(1) solid #ccc;
                        box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
                        background: white;
                        @include center;

                        .small-point {
                            height: px2rem(5);
                            width: px2rem(5);
                            background: #000;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }

    .setting-font-family {
        flex: 1;
        display: flex;
        @include center;
        font-size: px2rem(14); 
        .setting-font-family-text-wrapper {
            @include center;
        }
        .setting-font-family-icon-wrapper {
            @include center;
        }
    }

}
</style>
