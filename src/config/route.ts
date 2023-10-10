import Main from '../pages/Main.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import UserEdit from '../pages/UserEdit.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import Search from '../pages/Search.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/team', component: Team },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
]

export default routes