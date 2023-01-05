<template>
    <a-config-provider :locale="locale">
        <a-layout class="basic-layout">
            <a-layout-header class="basic-layout-header">
                <BasicHeader/>
            </a-layout-header>
            <a-layout>
                <a-layout-sider class="basic-layout-sider" :width="200">
                    <div ref="handle" class="split-handle"></div>
                    <BasicSider />
                </a-layout-sider>
                <a-layout-content class="basic-layout-content">
                    <router-view />
                    <Collection v-if="cloudStore.isCollectionShow" />
                </a-layout-content>
            </a-layout>
            <LyricBox />
            <a-layout-footer>
               <BasicFooter />
            </a-layout-footer>
        </a-layout>
    </a-config-provider>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import BasicHeader from '@/components/BasicHeader/index.vue';
import BasicSider from '@/components/BasicSider/index.vue';
import BasicFooter from '@/components/BasicFooter/index.vue';
import Collection from '@/components/Collection/index.vue';
import LyricBox from '@/components/LyricBox/index.vue';
import { useCloudStore } from "@/store";

export default defineComponent({
    name: 'BasicLayout',
    components: {
        BasicHeader,
        BasicSider,
        BasicFooter,
        Collection,
        LyricBox
    },
    setup: () => {
        const data = reactive({
          locale: zhCN,
        });
        const cloudStore = useCloudStore();
        document.onclick = (e) =>{
            const isCollectionShowRes = e.path.filter((item)=>item.className==='collection-box');
            if(e.target.className && typeof e.target.className === 'string') {
                if(isCollectionShowRes.length === 0 && e.target.className.indexOf('icon-24gf-playlist')===-1) {
                    cloudStore.setIsCollectionShow(false);
                }
            }
        }
        return {
            ...toRefs(data),
            cloudStore
        }
    },
});
</script>
<style lang="less">
.basic-layout {
    height: 100vh;
    position: relative;
    .basic-layout-header,
    .basic-layout-footer {
        height: 60px;
        line-height: 50px;
        padding: 0;
        position: relative;
        z-index: 22;
    }

    .basic-layout-header {
        box-sizing: content-box;

        &.basic-layout-header-mac {
            padding-top: 20px;
        }
    }

    .basic-layout-footer {
        border-top: 1px solid #ddd;
    }

    .basic-layout-header {
        background: @primary-color;
        color: #eee;
        -webkit-app-region: drag;
    }

    .basic-layout-sider {
        position: relative;
        background: #fff;
        box-shadow: none;
        overflow-x: hidden;
        overflow-y: hidden;

        .split-handle {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999;
            height: 100%;
            width: 5px;
            border-right: 1px solid #ddd;
            cursor: col-resize;
        }
    }

    .basic-layout-content {
        background: #fff;
        position: relative;
    }
    .ant-layout-footer {
        z-index: 1030;
        background-color: #fff;
        border-top: 1px solid #ddd;
        padding: 12px 15px 6px;
    }
}
</style>