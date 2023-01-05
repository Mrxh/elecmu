<template>
  <div class="tools-box">
    <a-popover trigger="hover" placement="top" overlayClassName="tools-content-box">
      <template #content>
        <div class="voice-box" @click="changeVolume">
          <div class="voice-outer" id="outerVoiceBox">
            <div class="voice-inner" :style="{ height: innerHeight }">
              <div class="voice-dot">
              </div>
            </div>
          </div>
        </div>
      </template>
      <span class="icon iconfont icon-laba"></span>
    </a-popover>
    <span class="icon iconfont icon-24gf-playlist" @click="showCol"></span>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useCloudStore } from "@/store";

export default defineComponent({
  name: "Tools",
  setup: () => {
    let isDraggle = ref(false);
    const cloudStore = useCloudStore();
    let innerHeight = ref(50);
    // 改变音量
    const changeVolume = (e) => {
      const outerVoiceBox = document.getElementsByClassName('tools-content-box')[0];
      const progressValue = 100 - (e.clientY - outerVoiceBox.offsetTop - 12);
      if(progressValue >= 0 && progressValue <= 100){
        const volumeVal = progressValue / 100;
        innerHeight.value = parseInt(volumeVal*100) + "%";
        cloudStore.setVolume(volumeVal);
      }
    };
    // 移动游标改变音量
    document.addEventListener('mousedown', (event) => {
      if(event.target.className && typeof event.target.className === 'string'){
        if(event.target.className.indexOf('voice-dot') > -1){
            isDraggle.value = true;
            document.onmousemove = (e) => {
                if(isDraggle.value){
                  changeVolume(e, true);
                }
            }

            document.onmouseup = () => {
                if(isDraggle.value){
                    isDraggle.value = false;
                }
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
      }
    });

    // 展示收藏歌曲列表
    const showCol = () => {
      cloudStore.setIsCollectionShow(!cloudStore.isCollectionShow);
    }

    return {
      innerHeight,
      changeVolume,
      showCol
    };
  },
});
</script>

<style lang="less">
.tools-box {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
      cursor: pointer;
      font-size: 20px;
      margin-left: 20px;
  }
}

.tools-content-box {
  .ant-popover-inner-content {
    padding: 0 !important;
  }
  .voice-box {
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 6px;
  }
  .voice-outer {
    width: 4px;
    height: 100px;
    background-color: #cecece;
    position: relative;
    .voice-inner {
      width: 4px;
      height: 50px;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: @primary-color;
      .voice-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: @primary-color;
        position: absolute;
        left: -3px;
        top: -5px;
      }
    }
  }
}
</style>
