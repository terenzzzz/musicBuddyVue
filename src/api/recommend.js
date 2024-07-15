// 导入 axios配置
import request from "@/utils/request"

export const getTfidfRecommend = (lyric) => request({
    url: `api/getTfidfRecommend`,
    method: 'get',
    params: {lyric: lyric}
})

export const getTfidfSimilarity = (track) => request({
    url: `api/getTfidfSimilarity`,
    method: 'get',
    params: {track: track}
})

export const getW2VSimilarity = (track) => request({
    url: `api/getW2VSimilarity`,
    method: 'get',
    params: {track: track}
})

export const getLdaSimilarity = (track) => request({
    url: `api/getLdaSimilarity`,
    method: 'get',
    params: {track: track}
})

export const getWeightedSimilarity = (track) => request({
    url: `api/getWeightedSimilarity`,
    method: 'get',
    params: {track: track}
})


export const get2dModel = params => request({
    url: `/api/get2dModel`,
    method: 'get',
    params
})

