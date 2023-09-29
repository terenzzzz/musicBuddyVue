// 网络请求封装
import axios from 'axios'

// 开发使用
// axios.defaults.baseURL = "http://0.0.0.0:592"
axios.defaults.baseURL = "http://47.106.139.89:592"


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios