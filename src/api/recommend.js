// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const get2dModel = params => request({
    url: `/api/get2dModel`,
    method: 'get',
    params
})

