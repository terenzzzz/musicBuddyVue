// 导入 axios配置
// 网络请求封装
import axios from 'axios'
let baseURL = "https://api.day.app/4TGvwEmpxbhQLC2SM8PXpE"

// 添加ip
export const pushVisitor = params => axios({
    url: baseURL,
    method:"POST",
    data: params
})