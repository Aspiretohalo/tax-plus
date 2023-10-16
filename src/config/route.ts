import Login from "../pages/Login.vue"
import MyLearning from '../pages/MyLearning.vue'
import LivingCourse from '../pages/LivingCourse.vue'
import OnlineCourse from '../pages/OnlineCourse.vue'
import DiscussionCommunity from '../pages/DiscussionCommunity.vue'
import AIAsistant from '../pages/AIAsistant.vue'
import Schedule from '../pages/Schedule.vue'
import CourseDetails from '../pages/CourseDetails.vue'
import Notice from '../pages/course/Notice.vue'
import Livingroom from '../pages/course/Livingroom.vue'
import Progress from '../pages/course/Progress.vue'
import CourseVideo from '../pages/course/CourseVideo.vue'
import Data from '../pages/course/Data.vue'
import Evaluation from '../pages/course/Evaluation.vue'
import Discussion from '../pages/course/Discussion.vue'
import Detail from '../pages/course/Detail.vue'

const routes = [
    { path: '/', component: MyLearning, },
    { path: '/living', component: LivingCourse },
    { path: '/course', component: OnlineCourse },
    { path: '/community', component: DiscussionCommunity },
    { path: '/asistant', component: AIAsistant },
    { path: '/login', component: Login },
    { path: '/schedule', component: Schedule },
    {
        path: '/courseId/:courseId', component: CourseDetails,
        children: [
            {
                path: 'notice',
                component: Notice,
            },
            {
                path: 'livingroom',
                component: Livingroom,
            },
            {
                path: 'progress',
                component: Progress,
            },
            {
                path: 'courseVideo',
                component: CourseVideo,
            },
            {
                path: 'detail',
                component: Detail,
            },

            {
                path: 'data',
                component: Data,
            },
            {
                path: 'evaluation',
                component: Evaluation,
            },
            {
                path: 'discussion',
                component: Discussion,
            },
        ],
    },
]

export default routes