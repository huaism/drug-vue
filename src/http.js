import axios from 'axios';
import router from './router'
const url = 'http://localhost:8888'/*设置全局请求地址*/


//请求拦截
axios.interceptors.request.use(config => {
    if (config.url.indexOf(url) === -1) {
        config.url = url + config.url; /*拼接完整请求路径*/
    }
    if (config.url.indexOf("login") == -1) {
        const token = localStorage.getItem("auth-token");
        config.headers['auth-token'] = token /*设置统一请求头*/
    }
    return config
}, error => {
    return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { status } = error.response;
        console.log(status);
        switch (status) {
            case 401:
                localStorage.removeItem('auth-token'); //清除token
                router.replace('/login')//跳转登陆页面
                break;
            case 403:
                router.replace('/error/403')
                break;
            case 500:
                router.replace('/error/500')
                break;
            case 404:
                router.replace('/error/404')
                break;
            default:
                router.replace('/error/500')
                break;
        }
        return Promise.reject(error)
    }
);

export default axios;


