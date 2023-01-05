<template>
    <div class="el-menu-box">
        <div class="el-menu">
            <a-menu
            id="cloud"
            v-model:selectedKeys="selectedKeys"
            style="width: 182px"
            mode="vertical"
            @click="handleClick"
            >
                <a-menu-item key="1">发现音乐</a-menu-item>
                <a-menu-item key="2">播客</a-menu-item>
                <a-menu-item key="3">视频</a-menu-item>
                <a-menu-item key="4">关注</a-menu-item>
                <a-menu-item key="5">直播</a-menu-item>
                <a-menu-item key="6">私人FM</a-menu-item>
            </a-menu>
        </div>
        <div class="el-menu-s">
            <a-menu
            id="cloud"
            v-model:selectedKeys="selectedKeys"
            style="width: 182px"
            mode="vertical"
            @click="handleClick"
            >
                <a-menu-item-group key="c2" title="我的音乐">
                    <a-menu-item key="7">
                        <template #icon>
                            <span class="e-icon">
                                <download-outlined />
                            </span>
                        </template>
                        <span>本地与下载</span>
                    </a-menu-item>
                    <a-menu-item key="8">
                        <template #icon>
                            <span class="e-icon">
                                <field-time-outlined />
                            </span>
                        </template>
                        <span>最近播放</span>
                    </a-menu-item>
                </a-menu-item-group>
            </a-menu>
        </div>
    </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const selectedKeys = ref(['1']);
      const handleClick = e => {
        console.log('click', e);
      };
      const titleClick = (e) => {
        console.log('titleClick', e);
      };
      return {
        selectedKeys,
  
        handleClick,
        titleClick,
      };
    },
  });
</script>
<style lang="less">
    .el-menu-box {
        margin: 12px 0 0 14px;
        .el-menu {
            .ant-menu {
                border: none;
            }
            .ant-menu-item {
                color: #555 !important;
                margin-top: 2px !important;
                margin-bottom: 0 !important;
            }
            .ant-menu-item-active {
                color: #313131 !important;
                background-color: #f6f6f6 !important;
            }
            .ant-menu-item-selected {
                color: #313131;
                font-weight: bolder;
                font-size: 17px;
                background-color: #f6f6f6 !important;
            }
        }
        .el-menu-s {
            .ant-menu {
                border: none;
            }
            .ant-menu-item {
                padding-left: 16px;
                color: #555 !important;
                margin-top: 2px !important;
                margin-bottom: 0 !important;
            }
            .ant-menu-item-active {
                color: #313131 !important;
                background-color: #f6f6f6 !important;
            }
            .ant-menu-item-selected {
                color: #313131;
                background-color: #f6f6f6 !important;
            }
        }
    }
</style>
  
  