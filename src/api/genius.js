// 导入 axios配置
import request from "@/utils/request"

export const proxyGeniusImg = (url) => request({
    url: `api/proxyGeniusImg`,
    method: 'get',
    params: {
        url
    }
})

export const getLyricsFromGenius = (artist, track) => request({
    url: `api/getLyricsFromGenius`,
    method: 'get',
    params: {
        artist: artist,
        track:track
    }
})
