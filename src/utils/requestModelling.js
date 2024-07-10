// 网络请求封装
import axios from 'axios'
import {Model_API_URL} from "@/utils/connection";

// 创建一个axios实例
const requestModelling = axios.create({
    baseURL: Model_API_URL, // 基础URL
    timeout: 100000 // 请求超时时间
});

// 请求拦截器
requestModelling.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

export default requestModelling;