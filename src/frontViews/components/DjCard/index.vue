<template>
    <div class="el-dj-card">
        <div class="card-img">
            <img :src="cardData.coverUrl" alt="">
            <div class="card-play">
                <play-circle-outlined />
            </div>
        </div>
        <div class="card-content">
            <div class="card-title">{{cardData.mainSong.name}}</div>
            <div class="card-tag">
              <span>{{cardData.radio.secondCategory}}</span>
            </div>
            <div class="card-desc">
              <div class="card-description">{{cardData.dj.brand}}</div>
              <div class="card-sign">
                 <span>
                    <caret-right-outlined />{{listenerCount}}
                 </span>
                 <span>
                    <clock-circle-outlined />{{playTime}}
                 </span>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { transformTime } from '@/utils/utils.js';
  export default defineComponent({
    props: {
      cardData: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    setup(props) {
      let listenerCount = ref('');
      listenerCount.value = props.cardData.listenerCount>=10000 ? parseInt(props.cardData.listenerCount/10000) + '万' : props.cardData.listenerCount;
      let playTime = ref('');
      playTime.value = transformTime(props.cardData.mainSong.bMusic.playTime);
      return {
        listenerCount,
        playTime
      };
    },
  });
</script>
<style lang="less">
.el-dj-card {
    width: 100%;
    height: 100%;
    display: flex;
    .card-img {
        width: 74px;
        height: 74px;
        color: #fff;
        position: relative;
        font-size: 18px;
        overflow: hidden;
        border-radius: 4px;
        img {
           width: 100%; 
           height: 100%;
        }
        .card-play {
            position: absolute;
            bottom: 0px;
            right: 4px;
        }
    }
    .card-content {
        width: 78%;
        padding: 4px 10px;
        box-sizing: border-box;
        .card-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }
        .card-tag {
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
          span {
            border: 1px solid #999;
            border-radius: 2px;
            padding: 0 2px;
          }
        }
        .card-desc {
          display: flex;
          font-size: 12px;
          color: #999;
          .card-description {
            max-width: 50%;
            margin-right: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card-sign {
            width: 50%;
            white-space: nowrap;
            span {
              margin-right: 8px;
              span {
                margin-right: 4px;
              }
            }
          }
        }
    }
}
</style>
  
  