<template>
<div>
    <transition name="slide-up">
        <div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}">
            <div class="icon-wrapper">
                <span class="icon-menu" @click="showSetting(3)"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-progress" @click="showSetting(2)"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-bright" @click="showSetting(1)"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-A" @click="showSetting(0)"></span>
            </div>
        </div>
    </transition>
    <setting-font-size></setting-font-size>
    <setting-font-family></setting-font-family>
    <setting-theme></setting-theme>
    <setting-progress></setting-progress>
    <ebook-contents></ebook-contents>
</div>
</template>

<script>
import {
    ebookMixin
} from '../../utils/mixin.js'
import SettingFontSize from './ebook-setting/SettingFontSize.vue'
import SettingFontFamily from './ebook-setting/SettingFontFamily.vue'
import SettingTheme from './ebook-setting/SettingTheme.vue'
import SettingProgress from './ebook-setting/SettingProgress.vue'
import EbookContents from './EbookContents.vue'

export default {
    mixins: [ebookMixin],
    components: {
        SettingFontSize,
        SettingFontFamily,
        SettingTheme,
        SettingProgress,
        EbookContents,
    },
    methods: {
        showSetting(key) {
            this.setSettingVisible(key)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    display: flex;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    background: white;
    z-index: 102;
    font-size: px2rem(20);

    .icon-wrapper {
        flex: 1;
        @include center;

        .icon-progress {
            font-size: px2rem(24);
        }
    }

    &.hide-box-shadow {
        box-shadow: none;
    }
}
</style>
