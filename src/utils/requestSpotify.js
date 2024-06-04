import axios from 'axios'
import API_URL from "@/utils/connection";
import { refreshToken } from "@/api/spotify";

// 创建一个axios实例
const requestSpotify = axios.create({
    baseURL: API_URL, // 基础URL
    timeout: 100000 // 请求超时时间
});

// 刷新令牌函数
const refreshTokenFunc = async () => {
    const storedRefreshToken = localStorage.getItem('spotify_refresh_token');
    try {
        const response = await refreshToken({ refresh_token: storedRefreshToken });
        const { access_token } = response.data;
        localStorage.setItem('spotify_access_token', access_token);
        localStorage.setItem('token_generate_time', Date.now());
        return access_token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
    }
};

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

// 响应拦截器
requestSpotify.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 || error.response.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const access_token = await refreshTokenFunc();
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return requestSpotify(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default requestSpotify;