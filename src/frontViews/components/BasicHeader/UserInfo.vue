<template>
   <div>
    <span>
        <span class="user-avatar">
            <user-outlined />
        </span>
        <span>未登录</span>
    </span>
   </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
      name: 'UserInfo',
      setup: () => {
          return {
          }
      },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
  .user-avatar {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #cecece;
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin-right: 8px;
  }
  </style>
  