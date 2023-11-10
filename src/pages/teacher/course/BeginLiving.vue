<template>
    <div>
        <el-card class="box-card welcomeCard">
            <span class="welcome">提示： </span>
            <el-text class="mx-1" type="primary">点击右侧按钮跳转直播间，创建房间后将房间号发布</el-text>
            <el-button type="warning" class="goOnLearning" @click="goToLivingModel()">开始直播</el-button>
        </el-card>
        <el-card class="box-card notice">
            <template #header>
                <div class="card-header">
                    <h3>直播公告</h3>
                </div>
            </template>
            <div class="text item" v-for="item in LivingNotices">
                <h4>{{ item.living_course_name }}</h4>
                <div class="link">
                    前往直播间：<el-link type="warning">{{ item.meeting_id }}</el-link>
                </div>
                <el-text class="mx-1" type="info">
                    {{ item.living_course_description }}
                </el-text>

                <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
            </div>
        </el-card>
    </div>
</template>
  

<script lang="ts" setup>
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

onMounted(async () => {
    await getLivingNotice(courseId.value)
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
        }
    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
const LivingNotices: any = ref()
const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')

const goToLivingModel = () => {
    window.open(`http://localhost:3000?ifStudent=${0}&courseId=${courseId.value}&name=${teacher.value.teacher_name}&course_teacher=${teacher.value.teacher_id}`, '_blank');
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

::v-deep .el-card__body {
    padding-left: 0;
    padding-right: 0;
}
</style>