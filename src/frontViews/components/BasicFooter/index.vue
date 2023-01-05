<template>
  <div class="footer-box">
    <div class="m-left-box">
      <BaseInfo />
    </div>
    <div class="m-mid-box">
      <Player />
    </div>
    <div class="m-right-box">
      <Tools />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseInfo from "./BaseInfo.vue";
import Player from "./Player.vue";
import Tools from "./Tools.vue";

export default defineComponent({
  name: "BasicHeader",
  components: {
    BaseInfo,
    Player,
    Tools,
  },
  setup: () => {
    return {};
  },
});
</script>

<style lang="less" scoped>
.footer-box {
  display: flex;
  .m-left-box,
  .m-right-box {
    width: 25%;
  }
  .m-mid-box {
    width: 50%;
  }
}
</style>
