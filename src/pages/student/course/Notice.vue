<template>
  <div>
    <!-- <el-card class="box-card welcomeCard" shadow="never">
      <span class="welcome">上次学习到： </span>
      <el-text class="mx-1" type="primary">课程一/视频小标题</el-text>
      <el-button type="warning" class="goOnLearning">继续学习</el-button>
    </el-card> -->
    <el-card class="box-card notice" shadow="never">
      <template #header>
        <div class="card-header">
          <h3>公告</h3>
        </div>
      </template>
      <div class="text item" v-for="notice in noticeData">
        <h4>{{ notice.notice_title }}</h4>
        <el-text class="mx-1" type="info">
          {{ notice.notice_text }}
        </el-text>
        <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
      </div>

    </el-card>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import SpecialIcon from '../../../components/SpecialIcon.vue';
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

onMounted(async () => {
  await getNotice(courseId.value)
})


const getNotice = async (value: any) => {
  try {
    const response = await myAxios.get('/course/getNotice', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.notices = response.data
    sessionStorage.setItem('notices', JSON.stringify(state.notices))
    const coursesString = sessionStorage.getItem('notices');
    if (coursesString) {
      noticeData.value = JSON.parse(coursesString)
    }

  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const noticeData: any = ref()
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}

.box-card {
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;

}

.welcomeCard {
  position: relative;
}

.welcome {
  margin-left: 50px;
}

.goOnLearning {
  position: absolute;
  right: 50px;
  top: 15px;
}

.notice {
  margin-top: 10px;
}

.text {
  border-bottom: 1px solid #e3e3e3;
  padding: 0 50px;
}

.item {
  margin-bottom: 18px;
}

.releaseTime {
  display: block;
  text-align: right;
  margin-top: 10px;
  margin-bottom: 20px;
}

:deep(.el-card__body) {
  padding-left: 0;
  padding-right: 0;
}
</style>