// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const getRandomTrack = params => request({
    url: `/api/getRandomTracks`,
    method: 'get',
    params
})

