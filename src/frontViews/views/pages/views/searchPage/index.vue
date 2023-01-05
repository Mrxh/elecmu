<template>
  <div class="discover-box">
    <h3 class="cloud-title">搜索  {{ cloudStore.keywords }}</h3>
    <a-table
      id="my-table"
      class="ant-table-striped"
      size="middle"
      :data-source="singleSongData"
      :columns="singleSongColumns"
      :row-class-name="rowClassName"
      :pagination="pagination"
      :loading="loading"
      :customRow="songsList"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex !== 'duration'">
          <template v-if="column.dataIndex === 'title' && record.fee === 1">
            <div class="play-list-title">
              <span class="list-title-text" :title="text">{{ text }}</span>
              <span class="list-title-tag"> VIP </span>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'orderNum' && record.id === cloudStore.curMusicId">
             <span class="play-list-play">
               <i class="icon iconfont icon-shengyin"></i>
             </span>
          </template>
          <template v-else>
            <span :title="text">{{ text }}</span>
          </template>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref, reactive } from "vue";
import { singleSongColumns } from "./search-data.js";
import { useCloudStore } from "@/store";
import { getSearchList } from "@/api/index.js";
import { transformTime } from "@/utils/utils.js";
import { db } from '@/plugins/db';

export default defineComponent({
  name: "searchPage",
  setup: () => {
    let loading = ref(false);
    const singleSongData = ref([]);
    const pagination = reactive({
      current: 1,
      pageSize: 100,
      size: "middle",
      total: 0,
      onChange: async (page) => {
        pagination.current = page;
        await getSearchRes(cloudStore.keywords, 100, (page - 1) * 100);
      },
      showSizeChanger: false,
      position: ["bottomCenter"],
    });
    const cloudStore = useCloudStore();
    const getSearchRes = async (keywords, pageSize, offset) => {
      loading.value = true;
      try {
        const res = await getSearchList(keywords, pageSize, offset);
        if (res.code === 200 && res.result.songs.length > 0) {
          loading.value = false;
          pagination.total = res.result.songCount;
          singleSongData.value = res.result.songs.map((item, idx) => {
            const singer = item.ar.map((aitem) => aitem.name).join("/");
            const duration = transformTime(item.dt);
            return {
              id: item.id,
              orderNum: String(offset + idx + 1).padStart(2, '0'),
              title: item.name,
              singer,
              album: item.al.name,
              duration,
              fee: item.fee,
            };
          });
        }
      } catch (err) {
        loading.value = false;
        console.info(err);
      } finally {
        loading.value = false;
      }
    };
    watchEffect(async () => {
      await getSearchRes(cloudStore.keywords, 100, 0);
    });

    const addColList = async (row) => {
      try {
        // Add the new collectionList!
        await db.collectionList.add({
          id: row.id,
          title: row.title,
          album: row.album,
          duration: row.duration
        });
      } catch (error) {
        console.info(error);
      }
    }

    const songsList = (row) => {
      return {
        onClick: async () => {
          cloudStore.setCurMusicId(row.id);
          addColList(row);
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
    return {
      singleSongColumns,
      singleSongData,
      pagination,
      loading,
      songsList,
      cloudStore,
      rowClassName
    };
  },
});
</script>

<style lang="less">
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
</style>
