import {createRouter, createWebHashHistory} from 'vue-router';
import BasicLayout from '../views/layouts/BasicLayout.vue';
import Discover from '../views/pages/discover/Discover.vue';
import discoverRoutes from './routes/discover';
import searchPage from '../views/pages/views/searchPage/index.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            name: 'index',
            path:'/',
            component: BasicLayout,
            children: [
                {
                    name:'discover',
                    path:'/discover',
                    component: Discover,
                    children: discoverRoutes,
                },
                {
                    name:'searchPage',
                    path:'/searchPage',
                    component: searchPage,
                },
            ],
            redirect: '/discover/personTro'
        },
    ]
})

export default router;