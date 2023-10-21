import axios,  { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const request = axios.create({
  baseURL: 'http://120.53.92.121:4000/',
  timeout: 100000,
  headers: { 'X-Custom-Header': 'foobar' },
});
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] =
        'Bearer ' + localStorage.getItem('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    console.log(error);
  },
);
console.log(axios);
export default request;