<template>
  <div class="player-box">
    <audio ref="audio" @timeupdate="timeUpdate" />
    <div class="palyer-controls-btn">
      <a class="palyer-controls-left"><step-backward-outlined /></a>
      <a class="palyer-controls-mid" @click="togglePlay()"
        ><span
          :class="[
            'icon',
            'iconfont',
            { 'icon-gf-play': !isPlay },
            { 'icon-zanting': isPlay },
          ]"
        ></span
      ></a>
      <a class="palyer-controls-right"><step-forward-outlined /></a>
    </div>
    <div class="palyer-controls-progreess">
      <span>{{ curTimeText }}</span>
      <div class="progreess-box" @click="changeProgress">
        <div class="progreess-outer" id="outerBox">
          <div class="progreess-inner" :style="{ width: innerWidth }">
            <div :class="['progress-dot', {'progress-dot-show': isDraggle}]"></div>
          </div>
        </div>
      </div>
      <span>{{ durationText }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watchEffect, onMounted } from "vue";
import { useCloudStore } from "@/store";
import { getSongUrl } from "@/api/index.js";
import { transformTime } from "@/utils/utils.js";

export default defineComponent({
  name: "BasicHeader",
  setup: () => {
    const audio = ref(null);
    let isPlay = ref(false);
    let innerWidth = ref("0%");
    let isDraggle = ref(false);
    const curMusicInfo = reactive({
        url: '',
        duration: 0,
        durationText: '00:00',
        curTime: 0,
        curTimeText: '00:00',
        playTime: 0
    });
    // 进度条值
    const defaultPercent = ref(50);
    const cloudStore = useCloudStore();
    // 播放暂停切换
    const togglePlay = () => {
      isPlay.value = !isPlay.value;
      isPlay.value ? audio.value.play() : audio.value.pause();
    };
    // 改变进度
    const changeProgress = (e, isMove) => {
      const outerBox = document.getElementById("outerBox");
      const progressValue = e.clientX - outerBox.offsetLeft;
      if(progressValue >= 0 && progressValue <= outerBox.clientWidth){
        if(isMove){
          innerWidth.value = parseInt((progressValue / outerBox.clientWidth) * 100) + "%";
          curMusicInfo.playTime = parseInt(((progressValue / outerBox.clientWidth) * curMusicInfo.duration)/1000);
          curMusicInfo.curTimeText = transformTime(curMusicInfo.playTime*1000);
        } else {
          innerWidth.value = parseInt((progressValue / outerBox.clientWidth) * 100) + "%";
          audio.value.currentTime = parseInt(((progressValue / outerBox.clientWidth) * curMusicInfo.duration)/1000);
        }
      }
    };
    // 监听播放信息
    const timeUpdate = () => {
        curMusicInfo.curTime = parseInt(audio.value.currentTime*1000);
        if(!isDraggle.value){
          innerWidth.value = parseInt((curMusicInfo.curTime / curMusicInfo.duration) * 100) + "%";
          curMusicInfo.curTimeText = transformTime(curMusicInfo.curTime);
          if(audio.value.ended) {
              isPlay.value = false;
          }
        }
    }

    // 移动游标改变进度
    document.addEventListener('mousedown', (event) => {
        if(event.target.className && typeof event.target.className === 'string'){
          if(event.target.className.indexOf('progress-dot') > -1){
              isDraggle.value = true;
              document.onmousemove = (e) => {
                  if(isDraggle.value){
                  changeProgress(e, true);
                  }
              }

              document.onmouseup = () => {
                  if(isDraggle.value){
                      audio.value.currentTime = curMusicInfo.playTime;
                      isDraggle.value = false;
                  }
                  document.onmousemove = null;
                  document.onmouseup = null;
              }
          }
        }
    });
    
    onMounted(()=>{
        watchEffect(async () => {
            if (cloudStore.curMusicId) {
                const res = await getSongUrl(cloudStore.curMusicId);
                if (res.code === 200) {
                    audio.value.src = res.data[0].url;
                    curMusicInfo.url = res.data[0].url;
                    curMusicInfo.duration = res.data[0].time;
                    curMusicInfo.durationText = transformTime(res.data[0].time);
                }
                audio.value.play();
                isPlay.value = true;
            }
        });

        watchEffect(()=>{
            audio.value.volume = cloudStore.volume;
        });
    });
    return {
      audio,
      cloudStore,
      togglePlay,
      isPlay,
      defaultPercent,
      innerWidth,
      changeProgress,
      ...toRefs(curMusicInfo),
      timeUpdate,
      isDraggle
    };
  },
});
</script>

<style lang="less">
.player-box {
  .palyer-controls-btn {
    width: 100%;
    text-align: center;
    a {
      color: #333;
      font-size: 20px;
      vertical-align: middle;
    }
    .palyer-controls-left {
      margin-right: 30px;
    }
    .palyer-controls-left:hover, 
    .palyer-controls-right:hover{
        color: @primary-color;
    }
    .palyer-controls-mid {
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #f5f5f5;
      text-align: center;
      line-height: 38px;
      .iconfont {
        display: inline-block;
        width: 17px;
        overflow: hidden;
        font-size: 20px;
      }
    }
    .palyer-controls-mid:hover {
      background-color: #e5e5e5; 
    }
    .palyer-controls-right {
      margin-left: 30px;
    }
  }
  .palyer-controls-progreess {
    display: flex;
    font-size: 12px;
    color: #ccc;
    justify-content: center;
    margin-top: 4px;
    .progreess-box {
      width: 72%;
      margin: 0 10px;
      .progreess-outer {
        top: 7px;
        height: 6px;
        background-color: #cecece;
        position: relative;
        .progreess-inner {
          width: 50%;
          height: 6px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background-color: @primary-color;
          .progress-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: @primary-color;
            position: absolute;
            right: -7px;
            top: -2px;
            display: none;
          }
          .progress-dot-show {
            display: block;
          }
        }
      }
    }
    .progreess-box:hover .progreess-outer > .progreess-inner > .progress-dot {
      display: block;
    }
    span {
      line-height: 22px;
    }
  }
}
</style>
