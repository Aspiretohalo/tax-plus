<template>
  <div class="home">
    <div class="search">
      <el-input v-model="input3" placeholder="请输入课程名称、教师等" class="input-with-select">
        <template #prefix>
          <el-button :icon="Search" style="border: 0" />
        </template>
      </el-input>
    </div>

    <el-space direction="vertical" alignment="start" :size="30">
      <el-space wrap size="large">
        <el-card v-for="item in allCourses" :key="item.course_id" @click="goToSelect(item.course_id)" shadow="hover"
          class="courseCard box-card">
          <div>
            <el-image :src="item.course_url" style="height: 150px;width: 100%;" />
          </div>
          <div style="padding: 14px">
            <span style="font-size: large;">{{ item.course_name }}</span>
            <!-- <el-tag style="float: right;" :type="item.tag_type">{{ item.status }}</el-tag> -->
            <span>
            </span>
            <div style="margin-top: 10px; color: #73767a;">{{ item.teacher_name }}
              <!-- <span class="time" style="font-size: small; float: right;"> 2023/11/8 </span> -->
            </div>
            <el-text line-clamp="2" :truncated="true" style="font-size: 14px; color: #909399; margin-top: 20px;">
              {{ item.course_description }}</el-text>
          </div>
        </el-card>
      </el-space>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import myAxios from '../plugins/myAxios'
import state from '../store/state'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(async () => {
  await getAllCourses()
})

const goToSelect = async (courseId: number) => {
  await getCourseByCourseId(courseId)
  router.push(`/courseJoin/courseId/${courseId}/courseSelection`)
}

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
////////////////////获得所有课程
const getAllCourses = async () => {
  try {
    const response = await myAxios.get('/getAllCourses', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.allCourses = response.data
    sessionStorage.setItem('allCourses', JSON.stringify(state.allCourses))
    const coursesString = sessionStorage.getItem('allCourses');
    if (coursesString) {
      allCourses.value = JSON.parse(coursesString)
    }

  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const allCourses: any = ref()

const input3 = ref('')

</script>

<style lang="scss" scoped>
.home {
  /* margin-left: 15px; */
  margin-top: 40px;
}

.input-with-select {
  display: inline;
}

.search {
  margin-bottom: 30px;
}

:deep(.el-space) {
  width: 1100px;
}

:deep(.el-input__wrapper) {
  width: 300px;
  height: 40px;
}

:deep(.el-select) {
  position: absolute;
  display: inline-block;
  margin-left: 10px;
  width: 150px;
}

:deep(.el-card) {
  width: 250px;
  height: 290px;
  // margin-left: 10px;
  border-radius: 10px;
}

.courseCard {
  cursor: pointer;
}

:deep(.el-card__body) {
  padding: 0;
}

.pic {
  width: 550px;
  height: 100px;
}
</style>
