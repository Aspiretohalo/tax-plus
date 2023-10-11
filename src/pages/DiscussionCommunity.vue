<template>
  <div>
    <el-container>
      <el-aside>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main> 讨论社区 </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../components/LeftMenu.vue'
</script>

<style  scoped>
div {
  display: inline-block;
}
::v-deep .el-aside {
  width: 208px;
}
</style>