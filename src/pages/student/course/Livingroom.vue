<template>
  <div>
    <el-card class="box-card welcomeCard" shadow="never">
      <span class="welcome">提示： </span>
      <el-text class="mx-1" type="primary">在下列直播公告点击链接进入直播间</el-text>
    </el-card>
    <el-card class="box-card notice" shadow="never">
      <template #header>
        <div class="card-header">
          <h3>直播公告</h3>
        </div>
      </template>
      <div class="text item" v-for="item in LivingNotices" style="position: relative;padding-bottom: 20px;">

        <h4>{{ item.living_course_name }}</h4>
        <el-text class="releaseTime mx-1" style="position: absolute;left: 500px;top: -10px;">直播时间：{{ item.start_time
        }}</el-text>
        <div class="link">
          {{ item.meeting_id !== undefined ? '前往直播间：' : '直播尚未开始' }}<el-link type="warning"
            @click="goToLivingModel(item.meeting_id)">{{ item.meeting_id }}</el-link>
          <el-button v-if="item.meeting_id !== undefined" type="warning" style="position: absolute;right: 50px;top: 0px;"
            @click="goToWatchReplay(item.meeting_id)">回放</el-button>
        </div>
        <el-text class="mx-1" type="info">
          {{ item.living_course_description }}
        </el-text>

      </div>

    </el-card>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import SpecialIcon from '../../../components/SpecialIcon.vue';
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseId = ref(route.params.courseId)

onMounted(async () => {
  await getLivingNotice(courseId.value)
  // hasReplay()
})

const getLivingNotice = async (value: any) => {
  try {
    const response = await myAxios.get('/getLivingNotice', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.LivingNotices = response.data
    sessionStorage.setItem('LivingNotices', JSON.stringify(state.LivingNotices))
    const coursesString = sessionStorage.getItem('LivingNotices');
    if (coursesString) {
      LivingNotices.value = JSON.parse(coursesString)
      LivingNotices.value.forEach((item: any) => {
        item.start_time = moment(item.start_time).format('YYYY/MM/DD HH:mm')
      });
    }
  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const LivingNotices: any = ref()
const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')

const goToLivingModel = (value: string) => {
  window.open(`http://localhost:3000?ifStudent=${1}&courseId=${courseId.value}&name=${student.value.student_name}&meeting_id=${value}`, '_blank');
}
const goToWatchReplay = (value: string) => {
  console.log(value);

  router.push({
    name: 'recording',
    params: {
      meetingId: value  // 参数名和值
    }
  })
}
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