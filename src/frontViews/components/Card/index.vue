<template>
    <div class="el-menu-card">
        <div class="card-img">
            <img :src="cardData.picUrl" alt="">
            <div class="card-num">
                <caret-right-outlined />
                <span>{{playCount}}</span>
            </div>
            <div class="card-play">
                <play-circle-outlined />
            </div>
        </div>
        <div class="card-title">
            {{cardData.name}}
        </div>
    </div>
</template>
<script>
  import { defineComponent, ref, onMounted } from 'vue';
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
      let playCount = ref('');
      onMounted(()=>{
        playCount.value = props.cardData.playCount>=10000 ? parseInt(props.cardData.playCount/10000) +'万' : props.cardData.playCount;
      });
      return {
        playCount
      };
    },
  });
</script>
<style lang="less">
.el-menu-card {
    width: 100%;
    height: 100%;
    .card-img {
        background: #000;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        position: relative;
        color: #fff;
        margin-bottom: 10px;
        cursor: pointer;
        img {
           width: 100%; 
        }
        .card-num {
            position: absolute;
            top: 4px;
            right: 6px;
        }
        .card-play {
            position: absolute;
            opacity: 0;
            bottom: 0;
            right: 10px;
            font-size: 24px;
            transition: opacity .5s ease-in;
        }
    }
    .card-img:hover .card-play {
       opacity: 1;
    }
    .card-title {
        cursor: pointer;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
  
  