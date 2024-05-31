// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const search = params => request({
    url: `/app/search`,
    method: 'get',
    params
})

