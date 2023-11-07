<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenuTeacher></LeftMenuTeacher>
        </el-aside>
        <el-main class="main">
          <el-tabs v-model="activeName" @tab-change="changeStatus(activeName)" class="demo-tabs">
            <el-tab-pane label="全部课程" name="first"></el-tab-pane>
            <el-tab-pane v-for="item in courseStatus" :label="item.name" :name="item.status" :key="item.status">
            </el-tab-pane>
          </el-tabs>
          <el-table class="table" :data="activeName == 'first' ? courseData : store.getters.selectCourses"
            :show-header="false">
            <el-table-column prop="course_url" label="course_url" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-image :src="scope.row.course_url" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="course_name" label="course_name" width="180" />
            <el-table-column prop="teacher_name" label="teacher_name" />
            <el-table-column prop="status" label="status">
              <template #default="scope">
                <el-tag :type="scope.row.tag_type" size="large" disable-transitions>{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="course_id" label="course_id">
              <template #default="scope">
                <el-button type="primary" @click="EnterTheCourse(scope.row.course_id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
import TopNav from '../../components/TopNav.vue'

import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import myAxios from '../../plugins/myAxios'
import state from '../../store/state'
import store from '../../store'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  await getTeacherMsg()
  await getTeacherCourses(teacher_id.value)
})

const activeName = ref('first')
const teacher_id = ref()

const getTeacherMsg = async () => {
  try {
    const response = await myAxios.get('/getTeacherMsg', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    console.log(response.data);
    state.teachers = response.data
    teacher_id.value = response.data.teacher_id
    sessionStorage.setItem('teachers', JSON.stringify(state.teachers))
  } catch (error) {
    console.error('获取学生信息失败', error);
  }
};
const getTeacherCourses = async (value: any) => {
  try {
    const response = await myAxios.get('/getTeacherCourses', {
      params: {
        teacher_id: value
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

// tab改变之后调用，获得相应的course
const changeStatus = (activeName: string) => {
  state.activeName = activeName
}
const EnterTheCourse = (courseId: Number) => {
  router.push(`/courseId/${courseId}/manageNotice`)
}

const courseStatus = reactive([
  {
    status: 'Ongoing',
    name: '进行中',
  },
  {
    status: 'Completed',
    name: '已结束',
  },
  {
    status: 'Coming',
    name: '即将开始',
  },
])

const courseData: any = ref()
</script>

<style  scoped>
.icon {
  display: block;
  margin: 0 auto;
}

.table {
  position: absolute;
  top: 140px;
  width: 80%;
  border-radius: 15px;
}

.demo-tabs {
  position: absolute;
}

div {
  display: inline-block;
}

::v-deep .el-aside {
  width: 258px;
}
</style>