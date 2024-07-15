// 导入 axios配置
import request from "@/utils/request"

export const getLyricsFromGenius = (track) => request({
    url: `api/getLyricsFromGenius`,
    method: 'get',
    params: {
        artist: track,
        track:track
    }
})
