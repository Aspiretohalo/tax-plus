<template>
  <div class="upcoming">
    <h2 class="pl">直播课即将开始</h2>
    <el-row v-for="item in allLivingCourses" :key="item.living_course_id" :span="8">
      <el-col style="margin-top: 5px;">
        <el-card :body-style="{ padding: '0px' }" class="card-circle">
          <div style="padding: 14px">
            <span> <el-avatar :size="50" :src="item.avatar" />
            </span>
            <p class="course_name">{{ item.living_course_name }}</p>
            <div style="font-size: small; margin-top: 5px;">
              教师：<span style="color: #73767a;">{{ item.teacher_name }}</span>
              <span class="time" style="float: right;">{{ livingTime }}</span>
            </div>
            <div class="bottom">
              <span style="font-size: small;">归属课程：<span
                  style="color: #73767a;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{
                    item.course_name }}</span></span>
              <el-button text class="button" type="primary" @click="goToLiving(item.course_id)">前往</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import myAxios from '../plugins/myAxios'
import state from '../store/state'
import { useRouter } from 'vue-router'

const router = useRouter()
const livingTime = ref("11-8 12:30")

onMounted(async () => {
  await getAllLivingCourses()
})

const getAllLivingCourses = async () => {
  try {
    const response = await myAxios.get('/getAllLivingCourses', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.allLivingCourses = response.data
    sessionStorage.setItem('allLivingCourses', JSON.stringify(state.allLivingCourses))
    const coursesString = sessionStorage.getItem('allLivingCourses');
    if (coursesString) {
      allLivingCourses.value = JSON.parse(coursesString)
    }
  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const allLivingCourses: any = ref()

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
const goToLiving = async (courseId: number) => {
  await getCourseByCourseId(courseId)
  router.push(`/courseId/${courseId}/livingroom`)
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.upcoming {
  position: absolute;
  top: 140px;
  right: 120px;
  width: 23%;
  background-color: #ffffff;
  border-radius: 15px;

  .card-circle {
    border-radius: 15px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;

    .course_name {
      position: absolute;
      display: inline-block;
      margin-left: 15px;
      width: 60%;
    }
  }
}

.upcoming h2 {
  margin-left: 80px;
}

.pl {
  padding-left: 20px;
}

.course_right {
  width: 350px;
  height: 200px
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  display: flex;
  width: 100%;
  height: 180px;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>