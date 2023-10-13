<template>
  <div class="leftCard">
    <h2 class="mb-2">课程信息</h2>
    <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item v-for="item in courseMenuData" :index="item.router">
        <el-icon class="icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
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
  router.push('/')
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const courseId = ref(route.params.courseId)
const courseMenuData = reactive([
  { name: '课程公告', index: 1, icon: 'User', router: `/courseId/${courseId.value}/notice` },
  { name: '学习进度', index: 2, icon: 'VideoPlay', router: `/courseId/${courseId.value}/progress` },
  { name: '课程视频', index: 3, icon: 'VideoPlay', router: `/courseId/${courseId.value}/courseVideo` },
  { name: '学习资料', index: 4, icon: 'Monitor', router: `/courseId/${courseId.value}/data` },
  { name: '签到', index: 5, icon: 'ChatDotSquare', router: `/courseId/${courseId.value}/sign` },
  { name: '讨论区', index: 6, icon: 'Service', router: `/courseId/${courseId.value}/discussion` },
])
</script>

<style  scoped>
.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  height: 745px;
}
.returnBtn {
  position: absolute;
  bottom: 50px;
  margin-left: 13px;
  width: 180px;
  height: 40px;
}
.el-menu-vertical-demo {
  width: 208px;
}
.el-menu-item span {
  padding-left: 15px;
}
.el-menu-item .icon {
  margin-left: 20px;
}
::v-deep .el-menu {
  /* margin-top: 100px; */
  border-right: 0;
  background-color: #f9f9f9;
}
</style>