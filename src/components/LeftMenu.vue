<template>
  <div class="leftCard">
    <h3>学员学习平台</h3>
    <el-menu style="padding-left: 40px;" :router="true" default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo">
        <img :src="item.icon" style="width: 28px;height: 28px;">
        <span style="padding-left: 30px;">{{ item.name }}</span>
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
  { name: '我的学习', index: 1, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E6%88%91%E7%9A%84%E5%AD%A6%E4%B9%A0.svg', router: '/myLearning' },
  // { name: '直播课', index: 2, icon: 'VideoPlay', router: '/living' },
  { name: '在线课程', index: 3, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E5%9C%A8%E7%BA%BF%E8%AF%BE%E7%A8%8B.svg', router: '/course' },
  { name: '学习社区', index: 4, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AE%A8%E8%AE%BA%E5%8C%BA.svg', router: '/community' },
  { name: '智能助手', index: 5, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E6%99%BA%E8%83%BD%E5%8A%A9%E6%89%8B.svg', router: '/asistant' },
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