<template>
<transition name="slide-up">
    <div class="setting-bar" v-show="menuVisible && settingVisible === 1">
        <div class="setting-theme">
            <div class="setting-theme-item" v-for="(item, index) in themeList" :key='index' @click="setTheme(index)">
                <div class="preview" :style="{background: item.style.body.background}" :class="{selected: item.name === defaultTheme}"></div>
                <div class="text" :class="{selected: item.name === defaultTheme}">{{item.alias}}</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {
    ebookMixin
} from '../../../utils/mixin.js'
import { saveTheme } from '../../../utils/localStorage.js'

export default {
    mixins: [ebookMixin],
    methods: {
        setTheme(index) {
            const name = this.themeList[index].name
            this.setDefaultTheme(name).then(() => {
                this.currentBook.rendition.themes.select(this.defaultTheme)
                saveTheme(this.defaultTheme)
                this.initGlobleStyle()
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global';

.setting-bar {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    height: px2rem(90);
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 101;

    .setting-theme {
        display: flex;
        height: 100%;
        .setting-theme-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: px2rem(5);
            .preview {
                flex: 1;
                border: px2rem(1) solid #ccc;
                &.selected {
                    box-shadow: 0 px2rem(4) px2rem(6) rgba($color: #000, $alpha: 0.1);
                }
            }
            .text {
                flex: 0 0 px2rem(20);
                font-size: px2rem(14);
                color: #ccc;
                @include center;

                &.selected {
                    color: #333;
                }
            }
        }
    }

}
</style>
