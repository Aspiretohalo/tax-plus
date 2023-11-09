<template>
  <div class="upcoming">
    <h2 class="pl">直播课即将开始</h2>
    <el-row v-for="(o, index) in 4" :key="o" :span="8" :offset="index > 0 ? 1 : 0">
      <el-col style="margin-top: 5px;">
        <el-card :body-style="{ padding: '0px' }" class="card-circle">
          <div style="padding: 14px">
            <span> <el-avatar :size="50"
                src="https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/12aa700f-8cad-43b4-8f9b-827d1f13b997.jpg " />
            </span>
            <p class="course_name">科爱克发卡就卡放大放假阿卡卡的积分卡的发达1</p>
            <div style="font-size: small; margin-top: 5px;">
              教师：<span style="color: #73767a;">九块九阿昆达</span>
              <span class="time" style="float: right;">{{ livingTime }}</span>
            </div>
            <div class="bottom">
              <span style="font-size: small;">归属课程：<span
                  style="color: #73767a;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">爱神的箭阿萨德就</span></span>
              <el-button text class="button" type="primary">前往</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const livingTime = ref("11-8 12:30")
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.upcoming {
  position: absolute;
  top: 140px;
  right: 120px;
  width: 23%;
  background-color: #ffffff;
  border-radius: 15px;

  .card-circle {
    border-radius: 15px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;

    .course_name {
      position: absolute;
      display: inline-block;
      margin-left: 15px;
      width: 60%;
    }
  }
}

.upcoming h2 {
  margin-left: 80px;
}

.pl {
  padding-left: 20px;
}

.course_right {
  width: 350px;
  height: 200px
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  display: flex;
  width: 100%;
  height: 180px;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>