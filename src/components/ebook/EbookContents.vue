<template>
<transition name="fade-slide-right">
    <div class="slide-content-wrapper" v-show="settingVisible === 3">
        <div class="content">
            <div class="content-title">目录</div>
            <div class="content-page-wrapper">
                <div class="content-wrapper" v-if="bookAvailable">
                    <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href, index)">
                        <span class="text">{{item.label}}</span>
                    </div>
                </div>
                <div class="empty" v-else>加载中...</div>
            </div>
        </div>
        <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
</transition>
</template>

<script>
import {
    ebookMixin
} from '../../utils/mixin.js'

export default {
    mixins: [ebookMixin],
    methods: {
        jumpTo(href, index) {
            log(href, index + 1)
            this.setSection(index + 1)
            this.setProgress(Math.floor((this.section) / (this.currentBook.spine.length - 1) * 100))
            this.currentBook.rendition.display(href)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.slide-content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
    display: flex;
    width: 100%;
    height: 100%;

    .content {
        flex: 0 0 75%;
        width: 75%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;

        .content-title {
            width: 70%;
            height: px2rem(20);
            font-size: px2rem(20);
            padding: px2rem(12);
            border-bottom: px2rem(1) solid #333;
            box-shadow: 0 px2rem(3) 0 rgba($color: #000000, $alpha: 0.1);
        }

        .content-page-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;            
            .content-wrapper {
                width: 100%;
                height: 100%;
                overflow: auto;
                .content-item {
                    width: 100%;
                    font-size: px2rem(20);
                    border-bottom: px2rem(1) solid rgba($color: #000000, $alpha: 0);
                    .text {
                        width: 70%;
                        padding: 0 px2rem(10);
                        font-size: px2rem(12);
                        @include ellipsis;
                    }
                }
            }

            .empty {
                width: 100%;
                height: 100%;
                @include center;
                font-size: px2rem(14);
            }
        }
    }

    .content-bg {
        flex: 0 0 25%;
        width: 25%;
        height: 100%;
        opacity: 0;
    }
}
</style>
