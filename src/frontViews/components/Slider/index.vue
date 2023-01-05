<template>
    <div class="el-menu-slider" @mouseover="pause()" @mouseout="play()">
        <div class="slider-control slider-prev"  @mousemove="controlToggle(true)" @click="prev()" v-show="controlShow">
            <left-outlined />
        </div>
        <div class="slider-control slider-next"  @mousemove="controlToggle(true)" @click="next()" v-show="controlShow">
            <right-outlined />
        </div>
        <div class="slider-dots">
            <div class="slider-dot" v-for="(item, idx) in listData" :key="idx" @mousemove="dotOver(idx)">
                <div :class="['slider-button', {'slider-button-active': activeIndex === idx}]"></div>
            </div>
        </div>
        <div class="slider-box" @mousemove="controlToggle(true)" @mouseleave="controlToggle(false)">
            <div v-for="(item, idx) in listData" :class="['slider-item', getClass(idx)]" :key="idx" @click="clickChange(idx)">
                <img :src="item.imageUrl" alt="">
                <div v-if="item.typeTitle" class="slider-title">{{item.typeTitle}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
  export default defineComponent({
    name: 'Slider',
    props: {
        listData: {
            type: Array,
            default: () => {
                return [0,1,2,3,4,5];
            }
        },
        interval: {
            type: Number,
            default: 3000
        },
        autoplay: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
      let activeIndex = ref(0);
      let controlShow = ref(false);
      let timer = ref(null);

      // 点控制切换
      const dotOver = (idx) => {
        activeIndex.value = idx;
      }
      // 步进控制切换
      const controlToggle = (flag) => {
        controlShow.value = flag ? true : false;
      }
      // 上一步
      const prev = () => {
        activeIndex.value = activeIndex.value === 0 ? props.listData.length -1 : activeIndex.value - 1;
      }
      // 下一步
      const next = () => {
        activeIndex.value = activeIndex.value === props.listData.length -1 ? 0 : activeIndex.value + 1;
      }
      // 直接点击切换
      const clickChange = (idx) => {
          if(idx === props.listData.length -1 && activeIndex.value === 0) {
            prev();
          } else if(activeIndex.value === props.listData.length -1 && idx === 0){
            next();
          } else if(idx > activeIndex.value){
            next();
          } else if(idx < activeIndex.value){
            prev();
          }
      }
      // 设置图样式
      const getClass = (i) => {
        const prevIdx = activeIndex.value === 0 ? props.listData.length -1 : activeIndex.value - 1;
        const nextIdx = activeIndex.value === props.listData.length -1 ? 0 : activeIndex.value + 1;

        switch(i){
            case activeIndex.value: 
                return 'active';
            case prevIdx: 
                return 'prev';
            case nextIdx: 
                return 'next';
            default: 
                return '';
        }
      } 
      // 暂停
      const pause = () => {
        clearInterval(timer.value);
      }
      // 自动播放
      const play = () => {
         pause();
         if(props.autoplay){
            timer.value = setInterval(()=>{
                next();
            },props.interval);
         }
      }
      onMounted(()=>{
        play();
      });
      return {
        activeIndex,
        dotOver,
        controlShow,
        controlToggle,
        prev,
        next,
        play,
        pause,
        getClass,
        clickChange
      };
    },
  });
</script>
<style lang="less">
    .el-menu-slider {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .slider-control {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(0,0,0,.3);
            text-align: center;
            line-height: 30px;
            top: 40%;
            transform: translateY(-50%);
            color: #fff;
            cursor: pointer;
            z-index: 100;
        }
        .slider-prev {
            left: 12px;
        }
        .slider-next {
            right: 12px;
        }
        .slider-dots {
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            .slider-dot {
                display: inline-block;
                padding: 12px 4px;
                .slider-button {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #e6e6e6;
                }
                .slider-button-active {
                    background: @primary-color;
                }
            }
        }
        .slider-box {
            width: 100%;
            height: 80%;
            overflow: hidden;
            position: relative;
            .slider-item {
                width: 70%;
                height: 100%;
                background: #D3DCE6;
                position: absolute;
                left: 50%;
                top: 0;
                border-radius: 8px;
                z-index: 0;
                transition: 0.4s transform ease-out,
                0.35s filter cubic-bezier(0.32, 0.04, 0.87, 0.65);
                transform: translateX(-50%) scale(0.8);
                transform-origin: center center;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
                .slider-title {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    padding: 2px 10px;
                    background: @primary-color;
                    font-size: 12px;
                    color: #fff;
                    border-top-left-radius: 8px;
                }
            }
            .active {
                transform: translateX(-50%);
                z-index: 20;
            }
            .prev {
                transform: translateX(-81.5%) scale(0.8);
                z-index: 18;
            }
            .next {
                transform: translateX(-18.5%) scale(0.8);
                z-index: 18;
            }
        }
    }
</style>
  
  