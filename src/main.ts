import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './components/SvgIcon.vue'
import 'virtual:svg-icons-register'
import * as VueRouter from 'vue-router'
import routes from './config/route'
// import TCPlayer from 'tcplayer.js';
<<<<<<< HEAD
import 'tcplayer.js/dist/tcplayer.min.css';
// import vuex from 'vuex'
=======
import 'tcplayer.js/dist/tcplayer.min.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

>>>>>>> 53f0e67a17c25f7340a553a7e1fe2d50f1242512


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('SvgIcon', SvgIcon);
app.use(router)
// app.use(vuex)
app.use(ElementPlus)
// app.use(TCPlayer)
app.use(ElementPlus, {
    locale: zhCn,
  })

app.mount('#app')