<template>
  <div class="leftCard">
    <h2 class="mb-2 msgH2">课程信息</h2>
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
  router.push('/courseManage')
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const courseId = ref(route.params.courseId)
const courseMenuData = reactive([{ name: '创建章节', index: 1, icon: 'User', router: `/courseId/${courseId.value}/createChapters` }])
</script>

<style  scoped>
.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  height: 745px;
}
.msgH2 {
  margin-left: 70px;
}
.returnBtn {
  position: absolute;
  bottom: 50px;
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