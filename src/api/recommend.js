// 导入 axios配置
import request from "@/utils/request"

// export const getTfidfRecommend = (lyric) => request({
//     url: `api/getTfidfRecommend`,
//     method: 'get',
//     params: {lyric: lyric}
// })

export const getTfidfRecommendByLyrics = (lyric) => request({
    url: `api/getTfidfRecommendByLyrics`,
    method: 'post',
    data: { lyric: lyric }
});

export const getTfidfRecommendByTrack = (track) => request({
    url: `api/getTfidfRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getW2VRecommendByTrack = (track) => request({
    url: `api/getW2VRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getLdaRecommendByTrack = (track) => request({
    url: `api/getLdaRecommendByTrack`,
    method: 'get',
    params: {track: track}
})

export const getWeightedRecommendByTrack = (track) => request({
    url: `api/getWeightedRecommendByTrack`,
    method: 'get',
    params: {track: track}
})


export const get2dModel = params => request({
    url: `/api/get2dModel`,
    method: 'get',
    params
})

