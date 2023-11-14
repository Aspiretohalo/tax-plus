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
                                    <el-button type="primary" round>
                                        进入课表
                                    </el-button>
                                    <el-button type="primary" round @click="goToMyLearning()">
                                        立即学习
                                    </el-button>
                                </div>
                            </div>
                            <div style="margin-left: 110px;width: 600px;">
                                <el-carousel indicator-position="outside" class="lunbo">
                                    <el-carousel-item v-for="item in 4" :key="item" class="lunbo_page">
                                        <img src="src\assets\imgs\login_bg.png">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                        <div>
                            <h3 style="display: flex ;align-items: center">
                                <el-icon style="font-size: 24px;color: #409EFF;">
                                    <Notebook />
                                </el-icon>智能推荐
                            </h3>
                            <div style="display: inline-block;" v-for="o in 5" :key="o">
                                <el-card class="box-card recommendCard" shadow="never">
                                    <img src="../assets/imgs/首页banner-餐饮.jpg" alt="" style="width: 100%; cursor: pointer;">
                                </el-card>
                                <div class="courseMsg">
                                    <span style="font-size: large;">静安寺的教案设计</span>
                                    <span>
                                    </span>
                                    <div style="margin-top: 10px; color: #b1b3b8;font-size: 14px;"> 小黄
                                        <span class="time" style="font-size: small; float: right;"> 2023/11/8 </span>
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
                                            <a class="livinga" role="none" v-for="o in 4 " :key="o">
                                                <p class="livingp">未开始</p>
                                                <div>
                                                    <img class="livingimg"
                                                        src="https://mooc-image.nosdn.127.net/d47a3dcdc08245e387d1d416fd6ececa.jpg?imageView&quality=100&thumbnail=227y227">
                                                    <p class="livingp2">科目1</p>
                                                    <p class="livingp3">曹师傅 <span class="livingspan">今天8：00</span></p>
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
    </div>
</template>

<script lang="ts" setup>
import TopNav from '../components/TopNav.vue'
import { useRouter } from "vue-router";
const router = useRouter();

const goToMyLearning = () => {
    router.push('/myLearning')
}


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
    background: rgb(202, 207, 191);
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
    color: rgba(153, 153, 153, 1);
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



:deep(.el-button) {
    height: 50px;
    width: 150px;
    margin-top: 30px;
    margin-left: 10px;
    border-radius: 50px;
}
</style>