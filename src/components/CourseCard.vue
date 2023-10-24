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
        <el-card v-for="item in allCourses" :key="item.course_id" class="courseCard box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ item.teacher_name }}</span>
            </div>
          </template>
          <div class="pic">
            <el-image :src="item.course_url" />
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

onMounted(async () => {
  await getAllCourses()
})
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
  /* margin-bottom: 20px; */
  width: 150px;
}

::v-deep .el-card {
  width: 400px;
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
