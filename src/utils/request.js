// 网络请求封装
import axios from 'axios'
import {API_URL} from "@/utils/connection";

// 创建一个axios实例
const request = axios.create({
    baseURL: API_URL, // 基础URL
    timeout: 100000 // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如添加token
        const token = localStorage.getItem('access_token'); // 从本地存储中获取token
        if (token) {
            config.headers['Authorization'] = token; // 添加token到请求头
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

export default request;