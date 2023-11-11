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
                                <el-tag style=" margin-right: 20px;margin-bottom: 20px;">初级课程</el-tag>
                                <div class="detail">
                                    <el-text class="text_course">
                                        开课时间: 2023-10-10
                                    </el-text>
                                    <el-row>
                                        <el-text class="text_course">
                                            开课老师：{{ singleCourse[0]?.teacher_name }}
                                        </el-text>
                                    </el-row>
                                    <el-text class="text_course" style="color: #95d475;">
                                        现在开课至第3章节
                                    </el-text>
                                </div>
                                <div>
                                    <!-- <el-button v-if="singleCourse[0].status === '已结束'" type="primary" round disabled>
                                        课程已结束
                                    </el-button> -->
                                    <el-button v-if="singleCourse[0].status === '已结束' || singleCourse[0].status === '进行中'"
                                        type="primary" round>
                                        加入学习
                                    </el-button>
                                    <el-button v-else-if="singleCourse[0].status === '即将开始'" type="primary" round disabled>
                                        暂未开放
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
                                <p>{{ singleCourse[0].course_description }}</p>
                            </div>
                        </div>
                        <div style="height: 30px;"></div>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()

const onBack = () => {
    router.back()
}
const singleCourse: any = ref(JSON.parse(sessionStorage.getItem('singleCourse') || 'null') || '')



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
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 10px;
        font-size: medium;
    }
}

.welcomeCard {
    position: relative;
}

.detail {
    width: 500px;
    height: 100px;
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