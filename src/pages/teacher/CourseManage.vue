<template>
  <div>
    <el-container>
      <el-aside>
        <CourseMenu></CourseMenu>
      </el-aside>
      <el-main class="main">
        courseManage
        <!-- <router-view></router-view> -->
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import CourseMenu from '../../components/CourseMenu.vue'
</script>

<style  scoped>
::v-deep .el-aside {
  width: 258px;
}
</style>