import personTro from '@/views/pages/views/discoverpage/personTro.vue';
import customized from '@/views/pages/views/discoverpage/customized.vue';
import songsList from '@/views/pages/views/discoverpage/songsList.vue';
import rankingList from '@/views/pages/views/discoverpage/rankingList.vue';
import singers from '@/views/pages/views/discoverpage/singers.vue';
import latestMusic from '@/views/pages/views/discoverpage/latestMusic.vue';
const discoverRoutes = [
    {
        name:'personTro',
        path:'/discover/personTro',
        component: personTro,
        meta: {
            title: '个性推荐',
        }
    },
    {
        name:'customized',
        path:'/discover/customized',
        component: customized,
        meta: {
            title: '专属定制',
        }
    },
    {
        name:'songsList',
        path:'/discover/songsList',
        component: songsList,
        meta: {
            title: '歌单',
        }
    },
    {
        name:'rankingList',
        path:'/discover/rankingList',
        component: rankingList,
        meta: {
            title: '排行榜',
        }
    },
    {
        name:'singers',
        path:'/discover/singers',
        component: singers,
        meta: {
            title: '歌手',
        }
    },
    {
        name:'latestMusic',
        path:'/discover/latestMusic',
        component: latestMusic,
        meta: {
            title: '最新音乐',
        }
    },
];

export default discoverRoutes;