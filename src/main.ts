/*
 * @Descripttion: 入口文件
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-02-20 19:52:42
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-23 11:44:50
 */
import "amfe-flexible"
import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import router from "./router"
import "animate.css/animate.min.css"
import { name, version } from "../package.json"
import "./style/reset.css"
import "virtual:svg-icons-register"
import FastClick from "fastclick"


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
    .use(pinia)
    .mount("#app")
    .$nextTick(() => { 
        FastClick(document.body);
        window.localStorage.setItem(`${name}-version`, version)
    })
