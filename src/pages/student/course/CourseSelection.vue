<template>
    <div>
        <el-container>
            <el-aside>
                <LeftMenu></LeftMenu>
            </el-aside>
            <el-main>
                <el-scrollbar height="100%">
                    <div>
                    <el-card class="box-card welcomeCard">
                        <div aria-label="A complete example of page header">
                            <el-page-header @back="onBack">
                                <template #breadcrumb>
                                    <el-breadcrumb separator="/">
                                        <el-breadcrumb-item :to="{ path: './course' }">
                                            在线课程及回放
                                        </el-breadcrumb-item>
                                        <el-breadcrumb-item>科目1</el-breadcrumb-item>
                                    </el-breadcrumb>
                                </template>
                                <template #content>
                                    <div class="flex items-center">
                                        <el-avatar class="mr-3" :size="32"
                                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                        <span class="text-large font-600 mr-3"> 李</span>
                                        <el-tag style="margin-left:10px ">学生</el-tag>
                                    </div>
                                </template>

                            </el-page-header>
                        </div>
                        <div style="height: 20px;"></div>
                        <div style="display: flex">
                            <div><img src="src\assets\imgs\TIM图片20200413151955.jpg " class="image_course"></div>
                            <div style="margin-left: 20px;">
                                <h1><el-tag style=" margin-right: 20px">初级课程</el-tag>科目1</h1>
                                <div class="detial">
                                    <el-text class="text_course">
                                        开课时间: 2023-10-10
                                    </el-text>
                                    <el-row>
                                        <el-text class="text_course">
                                            开课老师：曹师傅
                                        </el-text>
                                    </el-row>
                                    <el-text class="text_course" style="color: #95d475;">
                                        现在开课至第3章节
                                    </el-text>
                                </div>
                                <div>
                                    <el-button type="primary" round>
                                        加入课表
                                    </el-button>
                                    <el-button type="primary" round>
                                        立即学习
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
                                程序设计是一门基础课程。对于计算机相关专业而言，程序设计是专业基础知识，是进一步学习其他专业知识的第一步阶梯；对于非计算机专业而言，程序设计的学习有助于理解计算机的能力所在，理解哪些是计算机擅长解决的问题，怎样的方式方法是计算机擅长的手段，从而能更好地利用计算机来解决本专业领域内的问题。

                                C语言是古老而长青的编程语言，它具备了现代程序设计的基础要求，它的语法是很多其他编程语言的基础，在系统程序、嵌入式系统等领域依然是无可替代的编程语言，在各类编程语言排行榜上常年占据前两名的位置。

                                对于非计算机专业的学生，学习本课程的主要目的是掌握程序设计的基本方法，C语言是教学媒介。但是对于计算机专业的学生，本课程是向后续的计算机组成、操作系统、编译原理、体系结构等课程前进的基石，对于C语言本身甚至程序设计语言基础原理的深入理解都是应该掌握的。

                                本课程是零基础的入门课程，完成本课程之后，就能具有初步的运用C语言编写程序的能力。要想完整的学习C语言，还需要进一步学习本课程的后续课程——《C语言程序设计进阶》。

                                程序设计是实践性很强的课程，该课程的学习有其自身的特点，听不会，也看不会，只能练会。你必须通过大量的编程训练，在实践中掌握编程知识，培养编程能力，并逐步理解和掌握程序设计的思想和方法。在这里所提供的，只是基础的知识讲解，要想学会编程，还需要更多时间的投入和努力。

                                为了学习编程，你需要有一台计算机，安装必要的编程软件。无论是MS Windows、Mac OS
                                X还是Linux，都有适合C语言编程的软件。如果搞不定自己电脑上的编程软件，我们也会提供在网页中编写、运行C语言程序的方法。
                            </div>
                        </div>
                        <div style="height: 30px;"></div>

                        <div>
                            <h3 style="display: flex ;align-items: center">
                                <el-icon style="font-size: 24px;color: #409EFF;">
                                    <Notebook />
                                </el-icon>课程大纲
                            </h3>
                            <el-row>
                                第1章：程序设计与C语言
                            </el-row>
                        </div>



                    </el-card>

                </div>


                </el-scrollbar>
                
  
                


            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import LeftMenu from '../../../components/LeftMenu.vue'
import { ElNotification as notify } from 'element-plus'


const onBack = () => {
    //这边写back的跳转链接
    notify('Back')
}

</script>
  
<style  scoped>
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
    padding: 20px;
}

.welcomeCard {
    position: relative;
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

}

.detial {
    width: 500px;
    height: 100px;
    background: #f4f4f5;

}



::v-deep .el-button {
    height: 50px;
    width: 150px;
    margin-top: 30px;
    margin-left: 10px;
    border-radius: 50px;
}</style>