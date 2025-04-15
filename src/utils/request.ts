import axios from "axios";
import useUserStore from "@/store/modules/user";
import {ElMessage} from "element-plus";


const request = axios.create({
    baseURL: "/api",
    timeout: 5000
});

request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const userStore = useUserStore()
        if(userStore.token) {
            config.headers.token = userStore.token;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        if(response.data.code !== 200) {
            return Promise.reject(new Error(response.data.msg || 'Error'))
        }
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
)

export default request;