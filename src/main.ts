/*
 * @Description: main.ts 入口文件设置
 * @Autor: Alfred
 * @Date: 2021-05-18 15:12:21
 * @LastEditTime: 2021-05-31 12:04:52
 * @FilePath: \manager-admin\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
