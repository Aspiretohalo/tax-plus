<template>
    <div>
        <el-card class="box-card welcomeCard">
            <span class="welcome">提示： </span>
            <el-text class="mx-1" type="primary">点击右侧按钮跳转直播间，创建房间后将房间号发布</el-text>
            <el-button type="warning" class="goOnLearning" @click="goToLivingModel()">前往直播间</el-button>
        </el-card>
        <el-card class="box-card notice">
            <template #header>
                <div class="card-header">
                    <h3>发布直播公告</h3>
                </div>
            </template>
            <el-form :model="form" label-width="120px">
                <el-form-item label="房间名">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="直播简述">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>


        </el-card>
    </div>
</template>
  

<script lang="ts" setup>
import { reactive } from 'vue'
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseId = ref(route.params.courseId)

onMounted(async () => {
    await getNotice(courseId.value)
})

// do not use same name with ref
const form = reactive({
    name: '',

    desc: '',
})

const onSubmit = () => {
    console.log('submit!')
}

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

const goToLivingModel = () => {
    router.push(`/courseId/${courseId.value}/livingModelTeacher`)
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
    width: 950px;
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