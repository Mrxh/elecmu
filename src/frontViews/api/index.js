import http from '@/utils/http';

// 获取首页banner
export function getBanner() {
    return http.get('/banner');
}

// 获取首页推荐歌单
export function getPersonalized() {
    return http.get('/personalized?limit=10');
}

// 获取热门播客
export function getDjTopList() {
    return http.get('/dj/program/toplist?limit=6');
}

// 关键字搜索歌曲
export function getSearchList(keywords, limit, offset) {
    const url = `/cloudsearch/get/web?keywords=${keywords}&limit=${limit}&offset=${offset}`;
    return http.get(url);
}

// 获取歌曲url
export function getSongUrl(id) {
    return http.get('/song/url?id='+id);
}

// 获取歌曲详情
export function getSongDetail(id) {
    return http.get('/song/detail?ids='+id);
}

// 热搜列表
export function getHotList() {
    return http.get('/search/hot/detail');
}

// 搜索建议
export function getSuggest(keyword) {
    return http.get('/search/suggest?keywords=' + keyword);
}