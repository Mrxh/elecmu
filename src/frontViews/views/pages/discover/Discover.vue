<template>
    <div class="discover-box">
        <div class="discover-tab">
            <DisTab />
        </div>
        <div class="dicover-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { defineComponent} from 'vue';
import DisTab from './components/DisTab.vue';

export default defineComponent({
    name: 'Discover',
    components: {
        DisTab
    },
    setup: () => {
        return {
        }
    },
});
</script>
<style lang="less">
.dicover-content {
    overflow: auto;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 30px;
}
</style>