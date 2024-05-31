// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const getRecommArtist = params => request({
    url: `/app/getRecommArtist`,
    method: 'get',
    params
})

