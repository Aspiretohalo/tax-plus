<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main> AI助手 </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../../components/LeftMenu.vue'
import TopNav from '../../components/TopNav.vue'
</script>

<style  scoped>
div {
  display: inline-block;
}
</style>