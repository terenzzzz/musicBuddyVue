// 网络请求封装
import axios from 'axios'
import API_URL from "@/utils/connection";

// 创建一个axios实例
const requestSpotify = axios.create({
    baseURL: API_URL, // 基础URL
    timeout: 100000 // 请求超时时间
});

// 请求拦截器
requestSpotify.interceptors.request.use(
    config => {
        const token = localStorage.getItem('spotify_access_token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default requestSpotify;