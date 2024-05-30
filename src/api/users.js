// 导入 axios配置
import request from "@/utils/request"

// 查询ip
export const login = data => request({
    url: '/api/login',
    method: 'post',
    data
});

export const signup = data => request({
    url: '/api/register',
    method: 'post',
    data
});

export const getUser = data => request({
    url: '/app/getUser',
    method: 'get',
    data
});

