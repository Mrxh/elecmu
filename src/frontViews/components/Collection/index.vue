<template>
    <div class="collection-box" ref="collectionBox">
        <div class="collection-header">
            <span class="m-title">当前播放</span>
        </div>
        <a-table
            id="my-table"
            class="ant-table-striped"
            size="middle"
            :data-source="colList"
            :columns="songColumns"
            :pagination="false"
            :row-class-name="rowClassName"
            :customRow="songsList"
            :scroll="{x: 400, y: tableHeight}"
        >
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'orderNum' && record.id === cloudStore.curMusicId">
             <span class="play-list-play">
               <i class="icon iconfont icon-shengyin"></i>
             </span>
            </template>
            <template v-else>
                <span :title="text">{{ text }}</span>
            </template>
        </template>
        </a-table>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from '@/plugins/db';
import { songColumns } from "./col-data.js";
import { useCloudStore } from "@/store";

export default defineComponent({
    name: 'Collection',
    setup() {
      const cloudStore = useCloudStore();
      const collectionBox = ref(null);
      let tableHeight = ref(100);
      const songsList = (row) => {
        return {
            onClick: async () => {
               cloudStore.setCurMusicId(row.id);
            },
        };
      };

      const rowClassName =(_record, index) => {
        let className = index % 2 === 0 ? 'table-striped' : null;
        if(_record.id === cloudStore.curMusicId){
            className = 'select-row';
        }
        return className;
      }

      onMounted(()=>{
        tableHeight.value = collectionBox.value.clientHeight-71;
      });

      return {
        songColumns,
        colList: useObservable(
           liveQuery(() => db.collectionList.toArray())
        ),
        songsList,
        rowClassName,
        cloudStore,
        collectionBox,
        tableHeight
      };
    }
});
</script>

<style lang="less">
    .collection-box {
        width: 420px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1010;
        background: #fff;
        box-shadow: -5px 0 5px -5px rgba(0,0,0,.2);
        .collection-header {
            padding: 20px 20px 20px 20px;
        }
        .ant-table-striped .table-striped td {
            background-color: #fafafa;
        }
        #my-table .ant-table-thead > tr > th {
            background-color: #fff;
            color: #aaa;
        }
        #my-table .ant-table-thead > tr > th::before {
            content: none;
        }
        #my-table tr td {
            border: none;
        }
        .ant-table-content table {
            table-layout: fixed !important;
        }
        .ant-table-cell {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: keep-all;
        }
        .play-list-title {
            display: flex;
        }
        .play-list-title .list-title-text {
            display: inline-block;
            max-width: 70%;
            margin-right: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: keep-all;
        }
        .list-title-tag {
            color: #fe672e;
            border: 1px solid #fe672e;
            padding: 0 2px;
            font-size: 10px;
            border-radius: 3px;
            display: inline-block;
            height: 12px;
            margin-top: 5px;
            line-height: 12px;
        }
        .play-list-play {
            display: block;
            line-height: 14px;
            height: 14px;
            color: @primary-color;
        }
        .select-row {
            background-color: #E5E5E5; 
        }
        .ant-table-header{
            display: none;
        }
    }
    
</style>