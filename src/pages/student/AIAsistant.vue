<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <iframe src="http://localhost:1002" frameborder="0" width="1150px" height="650px"
            allow="midi;encrypted-media;display-capture;clipboard-write;clipboard-read;"></iframe>
        </el-main>
      </el-container>
    </el-container>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../../components/LeftMenu.vue'
import SpecialIcon from '../../components/SpecialIcon.vue';
import TopNav from '../../components/TopNav.vue'
</script>

<style  scoped>
div {
  display: inline-block;
}

:deep(.el-main) {
  padding: 0;
}
</style>