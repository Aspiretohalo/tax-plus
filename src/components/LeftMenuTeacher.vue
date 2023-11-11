<template>
  <div class="leftCard">
    <h3>教师管理平台</h3>
    <el-button plain round style="margin-left: 44px;height: 50px;" v-for="item in menuDemo3" @click="releaseCourse()">
      <img :src="item.icon" style="width: 28px;height: 28px;">
      <span style="padding-left: 30px;">{{ item.name }}</span>
    </el-button>
    <el-menu style="padding-left: 40px;" :router="true" default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo2">
        <img :src="item.icon" style="width: 28px;height: 28px;">
        <span style="padding-left: 30px;">{{ item.name }}</span>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuDemo2 = reactive([
  { name: '课程管理', index: 1, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E5%9C%A8%E7%BA%BF%E8%AF%BE%E7%A8%8B.svg', router: '/courseManage' },
  { name: '学习社区', index: 4, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AE%A8%E8%AE%BA%E5%8C%BA.svg', router: '/communityTeacher' },
  // { name: '课程发布', index: 2, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E5%8F%91%E5%B8%83.svg', router: '/courseRelease' },
])

const menuDemo3 = reactive([
  { name: '课程发布', index: 2, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E5%8F%91%E5%B8%83.svg', router: '/courseRelease' },
])

const releaseCourse = () => {
  router.push('/courseRelease')
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style scoped>
h3 {
  margin-left: 60px;
}

.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  width: 17%;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 5px;
}

.el-menu-vertical-demo {
  /* width: 258px; */
  width: 100%;
}

.el-menu-item span {
  padding-left: 15px;
}

.el-menu-item .icon {
  margin-left: 20px;
}

.leftCard .userMsg {
  width: 180px;
  margin-left: 20px;
}

.name {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.role {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.personalMsgBtn {
  width: 120px;
}

:deep(.el-menu) {
  /* margin-top: 100px; */
  border-right: 0;
  background-color: #f9f9f9;
}

:deep(.el-card) {
  position: absolute;
  bottom: 50px;
  left: 20px;
  width: 160px;
  height: 211px;
  border-radius: 10px;
}

:deep(.el-avatar) {
  background-color: #0089ff;
}
</style>