<template>
  <div>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <CourseMenu></CourseMenu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import CourseMenu from '../../components/CourseMenu.vue'
import TopNav from '../../components/TopNav.vue'
</script>

<style  scoped>
:deep(.el-aside) {
  width: 258px;
}
</style>