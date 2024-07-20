// 导入 axios配置
import request from "@/utils/request"

export const getLyricsFromGenius = (artist, track) => request({
    url: `api/getLyricsFromGenius`,
    method: 'get',
    params: {
        artist: artist,
        track:track
    }
})
