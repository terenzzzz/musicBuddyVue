// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const getAllTags = params => request({
    url: `/app/getAllTags`,
    method: 'get',
    params
})

export const getTagById = tag => request({
    url: `/app/getTagById`,
    method: 'get',
    params:{tag:tag}
})


