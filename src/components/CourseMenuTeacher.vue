<template>
  <div class="leftCard">
    <h2 class="mb-2 msgH2">课程信息</h2>
    <el-menu style="padding-left: 40px;" :router="true" default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose">
      <el-menu-item v-for="item in courseMenuData" :index="item.router">
        <img :src="item.icon" alt="" style="width: 28px;height: 28px;">

        <span style="padding-left: 30px;">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <el-button @click="goBack()" class="returnBtn" type="primary">返回主页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const goBack = () => {
  router.push('/courseManage')
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const courseId = ref(route.params.courseId)
const courseMenuData = reactive([
  { name: '管理公告', index: 1, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E5%85%AC%E5%91%8A.svg', router: `/courseId/${courseId.value}/manageNotice` },
  { name: '发起直播', index: 2, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E5%9C%A8%E7%BA%BF%E8%AF%BE%E7%A8%8B.svg', router: `/courseId/${courseId.value}/beginLiving` },
  { name: '管理章节', index: 3, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E7%AB%A0%E8%8A%82.svg', router: `/courseId/${courseId.value}/createChapters` },
  { name: '管理资料', index: 4, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99.svg', router: `/courseId/${courseId.value}/manageCourseData` },
  { name: '查看评价', index: 5, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E8%AF%84%E4%BB%B7.svg', router: `/courseId/${courseId.value}/viewEvaluations` },
])
</script>

<style  scoped>
.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 5px;
}

.msgH2 {
  margin-left: 70px;
}

.returnBtn {
  position: absolute;
  bottom: 100px;
  margin-left: 32px;
  width: 180px;
  height: 40px;
}

.el-menu-vertical-demo {
  width: 258px;
}

.el-menu-item span {
  padding-left: 15px;
}

.el-menu-item .icon {
  margin-left: 40px;
}

::v-deep .el-menu {
  /* margin-top: 100px; */
  border-right: 0;
  background-color: #f9f9f9;
}
</style>