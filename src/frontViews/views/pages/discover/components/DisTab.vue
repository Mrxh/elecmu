<template>
    <div class="distab-box">
        <ul>
            <li v-for="(item, index) in discoverMenu" :key="index" @click="changeTab(index)">
                <router-link :class="{'tab-active': index === activeIndex}" :to="item.path">{{item.meta.title}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { defineComponent, reactive, ref} from 'vue';
import discoverRoutes from '@/router/routes/discover';

export default defineComponent({
    name: 'DisTab',
    setup: () => {
        const discoverMenu = reactive(discoverRoutes);
        let activeIndex = ref(0);
        const changeTab = (idx) => {
            activeIndex.value = idx;
        }
        return {
            discoverMenu,
            activeIndex,
            changeTab
        }
    },
});
</script>
<style lang="less">
.distab-box {
    font-size: 16px;
    overflow: hidden;
    ul li {
        float: left;
        margin-right: 24px;
        a {
            color: #555;
            padding-bottom: 6px;
        }
        a:hover {
            color: #313131;
        }
        .tab-active {
            color: #313131;
            font-size: 20px;
            font-weight: bolder;
            border-bottom: 3px solid @primary-color;
            vertical-align: text-bottom;
        }
    }
}
</style>