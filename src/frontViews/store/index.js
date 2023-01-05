import { defineStore } from 'pinia';

export const useCloudStore = defineStore('cloudMusic',{
    state: () => {
        return {
            keywords: '', // 搜索关键字
            curMusicUrl: '', // 当前播放音乐url
            curMusicId: '', // 当前播放音乐id
            volume: 0.5, // 播放器音乐音量
            isCollectionShow: false, // 是否显示收藏歌曲列表
            isLyricShow: false, // 是否显示歌词
        }
    },
    actions: {
        setSeachKeywods(params) {
            this.keywords = params;
        },
        setCurMusicUrl(url){
            this.curMusicUrl = url;
        },
        setCurMusicId(id){
            this.curMusicId = id;
        },
        setVolume(volume){
            this.volume = volume;
        },
        setIsCollectionShow(val){
            this.isCollectionShow = val;
        },
        setIsLyricShow(val){
            this.isLyricShow = val;
        }
    }
})