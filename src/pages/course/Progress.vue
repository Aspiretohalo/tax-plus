<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>授课教师：cy</h3>
        </div>
      </template>
      <div class="annular">
        <h4>学习进度</h4>
        <el-row class="row-bg" justify="space-evenly">
          <el-col :span="6">
            <div class="progressAnnular">
              <el-progress type="circle" stroke-width="12" :percentage="80">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
              <span class="annularText">课程进度</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="progressAnnular">
              <el-progress type="circle" stroke-width="12" :percentage="66">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
              <span class="annularText">我的进度</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.box-card {
  width: 950px;
}
.row-bg {
  margin-top: 40px;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.progressAnnular {
  display: inline-block;
}
.progressAnnular .annularText {
  display: block;
  text-align: center;
  margin-top: 30px;
}
</style>