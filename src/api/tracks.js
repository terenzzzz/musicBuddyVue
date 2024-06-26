// 导入 axios配置
import request from "@/utils/request"

export const getTfidfSimilarities = (track) => request({
    url: `/app/getTfidfSimilarities`,
    method: 'get',
    params: {track: track}
})


export const getLyricTopWords = (track) => request({
    url: `/app/getLyricTopWords`,
    method: 'get',
    params: {track: track}
})

export const getRandomTrack = params => request({
    url: `/api/getRandomTracks`,
    method: 'get',
    params
})

export const getTrackById = params => request({
    url: `/app/getTrackById`,
    method: 'get',
    params
})

export const getTracksByArtist = artist => request({
    url: `/app/getTracksByArtist`,
    method: 'get',
    params: {artist: artist}
})

export const getTracksByTag = tag => request({
    url: `/app/getTracksByTag`,
    method: 'get',
    params: {tag: tag}
})

export const getTracksByTags = tags => request({
    url: `/app/getTracksByTags`,
    method: 'get',
    params: {tags: tags}
})


