<template>
  <div>
    <router-view></router-view>
    <!-- <SpecialIcon></SpecialIcon> -->
  </div>
</template>

<script setup lang="ts">
// import SpecialIcon from './components/SpecialIcon.vue'
// const token = ref(localStorage.getItem('token'))

// import { ElNotification } from "element-plus";

// setTimeout(() => {
//   ElNotification({
//     title: '上课通知',
//     message: '课程：《地方税收管理与实践》还有五分钟就要上课啦',
//     duration: 0,
//     offset: 80,
//     customClass: 'myColor'
//   })
// }, 10000)
</script>

<style>
.myColor {
  background-color: #e1f3d8 !important
}
</style>
<style scoped>
:deep(.el-aside) {
  width: 258px;
}

:deep(.el-header) {
  padding: 0;
  height: 70px;
}
</style>
