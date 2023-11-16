<template>
  <div>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main class="main">
          <CourseCard></CourseCard>
        </el-main>
      </el-container>
    </el-container>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'
import LeftMenu from '../../components/LeftMenu.vue'
import CourseCard from '../../components/CourseCard.vue'
import SpecialIcon from '../../components/SpecialIcon.vue';
</script>

<style  scoped>
div {
  display: inline-block;
}

.main {
  padding-top: 0;
}

.tools {
  position: absolute;
  right: 15px;
  top: 80px;
  width: 200px;
  border-radius: 10px;
}

.tool {
  display: inline-block;
  margin: auto 2px;
  cursor: pointer;
  width: 80px;
  text-align: center;
}

.icon {
  display: block;
  margin: 0 auto;
}
</style>