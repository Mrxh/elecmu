<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-16 14:27:18
 * @LastEditors: xiaohang xiaohang@diligrp.com
 * @LastEditTime: 2022-08-30 16:16:43
 * @FilePath: \elec-mu\src\frontViews\components\BasicHeader\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="top-bar">
    <div class="top-bar-logo">
        <img src="../../assets/images/logo.svg" alt="logo">
    </div>
    <div class="top-bar-main">
        <div class="top-bar-control">
            <Controls />
        </div>
        <div class="top-bar-search">
            <SearchBox />
        </div>
        <div class="top-bar-menu">
            <div class="top-bar-menu-box">
                <div class="item">
                   <UserInfo />
                </div>
                <div class="item item-sp">
                   <ThemeSetting />
                </div>
                <div class="item">
                   <FrameActions />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Controls from './Controls.vue';
import SearchBox from './SearchBox.vue';
import UserInfo from './UserInfo.vue';
import ThemeSetting from './ThemeSetting.vue';
import FrameActions from './FrameActions.vue';

export default defineComponent({
    name: 'BasicHeader',
    components: {
        Controls,
        SearchBox,
        UserInfo,
        ThemeSetting,
        FrameActions
    },
    setup: () => {
        return {
        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .top-bar {
      height: 100%;
      display: flex;
      overflow: hidden;
      .top-bar-logo {
        display: flex;
        align-items: center;
        width: 200px;
        flex: 0 0 200px;
        padding-left: 15px;
        img {
            width: 140px;
        }
      }
      .top-bar-main {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        .top-bar-search {
            width: 200px;
            -webkit-app-region: no-drag;
        }
        .top-bar-control {
            margin-right: 5px;
            -webkit-app-region: no-drag;
            /deep/ .ant-btn {
                height: 24px;
                line-height: 22px;
            }
        }
        .top-bar-menu {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .top-bar-menu-box {
                display: flex;
                -webkit-app-region: no-drag;
                .item {
                    display: inline-flex;
                    align-items: center;
                    padding: 0 10px;
                    cursor: pointer;
                }
                .item-sp {
                    padding-right: 0;
                }
            }
        }
    }
   }
</style>
