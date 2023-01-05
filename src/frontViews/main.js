import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
const electron = require('electron');
import antd from './plugins/antd';
import * as Icons from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.less';
import '@/assets/style/index.css';
import '@/assets/style/fonts/iconfont.css';

const app = createApp(App);
app.config.globalProperties.$electron = electron;
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.use(antd);
app.mount('#app');
for(let i in Icons) {
    app.component(i, Icons[i]);
}
