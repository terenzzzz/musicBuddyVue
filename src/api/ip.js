// 导入 axios配置
import request from "@/utils/request"


// 查询ip
export const getIps = params => request({
    url: `/api/getIps`,
    params
})

// 添加ip
export const postIp = params => request({
    url: `/api/postIp`,
    method:"POST",
    data: params
})