<template>
  <div class="th-box">
    <div class="th-item">
        <a-popover trigger="click">
            <template #content>
                1111111111111
            </template>
            <span class="e-icon">
                <skin-outlined />
            </span>
        </a-popover>
    </div>
    <div class="th-item">
        <span class="e-icon">
            <setting-outlined />
        </span>
    </div>
  </div>

 </template>
   
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ThemeSetting',
    setup: () => {
        return {
        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .th-box {
        display: flex;
        align-items: center;
        .th-item {
            display: inline-flex;
            flex: 1;
            padding: 0 10px;
        }
    }
    .th-box::after {
        content: "";
        height: 20px;
        border-right: 1px solid #fff;
        flex: 1;
    }
</style>
   