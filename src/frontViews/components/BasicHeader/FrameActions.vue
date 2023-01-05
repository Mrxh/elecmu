<template>
    <div class="fr-box e-icon">
        <span class="fr-item">
            <shrink-outlined />
        </span>
        <span class="fr-item" @click="miniWin">
            <minus-outlined />
        </span>
        <span class="fr-item">
            <ZIcon />
        </span>
        <span class="fr-item" @click="closeWin">
            <close-outlined />
        </span>
    </div>
   </template>
     
  <script>
  import { defineComponent, getCurrentInstance } from 'vue';
  import ZIcon from '../ZIcon/index.vue'
  
  export default defineComponent({
      name: 'ThemeSetting',
      components: {
        ZIcon
      },
      setup: () => {
          const {appContext: { config: { globalProperties } }} = getCurrentInstance();
           // 最小化
          const miniWin = () => {
            globalProperties.$electron.ipcRenderer.send('window-minimize');
          };
          // 关闭窗口
          const closeWin = () => {
            globalProperties.$electron.ipcRenderer.send('window-close');
          }
          return {
            closeWin,
            miniWin
          }
      },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
      .fr-box {
          display: flex;
          align-items: center;
          .fr-item {
              display: inline-flex;
              flex: 1;
              padding: 0 5px;
          }
      }
  </style>
     