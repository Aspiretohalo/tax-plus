<template>
  <div class="upcoming">
    <h2 class="pl">直播课即将开始</h2>
    <el-card class="box-card">
      <!-- <template #header>
        <div class="card-header">
          <span>税务的第一课</span>
        </div>
      </template> -->
    </el-card>
    <h3 class="course_title pl">tax-plus开发第一课</h3>
    <div class="pl">SaaS税务在线培训系统的开发流程，采用Vue3+ElementPlus开发</div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style  scoped>
.upcoming {
  position: absolute;
  right: 0px;
  width: 470px;
  height: 100%;
  min-height: 745px;
  background-color: #ffffff;
}
.upcoming h2 {
  /* margin: 20px auto; */
  margin-left: 145px;
}
.pl {
  padding-left: 20px;
}
.course_title {
  font-size: 26px;
}
::v-deep .el-card {
  width: 420px;
  height: 300px;
  margin-left: 20px;
  border-radius: 10px;
}
::v-deep .el-card__body {
  padding: 0;
}
</style>