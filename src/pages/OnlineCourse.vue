<template>
  <div>
    <el-container>
      <el-aside>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main class="main">
        <CourseCard></CourseCard>
        <UpcomingCourses></UpcomingCourses>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../components/LeftMenu.vue'
import CourseCard from '../components/CourseCard.vue'
import UpcomingCourses from '../components/UpcomingCourses.vue'
</script>

<style  scoped>
div {
  display: inline-block;
}
.main {
  padding-top: 0;
}
</style>