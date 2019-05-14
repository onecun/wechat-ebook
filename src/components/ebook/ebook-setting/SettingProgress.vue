<template>
<transition name="slide-up">
    <div class="setting-bar" v-show="menuVisible && settingVisible === 2">
        <div class="setting-progress">
            <div class="progress-wrapper">
                <div class="read-chapter-wrapper">
                    <span class="read-chapter-text">{{ fileName.split('/')[1] }}</span>
                </div>
                <div class="progress-icon-wrapper" @click="prevSection()">
                    <span class="icon-back"></span>
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
                <div class="progress-icon-wrapper" @click="nextSection()">
                    <span class="icon-forward"></span>
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
    computed: {
        // 本书的 章节数
        sectionNum() {
            return this.currentBook.spine.length - 1
        },
        // 章节在书中的 百分比位置
        percenList() {
            let percenList = []
            for (let i = 0; i < this.sectionNum; i++) {
                percenList.push(Math.floor(i / this.sectionNum * 100))
            }
            return percenList
        },
    },
    methods: {
        onProgressChange(progress) {
            this.setProgress(progress).then(() => {
                this.displayProgress()
                this.updateProgressBg()
            })
        },
        onProgressInput(progress) {
            this.setProgress(progress).then(() => {
                this.updateProgressBg()
            })
        },
        // 显示指定 百分比位置的内容
        displayProgress() {
            // 获取指定 百分比的 cfi
            const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
            // 渲染这个 cfi
            this.currentBook.rendition.display(cfi)
            // set section
            this.setSectionsPercent()
        },
        // 更新 百分比条 的视图
        updateProgressBg() {
            let input = this.$refs.progress
            input.setAttribute('style', `background-size: ${this.progress}% 100%`)
        },
        nextSection() {
            // this.section 是全局的 当前章节
            if (this.section < this.sectionNum && this.bookAvailable) {
                this.setSection(this.section + 1).then(() => {
                    this.displaySection()
                })
            }
        },
        prevSection() {
            if (this.section > 0 && this.bookAvailable) {
                this.setSection(this.section - 1).then(() => {
                    this.displaySection()
                })
            }
        },
        // 显示指定章节
        displaySection() {
            // 获取章节信息
            let sectionInfo = this.currentBook.section(this.section)
            // 跳转
            if (sectionInfo && sectionInfo.href) {
                this.currentBook.rendition.display(sectionInfo.href).then(() => {
                    // 获取当前百分比
                    let progress = Math.floor(this.section / this.sectionNum * 100)
                    this.setProgress(progress)
                })
            }
        },
        // 跳转章节后，设置章节数
        setSectionsPercent() {
            for (let i = 0; i < this.percenList.length; i++) {
                if (this.progress >= this.percenList[i] && this.progress < this.percenList[i + 1]) {
                    this.setSection(i)
                }
            }
        },
    },
    updated() {
        this.updateProgressBg()
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

            .read-chapter-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                font-size: px2rem(12);
                height: px2rem(40);
                width: 100%;
                @include center;

                .read-chapter-text {
                    @include ellipsis;
                }
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

                // chrome 适配
                &::-webkit-slider-thumb {
                    appearance: none;
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
                    border: px2rem(1) solid #ddd;
                }

                // firefox 适配
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
