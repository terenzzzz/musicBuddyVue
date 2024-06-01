// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const spotifyLogin = params => request({
    url: `/app/spotifyLogin`,
    method: 'get',
    params
})

