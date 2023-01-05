<template>
  <a-button-group size="small">
    <a-button type="primary" @click="goBack">
      <left-outlined />
    </a-button>
    <a-button type="primary" @click="goFront">
      <right-outlined />
    </a-button>
    <a-button type="primary" @click="refresh">
      <reload-outlined />
    </a-button>
  </a-button-group>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Controls",
  setup: () => {
    const router = useRouter();
    // 返回
    const goBack = () => {
      router.go(-1);
    };
    // 前进
    const goFront = () => {
      router.go(-1);
    };
    // 刷新
    const refresh = () => {
      router.go(0);
    };
    return {
      goBack,
      goFront,
      refresh,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ant-btn {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
