// 导入 axios配置
import request from "@/utils/request"


// 查询ip
export const gerVisitors = params => request({
    url: `/api/gerVisitors`,
    params
})

// 添加ip
export const postVisitor = params => request({
    url: `/api/postVisitor`,
    method:"POST",
    data: params
})