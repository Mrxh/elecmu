<template>
    <div :class="['lyric-box',{'lyric-box-show': cloudStore.isLyricShow}]">
        <a-layout class="basic-layout">
            <a-layout-header class="basic-layout-header">
                <BasicHeader :uiFlag="uiFlag"/>
            </a-layout-header>
            <a-layout>
            </a-layout>
            <a-layout-footer>
            </a-layout-footer>
        </a-layout>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import BasicHeader from '@/components/BasicHeader/index.vue';
import { useCloudStore } from "@/store";

export default defineComponent({
    name: 'Lyric',
    components: {
        BasicHeader,
    },
    setup() {
      const cloudStore = useCloudStore();
      const uiFlag = ref('lyric');
      return {
        cloudStore,
        uiFlag
      };
    }
});
</script>

<style lang="less">
    .lyric-box {
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        top: calc(100% - 83px);
        z-index: 1000;
        transition: top 0.3s ease-in;
        .top-bar {
            -webkit-app-region: no-drag;
        }
        .basic-layout-header {
            background: transparent !important;
            color: #aaa !important;
        }
    }
    .lyric-box-show {
        top: 0;
        .top-bar {
            -webkit-app-region: drag;
        }
    }
</style>