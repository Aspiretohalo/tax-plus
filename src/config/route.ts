import Login from "../pages/Login.vue"
import MyLearning from '../pages/MyLearning.vue'
import LivingCourse from '../pages/LivingCourse.vue'
import OnlineCourse from '../pages/OnlineCourse.vue'
import DiscussionCommunity from '../pages/DiscussionCommunity.vue'
import AIAsistant from '../pages/AIAsistant.vue'


const routes = [
    { path: '/', component: MyLearning },
    { path: '/living', component: LivingCourse },
    { path: '/course', component: OnlineCourse },
    { path: '/community', component: DiscussionCommunity },
    { path: '/asistant', component: AIAsistant },
    { path: '/login', component: Login },

]

export default routes