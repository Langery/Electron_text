import axios from 'axios';
import config from '../config/index';

// axios 单例:全局共享 baseURL / timeout / headers
const api = axios.create({
  baseURL: config.baseUrl.dev,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器:自动注入 Bearer token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器:统一返回 data,401 派发事件由 App.js 跳登录,统一错误结构
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject({
      code: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
  }
);

// 统一请求出口
export const request = {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url, params) => api.delete(url, { params })
};

// 导出底层 axios 实例,供 useRequest 等需要传 AbortController signal 的场景使用
// 业务代码仍推荐用上面的 request 对象,这个导出仅作 hook 底层通道
export { api };

export default request;
