/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2022-06-08 10:18:53
 * @FilePath: /main-project/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router, { customRoutes } from './route'
import store from './store'
import ElementPlus from 'element-plus'
import { routeConfigStore } from '@/store/route'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import zkPackage from 'zk-package'

import '@/assets/font/style.css'
import './mock/index.ts'
import './permission'
// import './qiankun.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(zkPackage)

const routeConfig = routeConfigStore()
routeConfig.setRouteMenuData(customRoutes)
app.mount('#app')
