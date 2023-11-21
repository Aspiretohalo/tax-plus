<template>
  <div class="leftCard">
    <h3>教师管理平台</h3>
    <!-- <el-button plain round style="margin-left: 24px;height: 50px;width: 200px;" v-for="item in menuDemo3"
      @click="releaseCourse()">
      <img :src="item.icon" style="width: 28px;height: 28px;">
      <span style="padding-left: 30px;">{{ item.name }}</span>
    </el-button> -->
    <el-menu style="padding-left: 40px;" :router="true" default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose">
      <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo2">
        <img :src="item.icon" style="width: 28px;height: 28px;">
        <span style="padding-left: 30px;">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <el-button type="primary" class="generate" @click="generateReport()">生成分析报告</el-button>
  </div>
  <el-dialog @open="simulateLoading()" v-model="dialogVisible" title="智能分析报告" style="width: 30%;padding: 20px;">
    <div class="course_intendencies" v-if="!loading">
      <span style="font-size: large;">学员密切关注的主题:</span>
      <div class="theme" style="margin-left: 40px;margin-top: 20px;">
        <el-text type="primary" style="display: block; font-size: large;margin-right: 20px;">税收</el-text>
        <el-text type="primary" style="display: block; font-size: large;margin-right: 20px;">个人所得税</el-text>
        <el-text type="primary" style="display: block; font-size: large;margin-right: 20px;">税收制度</el-text>
        <el-text type="primary" style="display: block; font-size: large;margin-right: 20px;">财务</el-text>
        <el-text type="primary" style="display: block; font-size: large;margin-right: 20px;">增值税</el-text>
      </div>
    </div>
    <div style="margin-top: 20px;" v-if="!loading">
      <span style="font-size: large;">课程平均评分:</span>
      <div class="theme" style="margin-left: 40px;margin-top: 20px;">
        <el-text type="primary" style=" font-size: large;margin-right: 20px;">4</el-text>
      </div>
    </div>
    <div style="margin-top: 20px;" v-if="!loading">
      <span style="font-size: large;">评分最高的课程:</span>
      <div class="theme" style="margin-left: 40px;margin-top: 20px;">
        <el-text type="primary" style=" font-size: large;margin-right: 20px;">个人所得税智慧导航</el-text>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

const dialogVisible = ref(false)
// const router = useRouter()
const menuDemo2 = reactive([
  { name: '课程管理', index: 1, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E5%9C%A8%E7%BA%BF%E8%AF%BE%E7%A8%8B.svg', router: '/courseManage' },
  { name: '学习社区', index: 4, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AE%A8%E8%AE%BA%E5%8C%BA.svg', router: '/communityTeacher' },
  { name: '课程发布', index: 2, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E5%8F%91%E5%B8%83.svg', router: '/courseRelease' },
])

// const menuDemo3 = reactive([
//   { name: '课程发布', index: 2, icon: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/icon/%E8%AF%BE%E7%A8%8B%E5%8F%91%E5%B8%83.svg', router: '/courseRelease' },
// ])

const loading = ref(false)
const simulateLoading = () => {
  loading.value = true
  // 用服务生成一个el-loading实例，包括了自定义svg的指令如何在服务中使用
  let demo = ElLoading.service({ target: '.demo', text: '生成中...' })
  setTimeout(() => {
    // 延时执行关闭，对应dom清除，如要再使用loading，需重新生成新实例
    demo.close()
    loading.value = false
  }, 3000)

};
const generateReport = () => {
  dialogVisible.value = true
}

// const releaseCourse = () => {
//   router.push('/courseRelease')
// }
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
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

  .generate {
    position: absolute;
    left: 30px;
    bottom: 150px;
    width: 200px;
    height: 50px;
  }
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