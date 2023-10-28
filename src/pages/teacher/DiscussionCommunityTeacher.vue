<template>
    <div>
      <el-container>
        <el-aside>
          <LeftMenuTeacher></LeftMenuTeacher>
        </el-aside>
        <el-main> 讨论社区 </el-main>
      </el-container>
    </div>
  </template>
  
  <script lang="ts" setup>
  import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
  </script>
  
  <style  scoped>
  div {
    display: inline-block;
  }
  </style>