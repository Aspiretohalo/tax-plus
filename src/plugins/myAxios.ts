import axios, { AxiosInstance } from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8085' : 'api',
});

// myAxios.defaults.withCredentials = true; // 配置为true

myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    return config;
}, function (error) {
    return Promise.reject(error);
});

myAxios.interceptors.response.use(function (response: any) {
    console.log('我收到你的响应啦', response)
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/student/login?redirect=${redirectUrl}`;
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default myAxios;
