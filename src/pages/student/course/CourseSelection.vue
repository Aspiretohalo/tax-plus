<template>
    <div>
        <el-container>
            <el-main>
                <div>
                    <el-card class="box-card welcomeCard" shadow="never">
                        <el-page-header @back="onBack()">
                            <div style="height: 20px;"></div>
                        </el-page-header>
                        <div style="display: flex">
                            <div><img :src="singleCourse[0]?.course_url" class="image_course"></div>
                            <div class="course_message" style="margin-left: 20px;">
                                <h1>{{ singleCourse[0]?.course_name }}</h1>
                                <div class="detail">
                                    <el-row>
                                        <el-text class="text_course">
                                            开课老师：{{ singleCourse[0]?.teacher_name }}
                                        </el-text>
                                    </el-row>
                                    <el-text class="text_course" style="color: #95d475;">
                                        现在开课至第{{ singleCourse[0]?.chapter_count }}章节
                                    </el-text>
                                </div>
                                <div>
                                    <el-button type="primary" v-if="!hasSelected" round @click="handleSelectCourse()">
                                        加入学习
                                    </el-button>
                                    <el-button type="primary" v-else round @click="continueToLearn()">
                                        已选课，继续学习
                                    </el-button>
                                </div>

                            </div>
                        </div>
                        <div style="height: 50px;"></div>
                        <div>
                            <h3 style="display: flex ;align-items: center">
                                <el-icon style="font-size: 24px;color: #409EFF;">
                                    <Grid />
                                </el-icon>课程介绍
                            </h3>
                            <div>
                                <p>{{ singleCourse[0]?.course_description }}</p>
                            </div>
                        </div>
                        <div style="height: 30px;"></div>
                    </el-card>
                </div>
            </el-main>
        </el-container>
        <SpecialIcon></SpecialIcon>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import myAxios from '../../../plugins/myAxios';
import state from '../../../store/state'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()

const courseId = ref(route.params.courseId)
const router = useRouter()

onMounted(async () => {
    await JudgeSelected()
    onUnmounted(() => {
        sessionStorage.removeItem('courseProgress')
    })
})
const onBack = () => {
    router.back()
}
const continueToLearn = () => {
    router.push(`/courseId/${courseId.value}/notice`)
}
import { ElMessage } from 'element-plus'
import SpecialIcon from '../../../components/SpecialIcon.vue';

const handleSelectCourse = async () => {
    try {
        let obj = {
            course_id: courseId.value,
            student_id: student.value.student_id
        }
        console.log(obj);
        const response = await myAxios.post('/selectTheCourse', JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // 处理响应数据
        console.log(response.data);
        ElMessage({
            message: '选课成功！',
            type: 'success',
        })
        router.push(`/courseId/${courseId.value}/notice`)
    } catch (error) {
        console.error('获取信息失败', error);
    }
}
const singleCourse: any = ref(JSON.parse(sessionStorage.getItem('singleCourse') || 'null') || '')
const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')

const JudgeSelected = async () => {
    try {
        const response = await myAxios.get('/judgeSelected', {
            params: {
                course_id: courseId.value,
                student_id: student.value.student_id
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        });
        // 处理响应数据
        state.courseProgress = response.data
        sessionStorage.setItem('courseProgress', JSON.stringify(state.courseProgress))
        const coursesString = sessionStorage.getItem('courseProgress');
        if (coursesString) {
            courseProgress.value = JSON.parse(coursesString)
            // console.log(courseProgress.value.length);
            if (courseProgress.value.length == 1)
                hasSelected.value = true
        }
    } catch (error) {
        console.error('获取信息失败', error);
    }
};
const courseProgress: any = ref()
const hasSelected = ref(false)
</script>
  
<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
}

:deep(.el-main) {
    width: 100vw;
}

.box-card {
    width: 1200px;
    padding: 20px;
    margin: 0 auto;

    .image_course {
        width: 600px;
        height: 350px;
    }

    .course_message {
        width: 600px;
    }

    .text_course {
        margin: 10px;
        font-size: medium;
    }
}

.welcomeCard {
    position: relative;
}

.detail {
    width: 500px;
    height: 80px;
    background: #f4f4f5;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
}

:deep(.el-button) {
    height: 50px;
    width: 150px;
    margin-top: 30px;
    margin-left: 10px;
    border-radius: 50px;
}
</style>