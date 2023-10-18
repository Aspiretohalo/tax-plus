<template>
  <div class="leftCard">
    <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo">
        <el-icon class="icon">
          <!-- <SvgIcon :className="item.icon"></SvgIcon> -->
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <el-card class="userMsg box-card">
      <div>
        <el-avatar> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></el-avatar>
        <h4 class="name">小曹</h4>
        <el-tag class="role">学员</el-tag>
        <el-button class="personalMsgBtn" type="primary">查看个人信息</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const menuDemo = reactive([
  { name: '我的学习', index: 1, icon: 'User', router: '/' },
  { name: '直播课', index: 2, icon: 'VideoPlay', router: '/living' },
  { name: '在线课程及回放', index: 2, icon: 'Monitor', router: '/course' },
  { name: '讨论', index: 3, icon: 'ChatDotSquare', router: '/community' },
  { name: 'AI助手', index: 4, icon: 'Service', router: '/asistant' },
])
// const menuDemo2 = reactive([
//   { name: '课程管理', index: 1, icon: 'User', router: '/courseManage' },
//   { name: '课程发布', index: 2, icon: 'VideoPlay', router: '/courseRelease' },
// ])

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  height: 100%;
}
.el-menu-vertical-demo {
  width: 258px;
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
::v-deep .el-menu {
  /* margin-top: 100px; */
  border-right: 0;
  background-color: #f9f9f9;
}
::v-deep .el-card {
  position: absolute;
  bottom: 50px;
  left: 20px;
  width: 160px;
  height: 211px;
  border-radius: 10px;
}

::v-deep .el-avatar {
  background-color: #0089ff;
}
</style>