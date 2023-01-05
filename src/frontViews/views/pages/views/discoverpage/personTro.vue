<template>
    <div class="person-box">
        <div class="m-carousel-box">
            <Slider :listData="bannerList"/>
        </div>
         <div>
            <h3 class="m-title-box">
                <span class="m-title">推荐歌曲</span>
                <span>
                  <right-outlined />
                </span>
            </h3>
            <div class="m-personalized-box">
                <div class="m-personalized-card" v-for="(item, idx) in personalizedList" :key="idx">
                    <Card :cardData="item" />
                </div>
            </div>
        </div>
        <div>
            <h3 class="m-title-box">
                <span class="m-title">热门播客</span>
                <span>
                  <right-outlined />
                </span>
            </h3>
            <div class="m-dj-box">
                <div class="m-dj-card" v-for="(item, idx) in djTopList" :key="idx">
                    <DjCard :cardData="item.program" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import Slider from '@/components/Slider';
import Card from '@/components/Card';
import DjCard from '@/components/DjCard';
import { getBanner, getPersonalized, getDjTopList } from '@/api/index.js';

export default defineComponent({
    name: 'personTro',
    components: {
        Slider,
        Card,
        DjCard
    },
    setup: () => {
        let bannerList = ref([]);
        let personalizedList = ref([]);
        let djTopList = ref([]);
        // 获取banner
        const getBannerFunc = async () => {
           const res = await getBanner();
           if(res.code === 200){
              bannerList.value = res.banners;
           }
        };
        // 获取推荐歌曲
        const getPersonalizedFunc = async () => {
           const res = await getPersonalized();
           if(res.code === 200){
              personalizedList.value = res.result;
           }
        };
        // 获取热门播客
        const getDjTopListFunc = async () =>{
           const res = await getDjTopList();
           if(res.code === 200){
              djTopList.value = res.toplist;
           }
        };
        onMounted(()=>{
            // 获取banner
            getBannerFunc();
            // 获取推荐歌曲
            getPersonalizedFunc();
            // 获取热门播客
            getDjTopListFunc();
        })
        return {
            bannerList,
            personalizedList,
            djTopList
        }
    },
});
</script>
<style lang="less">
    .m-title {
        font-size: 20px;
        font-weight: 700;
    }
    .m-carousel-box {
        width: 100%;
        height: 250px;
    }
    .m-personalized-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .m-personalized-card {
            width: 18%;
            margin-bottom: 16px;
        }
    }
    .m-dj-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .m-dj-card {
            width: 49%;
            margin-bottom: 16px;
            border-radius: 4px;
        }
        .m-dj-card:hover {
            background-color: #eee;
        }
    }
</style>