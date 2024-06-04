// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const search = (keyword, type) => request({
    url: `/app/search`,
    method: 'get',
    params: {
        keyword,
        type,
        limit: 10
    }
})

