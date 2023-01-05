<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-17 10:57:39
 * @LastEditors: xiaohang xiaohang@diligrp.com
 * @LastEditTime: 2023-01-04 16:41:22
 * @FilePath: \elec-mu\src\frontViews\components\BasicHeader\SearchBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-popover
    trigger="click"
    v-model:visible="visible"
    overlayClassName="search-content-box"
  >
    <template #content>
      <div class="search-box">
        <div class="search-box-his" v-if="!keyword && historyList.length">
          <div class="search-box-top">
            <div class="search-box-top-left">
              <div>搜索历史</div>
              <div @click="delHistory" class="search-box-top-del">
                <delete-outlined />
              </div>
            </div>
            <div class="search-box-top-right" v-show="!isShowAll">
              <div @click="showAll">查看全部</div>
            </div>
          </div>
          <div :class="['search-box-list', { 'search-box-list-part': !isShowAll }]">
            <ul>
              <li v-for="item in historyList"
                :key="item.id"
                @click="
                  (e) => {
                    search(e, item.keyword);
                  }
                "
              >
                {{ item.keyword }}<span @click.stop="delHis(item.id)"><close-outlined /></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="search-box-hot" v-if="!keyword">
          <div class="search-box-hot-title">热搜榜</div>
          <dl class="search-box-hot-list">
            <dd v-for="(item, idx) in hotList"
              :key="idx"
              @click="
                (e) => {
                  search(e, item.searchWord);
                }
              "
            >
              <div class="hot-list-num">{{ idx + 1 }}</div>
              <div :class="['hot-list-box', { 'hot-list-box-single': !item.content }]">
                <div class="hot-list-title">
                  <span class="hot-list-name">{{ item.searchWord }}</span>
                  <span class="hot-list-data">{{ item.score }}</span>
                </div>
                <div class="hot-list-content" v-if="item.content">
                  {{ item.content }}
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="search-box-suggest" v-if="keyword">
          <div class="search-box-suggest-title">
            <search-outlined /><span>猜你想搜</span>
          </div>
          <ul>
            <li v-for="song in songs"
              :key="song.id"
              @click="
                (e) => {
                  search(e, song.name);
                }
              "
            >
              {{ song.name }} {{song.transNames && song.transNames.length  ? '（'+song.transNames[0]+'）' : ''}} {{song.singerStr? ' - '+song.singerStr : ''}}
            </li>
          </ul>
          <div class="search-box-suggest-title" v-if="artists.length"><span>歌手</span></div>
          <ul>
            <li v-for="artist in artists"
              :key="artist.id"
              @click="
                (e) => {
                  search(e, artist.name);
                }
              "
            >
              {{ artist.name }}
            </li>
          </ul>
          <div class="search-box-suggest-title" v-if="albums.length"><span>专辑</span></div>
          <ul>
            <li v-for="album in albums"
              :key="album.id"
              @click="
                (e) => {
                  search(e, album.name);
                }
              "
            >
              {{ album.name }} {{album.artist.name ? ' - '+album.artist.name : ''}}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <a-input
      v-model:value="keyword"
      @pressEnter="search"
      @change="getSuggestFun"
      id="searchInput"
      class="search-box-body"
      placeholder="请输入歌名,歌手关键字..."
    >
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
  </a-popover>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useCloudStore } from "@/store";
import { getHotList, getSuggest } from "@/api/index.js";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { Modal } from "ant-design-vue";
import { db } from "@/plugins/db";

export default defineComponent({
  name: "SearchBox",
  setup: () => {
    const keyword = ref("");
    const visible = ref(false);
    let hotList = ref([]);
    let isShowAll = ref(false);
    let sugList = reactive({
      albums: [],
      artists: [],
      songs: [],
    });
    // 删除所有搜索历史
    const delHistory = () => {
      Modal.warning({
        content: "确定删除历史记录？",
        closable: true,
        okText: "确定",
        zIndex: 9999,
        mask: false,
        async onOk() {
          await db.searchHistory.clear();
        },
      });
    };
    // 查看全部
    const showAll = () => {
      isShowAll.value = true;
    };

    // 获取搜索建议列表
    const getSuggestFun = async (e, isLink) => {
      if (keyword.value) {
        const res = await getSuggest(keyword.value);
        if (res.code === 200) {
          sugList.albums = res.result.albums ? res.result.albums : [];
          sugList.artists = res.result.artists ? res.result.artists : [];
          sugList.songs = res.result.songs ? res.result.songs : [];
          sugList.songs = sugList.songs.map((item)=>{
            item['singerStr'] = item.artists.map((citem)=>citem.name).join(' ');
            return item;
          });
          if(!isLink){
            visible.value = true;
          }
        }
      }
    };

    // 关键字搜索
    const cloudStore = useCloudStore();
    const router = useRouter();
    const search = async (e, keywordVal) => {
      if (keywordVal) {
        keyword.value = keywordVal;
      }
      if (keyword.value) {
        getSuggestFun(null, true);
        cloudStore.setSeachKeywods(keyword.value);
        try {
          const isExistVal = await db.searchHistory
            .where({ keyword: keyword.value })
            .first();
          // Add the new collectionList!
          if (!isExistVal) {
            await db.searchHistory.add({
              keyword: keyword.value,
            });
          }
        } catch (error) {
          console.info(error);
        }
        router.push("/searchPage");
      }
      visible.value = false;
    };

    //获取热搜列表
    const getHotListFun = async () => {
      const res = await getHotList();
      if (res.code === 200) {
        hotList.value = res.data;
      }
    };

    // 删除历史搜索
    const delHis = async (id) => {
      db.searchHistory.delete(id);
    };

    onMounted(async () => {
      getHotListFun();
    });

    return {
      keyword,
      visible,
      delHistory,
      showAll,
      search,
      hotList,
      historyList: useObservable(liveQuery(() => db.searchHistory.toArray())),
      delHis,
      isShowAll,
      ...toRefs(sugList),
      getSuggestFun,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.search-content-box {
  z-index: 1020 !important;
  .ant-popover-inner-content {
    padding: 0 0 20px 0;
    .search-box {
      width: 352px;
      height: 430px;
      overflow-y: auto;
      -webkit-app-region: no-drag;
      .search-box-his {
        padding: 12px 22px 0 22px;
        .search-box-top::after {
          content: "";
          display: block;
          clear: both;
        }
        .search-box-top {
          margin-bottom: 10px;
          color: #999;
          .search-box-top-left {
            float: left;
            div {
              float: left;
              margin-right: 6px;
            }
            .search-box-top-del:hover {
              color: #666;
            }
          }
          .search-box-top-right {
            float: right;
            cursor: pointer;
          }
        }
        .search-box-list::after {
          content: "";
          display: block;
          clear: both;
        }
        .search-box-list {
          ul {
            li {
              float: left;
              margin: 6px 8px 6px 0;
              padding: 2px 16px;
              border-radius: 16px;
              border: 1px solid #ccc;
              cursor: pointer;
              position: relative;
              font-size: 12px;
              span {
                position: absolute;
                right: 1px;
                top: 3px;
                font-size: 12px;
                color: #aaa;
                display: none;
              }
            }
            li:hover {
              background: #eee;
            }

            li:hover span {
              display: block;
            }
          }
        }
        .search-box-list-part {
          max-height: 72px;
          overflow: hidden;
        }
      }
      .search-box-hot {
        .search-box-hot-title {
          padding: 12px 22px;
          color: #999;
        }
        .search-box-hot-list {
          dd {
            height: 56px;
            display: flex;
            cursor: pointer;
            .hot-list-num {
              width: 15%;
              height: 56px;
              font-size: 18px;
              text-align: center;
              line-height: 56px;
              color: #999;
            }
            .hot-list-box {
              width: 80%;
              line-height: 25px;
              .hot-list-data {
                font-size: 12px;
                color: #dbdbdb;
                margin-left: 8px;
              }
              .hot-list-content {
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .hot-list-box-single {
              line-height: 56px;
            }
          }
          dd:hover {
            background: #eee;
          }
          dd:nth-child(-n + 3) {
            .hot-list-num {
              color: @primary-color;
            }
            .hot-list-box {
              .hot-list-name {
                font-weight: 700;
              }
            }
          }
        }
      }

      .search-box-suggest {
        .search-box-suggest-title {
          padding: 12px 22px 12px 18px;
          color: #999;
          span {
            margin-right: 8px;
          }
        }
        .search-box-suggest-title:hover {
          color: #666;
        }
        ul {
          li {
            padding: 6px 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          li:hover {
            background: #eee;
          }
        }
      }
    }
  }
}
.search-box-body {
  border-radius: 18px !important;
  background-color: rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  .ant-input-prefix {
   color: #fff;
  }
  #searchInput {
    background-color: transparent !important;
    color: #fff;
  }
}
</style>
