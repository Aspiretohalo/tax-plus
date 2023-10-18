<template>
  <div>
    <el-container>
      <el-aside>
        <CourseMenuTeacher></CourseMenuTeacher>
      </el-aside>
      <el-main class="main">
        courseRelease
        <!-- <router-view></router-view> -->
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import CourseMenuTeacher from '../../components/LeftMenuTeacher.vue'
</script>

<style  scoped>
::v-deep .el-aside {
  width: 258px;
}
</style>