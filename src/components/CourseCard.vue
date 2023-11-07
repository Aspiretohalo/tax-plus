<template>
  <div class="home">
    <div class="search">
      <el-select v-model="value" class="m-2" placeholder="筛选" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="input3" placeholder="请输入课程名称、教师等" class="input-with-select">
        <template #prefix>
          <el-button :icon="Search" style="border: 0" />
        </template>
      </el-input>
    </div>

    <el-space direction="vertical" alignment="start" :size="30">
      <el-space wrap :size="size">
        <el-card v-for="item in allCourses" :key="item.course_id" @click="goToSelect(item.course_id)" shadow="hover"
          class="courseCard box-card">
          <div>
            <el-image :src="item.course_url" />
          </div>
          <div style="padding: 14px">
            <span>{{ item.course_name }}<el-tag>{{ item.teacher_name }}</el-tag></span>
            <span>
              <time class="time" style="font-size: small;"> 2023/11/8 </time>
            </span>
            <p style="font-size: 12px; color: #73767a;">{{ item.course_description }}</p>
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

const goToSelect = (courseId: number) => {
  router.push(`/courseJoin/courseId/${courseId}/courseSelection`)
}
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

const size = ref('large')
const value = ref('')
const input3 = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.home {
  /* margin-left: 15px; */
  margin-top: 20px;
}

.input-with-select {
  display: inline;
  /* position: absolute; */
  margin-left: 520px;
}

.search {
  margin-bottom: 30px;
}

::v-deep .el-input__wrapper {
  width: 300px;
  height: 40px;
}

::v-deep .el-select {
  position: absolute;
  display: inline-block;
  margin-left: 10px;
  width: 150px;
}

::v-deep .el-card {
  width: 280px;
  height: 300px;
  margin-left: 10px;
  border-radius: 10px;
}

.courseCard {
  cursor: pointer;
}

::v-deep .el-card__body {
  padding: 0;
}

.pic {
  width: 550px;
  height: 100px;
}
</style>
