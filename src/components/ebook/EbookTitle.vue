<template>
  <div>
      <transition name="slide-down">
        <div class="title-wrapper" v-show="menuVisible">
            <div class="left">
                <span class="icon-back" @click="back"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-shelf"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-cart"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more"></span>
                </div>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin.js'

export default {
    mixins: [ebookMixin],
    methods: {
        back() {
            console.log('back')
        }
    }
}

</script>
<style lang='scss' scoped>
@import '../../assets/styles/global';

.title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(48);
        display: flex;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
        background: white;
        font-size: px2rem(20);
        .left {
            flex: 0 0 px2rem(60);
            @include center;
        }
        .right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper {
                flex: 0 0 px2rem(40);
                @include center;
                .icon-shelf, {
                    font-size: px2rem(22);
                }
            }
        }
    }
</style>