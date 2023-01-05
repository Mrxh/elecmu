<template>
    <my-icon type="iconfangxingweixuanzhong" />
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { defineComponent } from 'vue';
const iconURL = "//at.alicdn.com/t/c/font_1982544_z6r2vs3sruk.js";

let MyIcon = createFromIconfontCN({
    scriptUrl: iconURL,
});

export default defineComponent({
  components: {
    MyIcon
  },
});
</script>

