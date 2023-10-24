import LoginStudent from "../pages/LoginStudent.vue"
import LoginTeacher from "../pages/LoginTeacher.vue"
import PersonalCommunity from '../pages/teacher/PersonalCommunity.vue'
//student
import MyLearning from '../pages/student/MyLearning.vue'
import LivingCourse from '../pages/student/LivingCourse.vue'
import OnlineCourse from '../pages/student/OnlineCourse.vue'
import DiscussionCommunity from '../pages/student/DiscussionCommunity.vue'
import AIAsistant from '../pages/student/AIAsistant.vue'
import Schedule from '../pages/student/Schedule.vue'
import CourseDetails from '../pages/student/CourseDetails.vue'
import Notice from '../pages/student/course/Notice.vue'
import Livingroom from '../pages/student/course/Livingroom.vue'
import Progress from '../pages/student/course/Progress.vue'
import CourseVideo from '../pages/student/course/CourseVideo.vue'
import Data from '../pages/student/course/Data.vue'
import Evaluation from '../pages/student/course/Evaluation.vue'
import Discussion from '../pages/student/course/Discussion.vue'
import Detail from '../pages/student/course/Detail.vue'
import StudentMsg from '../pages/student/StudentMsg.vue'
//teacher
import CourseManage from '../pages/teacher/CourseManage.vue'
import CourseRelease from '../pages/teacher/CourseRelease.vue'
import CourseDetailTeacher from '../pages/teacher/CourseDetailTeacher.vue'
import CreateChapters from '../pages/teacher/course/CreateChapters.vue'
import ManageNotice from '../pages/teacher/course/ManageNotice.vue'
import ViewDiscussion from '../pages/teacher/course/ViewDiscussion.vue'
import ViewEvaluations from '../pages/teacher/course/ViewEvaluations.vue'
import ManageCourseData from '../pages/teacher/course/ManageCourseData.vue'
import TeacherMsg from '../pages/teacher/TeacherMsg.vue'

const routes = [
    { path: '/loginStudent', name: 'login1', component: LoginStudent },
    { path: '/loginTeacher', name: 'login2', component: LoginTeacher },
    { path: '/', component: MyLearning, },
    { path: '/living', component: LivingCourse },
    { path: '/course', component: OnlineCourse },
    { path: '/community', component: DiscussionCommunity },
    { path: '/asistant', component: AIAsistant },
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
                path: 'detail/:chapter_index',
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
    { path: '/courseRelease', component: CourseRelease },
    { path: '/courseManage', component: CourseManage },
    {
        path: '/courseId/:courseId', component: CourseDetailTeacher,
        children: [
            {
                path: 'createChapters',
                component: CreateChapters,
            },
            {
                path: 'manageNotice',
                component: ManageNotice,
            },
            {
                path: 'viewDiscussion',
                component: ViewDiscussion,
            },
            {
                path: 'viewEvaluations',
                component: ViewEvaluations,
            },
            {
                path: 'manageCourseData',
                component: ManageCourseData,
            },
        ]
    },
    { path: '/studentMsg', component: StudentMsg },
    { path: '/teacherMsg', component: TeacherMsg },
    { path: '/PersonalCommunity', component: PersonalCommunity },

]

export default routes