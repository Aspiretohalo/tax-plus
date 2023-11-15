<template>
  <div>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main class="main">
          <!-- <el-tabs v-model="activeName" @tab-change="changeStatus(activeName)" class="demo-tabs"> -->
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="全部课程" name="first"></el-tab-pane>
            <!-- <el-tab-pane v-for="item in courseStatus" :label="item.name" :name="item.status" :key="item.status">
            </el-tab-pane> -->
          </el-tabs>
          <el-table class="table" :data="activeName == 'first' ? courseData : store.getters.selectCourses"
            :show-header="false">
            <el-table-column prop="course_url" label="course_url" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-image :src="scope.row.course_url" style="width: 100%;height: 120px;" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="course_name" label="course_name" width="180" />
            <el-table-column prop="teacher_name" label="teacher_name" />
            <!-- <el-table-column prop="status" label="status">
              <template #default="scope">
                <el-tag :type="scope.row.tag_type" size="large" disable-transitions>{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column prop="course_id" label="course_id">
              <template #default="scope">
                <el-button type="primary" @click="EnterTheCourse(scope.row.course_id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <UpcomingCourses></UpcomingCourses>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'

import UpcomingCourses from '../../components/UpcomingCourses.vue'
import LeftMenu from '../../components/LeftMenu.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import myAxios from '../../plugins/myAxios'
import state from '../../store/state'
import store from '../../store'

const router = useRouter()
onMounted(async () => {
  await getStudentMsg()
  await getCourses(student_id.value)
})

const student_id = ref()

const getStudentMsg = async () => {
  try {
    const response = await myAxios.get('/getStudentMsg', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.students = response.data
    student_id.value = response.data.student_id
    sessionStorage.setItem('students', JSON.stringify(state.students))
  } catch (error) {
    console.error('获取学生信息失败', error);
  }
};

const getCourses = async (value: any) => {
  try {
    const response = await myAxios.get('/getCourses', {
      params: {
        student_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.courses = response.data
    sessionStorage.setItem('courses', JSON.stringify(state.courses))
    const coursesString = sessionStorage.getItem('courses');
    if (coursesString) {
      courseData.value = JSON.parse(coursesString)
    }

  } catch (error) {
    console.error('获取课程信息失败', error);
  }
};
const getCourseByCourseId = async (value: any) => {
  try {
    const response = await myAxios.get('/getCourseByCourseId', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.singleCourse = response.data
    sessionStorage.setItem('singleCourse', JSON.stringify(state.singleCourse))
  } catch (error) {
    console.error('获取信息失败', error);
  }
};
// // tab改变之后调用，获得相应的course
// const changeStatus = (activeName: string) => {
//   state.activeName = activeName
// }


const EnterTheCourse = async (courseId: Number) => {
  await getCourseByCourseId(courseId)
  router.push(`/courseId/${courseId}/notice`)
}

const activeName = ref('first')
// const courseStatus = reactive([
//   {
//     status: 'Ongoing',
//     name: '进行中',
//   },
//   {
//     status: 'Completed',
//     name: '已结束',
//   },
//   {
//     status: 'Coming',
//     name: '即将开始',
//   },
// ])

//课程数据
const courseData: any = ref()

</script>

<style lang="scss" scoped>
.icon {
  display: block;
  margin: 0 auto;
}

.table {
  position: absolute;
  top: 140px;
  width: 50%;
  border-radius: 10px;
}

.demo-tabs {
  position: absolute;
}

div {
  display: inline-block;
}

:deep(.el-aside) {
  width: 258px
}
</style>