<template>
  <div class="leftCard">
    <h3>学员学习平台</h3>
    <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo">
        <el-icon class="icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// import { useRouter } from 'vue-router'
// import { InfoFilled } from '@element-plus/icons-vue'

// const confirmEvent = () => {
//   // console.log('confirm!')
//   localStorage.clear()
//   sessionStorage.clear()
//   router.push('/loginStudent')
// }
// const cancelEvent = () => {
//   console.log('cancel!')
// }

// const router = useRouter()

const menuDemo = reactive([
  { name: '我的学习', index: 1, icon: 'User', router: '/myLearning' },
  // { name: '直播课', index: 2, icon: 'VideoPlay', router: '/living' },
  { name: '在线课程及回放', index: 3, icon: 'Monitor', router: '/course' },
  { name: '讨论', index: 4, icon: 'ChatDotSquare', router: '/community' },
  { name: 'AI助手', index: 5, icon: 'Service', router: '/asistant' },
])


// const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')
// const logout = () => {

// }
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// const checkMsg = () => {
//   router.push('/studentMsg')
// }
</script>

<style scoped>
h3 {
  margin-left: 60px;
}

.leftCard {
  position: fixed;
  background-color: #f9f9f9;
  height: 100%;
  /* width: 17%; */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 5px;
}

.el-menu-vertical-demo {
  width: 258px;
  /* width: 100%; */
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
  /* padding-top: 30px; */
  margin-top: 30px;
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