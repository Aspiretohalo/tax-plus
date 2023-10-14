<template>
  <div>
    <el-card class="box-card welcomeCard">
      <span class="welcome">上次学习到： </span>
      <el-text class="mx-1" type="primary">课程一/视频小标题</el-text>
      <el-button type="warning" class="goOnLearning">继续学习</el-button>
    </el-card>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>公告</h3>
        </div>
      </template>
      <div class="text item">
        <h4>课程结束通知</h4>
        <el-text class="mx-1" type="info">
          最后一次课通知： 1.考试作品平台和钉钉群文件夹截止时间：今晚8点截止 2.明晚之前完成平台所有视频学习，发帖和完善笔记内容，记得给老师进行评价哈
          3.非常感谢这段时间以来大家的配合和支持。愿大家学有所成！
        </el-text>
        <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
      </div>
      <div class="text item">
        <h4>课程开课通知</h4>
        <el-text class="mx-1" type="info">
          最后一次课通知： 1.考试作品平台和钉钉群文件夹截止时间：今晚8点截止 2.明晚之前完成平台所有视频学习，发帖和完善笔记内容，记得给老师进行评价哈
          3.非常感谢这段时间以来大家的配合和支持。愿大家学有所成！
        </el-text>
        <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
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
  margin-top: 0;
}
.box-card {
  width: 950px;
}
.welcomeCard {
  position: relative;
}
.welcome {
  margin-left: 50px;
}

.goOnLearning {
  position: absolute;
  right: 50px;
  top: 15px;
}
.notice {
  margin-top: 10px;
}
.text {
  border-bottom: 1px solid #e3e3e3;
  padding: 0 50px;
}
.item {
  margin-bottom: 18px;
}
.releaseTime {
  display: block;
  text-align: right;
  margin-top: 10px;
  margin-bottom: 20px;
}
::v-deep .el-card__body {
  padding-left: 0;
  padding-right: 0;
}
</style>