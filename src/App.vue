<template>
  <div>
    <router-view></router-view>
    <!-- <SpecialIcon></SpecialIcon> -->
  </div>
</template>

<script setup lang="ts">
// import SpecialIcon from './components/SpecialIcon.vue'
// const token = ref(localStorage.getItem('token'))
</script>

<style scoped>
:deep(.el-aside) {
  width: 258px;
}

:deep(.el-header) {
  padding: 0;
  height: 70px;
}
</style>
