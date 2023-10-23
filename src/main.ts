import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './components/SvgIcon.vue'
import 'virtual:svg-icons-register'
// import * as VueRouter from 'vue-router'
// import routes from './config/route'
import router from './config/router'
import 'tcplayer.js/dist/tcplayer.min.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import store from './store'



const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('SvgIcon', SvgIcon);
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
})

app.mount('#app')