import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import 'dayjs/locale/zh-cn.js'
import pinia from '@/store'
import router from "@/router";
import '@/router/permission'
import '@/styles/index.css'


const app = createApp(App)

app.use(ElementPlus, {locale: zhCn})
app.use(pinia)
app.use(router)

app.mount('#app')
