<template>
  <div>
    <el-card class="box-card notice" shadow="never">
      <template #header>
        <div class="card-header">
          <h3>课程视频</h3>
        </div>
      </template>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="item in chapterData" :title="item.video_title" :name="item.chapter_index">
            <div style="padding-bottom: 10px">
              <router-link :to="`/courseId/${courseId}/detail/${chapter_index}`">
                <el-link :underline="false">
                  <template #default> <el-tag class="ml-2" type="success">视频</el-tag>{{ item.video_title }} </template>
                </el-link>
              </router-link>
            </div>
            <div>
              <el-link :underline="false"> <el-tag class="ml-2" type="info">课件</el-tag>{{ }}课件</el-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { useRoute } from 'vue-router'
import SpecialIcon from '../../../components/SpecialIcon.vue';

const route = useRoute()
const courseId = ref(route.params.courseId)
// const chapter_index = ref()

const activeNames = ref()
const chapter_index = ref()
const handleChange = () => {
  chapter_index.value = activeNames.value[0]
}
onMounted(async () => {
  await getChapter(courseId.value)
})
////////////////////获得章节
const getChapter = async (value: any) => {
  try {
    const response = await myAxios.get('/course/getChapter', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.chapter = response.data
    sessionStorage.setItem('chapter', JSON.stringify(state.chapter))
    const coursesString = sessionStorage.getItem('chapter');
    if (coursesString) {
      chapterData.value = JSON.parse(coursesString)
    }
  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const chapterData: any = ref()

</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.box-card {
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;

  :deep(.el-collapse-item__header) {
    font-size: 16px;
  }

  :deep(.el-card__body) {
    padding-left: 50px;
  }
}

.row-bg {
  margin-top: 40px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.progressAnnular {
  display: inline-block;
}

.progressAnnular .annularText {
  display: block;
  text-align: center;
  margin-top: 30px;
}
</style>