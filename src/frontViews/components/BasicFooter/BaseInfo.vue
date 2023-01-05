<template>
  <div class="base-info-box">
      <div class="base-info-pic" @click="showLy">
          <img :src="picUrl?picUrl:logoImg" alt="歌曲图">
          <div class="arrow-box">
              <span class="icon iconfont icon-shangjiantou"></span>
          </div>
      </div>
      <div class="base-info-info">
          <div class="base-info-name" :title="name">{{ name }}</div>
          <div class="base-info-name" :title="singer">{{ singer }}</div>
      </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import { getSongDetail } from "@/api/index.js";
import { useCloudStore } from "@/store";
import logoImg from '@/assets/images/logos.jpg';

export default defineComponent({
  name: "BaseInfo",
  setup: () => {
    const curMusicInfo = reactive({
        name: '网易云音乐',
        picUrl: '',
        singer: ''
    });
    const cloudStore = useCloudStore();
    watchEffect(async () => {
      if (cloudStore.curMusicId) {
        const res = await getSongDetail(cloudStore.curMusicId);
        if(res.code === 200){
            curMusicInfo.name = res.songs[0].name;
            curMusicInfo.picUrl = res.songs[0].al.picUrl+'?param=50y50';
            curMusicInfo.singer = res.songs[0].ar.map((item)=>item.name).join('/');
        }
      }
    });
    const showLy = () =>{
        cloudStore.setIsLyricShow(!cloudStore.isLyricShow);
    }
    return {
        ...toRefs(curMusicInfo),
        logoImg,
        showLy
    };
  },
});
</script>

<style lang="less">
.base-info-box {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}
.base-info-info {
    padding: 3px 0;
    width: calc(100% - 62px);
    .base-info-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
    }
}
.base-info-pic {
    margin-right: 12px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
    }
    .arrow-box {
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        color: #fff;
        width: 100%;
        height: 100%;
        line-height: 50px;
        display: none;
    }
}

.base-info-pic:hover img {
    filter: blur(2px);
}
.base-info-pic:hover .arrow-box {
    display: block;
}
</style>
