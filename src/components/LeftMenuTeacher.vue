<template>
  <div class="leftCard">
    <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo2">
        <el-icon class="icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <el-icon style="margin-left: 20px;">
            <Operation />
          </el-icon>
          <span style="padding-left: 15px;">更多</span>
        </template>
        <el-menu-item index="1-1"><span>关于平台</span></el-menu-item>
        <el-menu-item index="1-2">
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
            title="你确定退出吗?" @confirm="confirmEvent" @cancel="cancelEvent">
            <template #reference>
              <span>退出登录</span>
            </template>
          </el-popconfirm>

        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-card class="userMsg box-card">
      <div>
        <el-avatar> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></el-avatar>
        <h4 class="name">{{ teacher.teacher_name }}</h4>
        <el-tag class="role">老师</el-tag>
        <el-button @click="checkMsg()" class="personalMsgBtn" type="primary">查看个人信息</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
const menuDemo2 = reactive([
  { name: '课程管理', index: 1, icon: 'User', router: '/courseManage' },
  { name: '课程发布', index: 2, icon: 'VideoPlay', router: '/courseRelease' },
  { name: '直播课', index: 3, icon: 'VideoCamera', router: '/courseRelease' },
  { name: '讨论', index: 4, icon: 'ChatDotSquare', router: '/CommunityTeacher' },

])
const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')

const confirmEvent = () => {
  // console.log('confirm!')
  localStorage.clear()
  sessionStorage.clear()
  router.push('/loginStudent')
}
const cancelEvent = () => {
  console.log('cancel!')
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const checkMsg = () => {
  router.push('/teacherMsg')
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