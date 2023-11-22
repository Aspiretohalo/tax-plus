import * as VueRouter from 'vue-router'
import routes from "./route";
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
const jwt = ref()


router.beforeEach(async (to) => {
    jwt.value = localStorage.getItem('token')
    if (!jwt.value && (to.name !== 'login1' && to.name !== 'login2')) {
        ElMessage({
            showClose: true,
            message: '请先登录！！',
            type: 'warning',
        })
        // 将用户重定向到登录页面
        return { name: 'login1' }
    }
})
export default router