<template>
<transition name="slide-up">
    <div class="setting-bar" v-show="menuVisible && settingVisible === 2">
        <div class="setting-progress">
            <div class="progress-wrapper">
                <div class="read-percentage-wrapper">
                    <span class="read-percentage-text">111</span>
                    <span class="icon-forward"></span>
                </div>
                <div class="progress-icon-wrapper">
                    <span class="icon-back" @click="prevSection()"></span>
                </div>
                <input class="progress" type="range"
                                            max="100"
                                            min="0"
                                            step="1"
                                            @change="onProgressChange($event.target.value)"
                                            @input="onProgressInput($event.target.value)"
                                            :value="progress"
                                            :disabled="!bookAvailable"
                                            ref="progress">
                <div class="progress-icon-wrapper">
                    <span class="icon-forward" @click="nextSection()"></span>
                </div>
            </div>
            <div class="text-wrapper">
                <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {
    ebookMixin
} from '../../../utils/mixin.js'

export default {
    mixins: [ebookMixin],
    methods: {
        onProgressChange(progress) {
            this.setProgress(progress).then(() => {
                this.displayProgress()
            }).then(() => {
                this.updateProgressBg()
            })
        },
        onProgressInput(progress) {
            this.setProgress(progress).then(() => {
                this.updateProgressBg()
            })
        },
        displayProgress() {
            // 获取指定 百分比的 cfi
            const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
            // 渲染这个 cfi
            this.currentBook.rendition.display(cfi)
        },
        updateProgressBg() {
            let input = this.$refs.progress
            input.setAttribute('style', `background-size: ${this.progress}% 100%`)
        },
        nextSection() {},
        prevSection() {},
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

    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;

        .progress-wrapper {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 px2rem(15);
            @include center;

            .read-percentage-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                font-size: px2rem(12);
                height: px2rem(40);
                width: 100%;
                @include center;
            }

            .progress-icon-wrapper {
                font-size: px2rem(20);
            }

            .progress {
                width: 100%;
                appearance: none;
                height: px2rem(2);
                background: linear-gradient(#999, #999) no-repeat, #ddd;
                // background-size: 30% 100% !important;
                margin: 0 px2rem(15);

                &:focus {
                    outline: none;
                }

                &::-webkit-slider-thumb {
                    appearance: none;
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
                    border: px2rem(1) solid #ddd;
                }

                &::-moz-range-thumb {
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
                    border: px2rem(1) solid #ddd;
                }
            }
        }

        .text-wrapper {
            position: absolute;
            left: 0;
            bottom: px2rem(10);
            width: 100%;
            color: #333;
            font-size: px2rem(12);
            text-align: center;
        }
    }
}
</style>
