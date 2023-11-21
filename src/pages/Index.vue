<template>
    <div>
        <el-container>
            <el-header>
                <TopNav></TopNav>
            </el-header>
            <el-container>
                <el-main>
                    <el-card class="box-card welcomeCard" shadow="never">
                        <div style="display: flex">
                            <div>
                                <h1 style="font-size: 45px;">欢迎来到税学佳学习平台</h1>
                                <div class="detial">
                                    <el-text class="text_course">
                                        这里有一线的教师课程资源
                                    </el-text>
                                    <el-row>
                                        <el-text class="text_course">
                                            充实自己，提升自己
                                        </el-text>
                                    </el-row>
                                    <el-text class="text_course">
                                        税学佳平台将督促和鼓励你的税务学习
                                    </el-text>
                                </div>
                                <div>
                                    <el-button type="primary"
                                        style="height: 50px; width: 150px;margin-top: 30px; margin-left: 10px; border-radius: 50px;"
                                        round @click="goToMyLearning()">
                                        立即学习
                                    </el-button>
                                </div>
                            </div>
                            <div style="margin-left: 110px;width: 600px;">
                                <el-carousel indicator-position="outside" class="lunbo">
                                    <el-carousel-item v-for="item in carouselImg" :key="item" class="lunbo_page">
                                        <img :src="item.img" style="height: 350px;width: 550px;">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                        <div style="margin-top: 100px;">
                            <h3 style="display: flex ;align-items: center">
                                <el-icon style="font-size: 24px;color: #409EFF;">
                                    <Notebook />
                                </el-icon>智能推荐<span
                                    style="font-size: 16px; font-weight: normal;margin-left: 20px;color: #E6A23C;">平台根据您的课程偏好，为您定制化推荐以下课程</span>
                            </h3>
                            <div style="display: inline-block;" v-for="item in RecommendedCourse" :key="item.course_id">
                                <el-card class="box-card recommendCard" shadow="never">
                                    <img :src="item.course_url" alt="" @click="goToTheCourse(item.course_id)"
                                        style="width: 220px;height: 150px; cursor: pointer;">
                                </el-card>
                                <div class="courseMsg">
                                    <el-text style="font-size: large;" truncated>{{ item.course_name }}</el-text>

                                    <div style="margin-top: 10px; color: #73767a;font-size: 14px;"> {{ item.teacher_name }}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div style="margin-top: 50px;">
                            <h3 style="display: flex ;align-items: center">
                                <el-icon style="font-size: 24px;color: #409EFF;">
                                    <Grid />
                                </el-icon>最近直播
                            </h3>
                            <div>
                                <div class="livingcard">
                                    <div class="livingsize">
                                        <ul class="livingul" style=" height: 260px;">
                                            <a class="livinga" @click="goToTheLivingCourse(item.course_id)" role="none"
                                                v-for="item in allLivingCourses" :key="item.living_course_id">
                                                <p class="livingp">未开始</p>
                                                <div>
                                                    <img class="livingimg" :src="item.avatar">
                                                    <el-text class="livingp2" style="font-size: 17px;" truncated>{{
                                                        item.living_course_name
                                                    }}</el-text>
                                                    <p class="livingp3" style="font-size: 13px;">{{ item.teacher_name }}
                                                        <span class="livingspan">
                                                            {{ item.start_time }}</span>
                                                    </p>
                                                </div>
                                            </a>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </el-card>
                </el-main>
            </el-container>
        </el-container>
        <SpecialIcon></SpecialIcon>
    </div>
</template>

<script lang="ts" setup>
import SpecialIcon from '../components/SpecialIcon.vue';
import TopNav from '../components/TopNav.vue'
import { ref, onMounted } from 'vue'
import myAxios from '../plugins/myAxios'
import moment from 'moment'
import state from '../store/state'
import { useRouter } from "vue-router";
const router = useRouter();

const student: any = ref(JSON.parse(sessionStorage.getItem("students") || "null") || "");

const carouselImg = ref([
    { img: 'https://img1.baidu.com/it/u=567729574,2492561565&fm=253&fmt=auto&app=138&f=JPEG?w=676&h=500' },
    { img: 'https://img1.baidu.com/it/u=4118407280,1876108124&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400' },
    { img: 'https://www.tax4a.com/upload/editor/image/2022/01/10/6377740938916553091310979.jpg' },
    { img: 'https://img2.baidu.com/it/u=3086357251,2639553427&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=455' },
])
onMounted(async () => {
    console.log(student.value);
    await getRecommendedCourse(student.value.student_id)
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
            allLivingCourses.value.forEach((item: any) => {
                item.start_time = moment(item.start_time).format('YYYY/MM/DD HH:mm')
            });
        }
    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
const allLivingCourses: any = ref()
const goToMyLearning = () => {
    router.push('/myLearning')
}
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
const goToTheLivingCourse = async (courseId: number) => {
    await getCourseByCourseId(courseId)
    router.push(`/courseId/${courseId}/livingroom`)
}
const goToTheCourse = async (courseId: number) => {
    await getCourseByCourseId(courseId)
    router.push(`/courseJoin/courseId/${courseId}/courseSelection`)
}
const RecommendedCourse: any = ref()

const getRecommendedCourse = async (value: number) => {
    try {
        const response = await myAxios.get('/getRecommendedCourse', {
            params: {
                student_id: value
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        });
        // 处理响应数据
        state.RecommendedCourse = response.data
        sessionStorage.setItem('RecommendedCourse', JSON.stringify(state.RecommendedCourse))
        const coursesString = sessionStorage.getItem('RecommendedCourse');
        if (coursesString) {
            RecommendedCourse.value = JSON.parse(coursesString)
        }

    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
</script>

<style lang="scss" scoped>
body {
    margin-top: 100px;
}

h1,
h2,
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

    .recommendCard {
        display: inline-block;
        margin-left: 10px;
        border-radius: 15px;
        width: 220px;
        padding: 0;
        height: 150px;

        :deep(.el-card__body) {
            padding: 0;
        }
    }

    .courseMsg {
        margin-left: 10px;
    }
}



.livingcard {
    position: relative;
}

.livingsize {
    overflow: hidden;
}

.livingul {
    position: relative;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    overflow: hidden;
    -webkit-transition: left 0.3s ease-in;
    transition: left 0.3s ease-in;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: auto;
    margin: 0;
    padding: 0;
}

.livinga {
    width: 270px;
    height: 106px;
    background: rgb(221, 219, 219);
    border-radius: 8px;
    position: relative;
    padding: 26px 16px 0 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 12px;
    margin-right: 20px;
    -webkit-transition: all ease-in 0.25s;
    transition: all ease-in 0.25s;
    float: left;
}

.livingimg {
    width: 52px;
    height: 52px;
    float: left;
    margin-right: 12px;
    border-radius: 100%;
    border: 1px solid rgb(0, 0, 0, 0.06);
}

.livingp {
    position: absolute;
    margin-top: 0;
    left: 0;
    top: 0;
    width: 56px;
    height: 18px;
    border-radius: 8px 0 30px 0;
    font-size: 12px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 8px;
    background: rgba(175, 192, 204, 1);
}

.livingp2 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 5px 0;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;


}

.livingp3 {
    font-size: 12px;
    color: #73767a;
}

.livingp3 .livingspan {
    margin-left: 12px;
}

.commonCourseCardItem {
    cursor: pointer;
    float: left;
    margin: 0 20px 20px 0;
    border-radius: 8px;
    -webkit-transition: all ease-in 0.2s;
    transition: all ease-in 0.2s;
    line-height: 0;
}

._3KiL7.I5s2Q {
    height: 297px;
}

._3KiL7 ._3hfsT {
    max-width: 224px;
    max-height: 126px;
    overflow: hidden;
    position: relative;
}

.WFpCn {
    height: 167px;
    position: relative;
    padding: 10px 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 126px;
    border-radius: 0 0 8px 8px;
}

.lunbo_page h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.lunbo_page:nth-child(2n) {
    background-color: #99a9bf;
}

.lunbo_page:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.image_course {
    width: 400px;
    height: 250px;
}

.text_course {
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 10px;
    font-size: medium;
    color: gray;

}

.detial {
    width: 500px;
    height: 100px;

}


:deep(.el-carousel__container) {
    height: 350px;
}
</style>