<template>
  <div class="upcoming">
    <h2 class="pl">直播课即将开始</h2>
    <el-scrollbar height="100%">
      <el-row v-for="(o, index) in 4" :key="o" :span="8" :offset="index > 0 ? 1 : 0">
      <el-col style="margin-top: 5px;">
        <el-card :body-style="{ padding: '0px' }" class="card-circle">
          <div>
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
          </div>
          
          <div style="padding: 14px">
            <span>科目1<el-tag>曹师傅</el-tag></span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button text class="button" type="primary">前往</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <div style="height: 80px;"></div>
    </el-row>


    </el-scrollbar>

    


  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<style  scoped>
.upcoming {
  /* position: absolute; */
  position: fixed;
  top: 0;
  right: 0px;
  width: 370px;
  height: 100%;
  min-height: 745px;
  background-color: #ffffff;
}

.upcoming h2 {
  /* margin: 20px auto; */
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
  margin-top: 13px;
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
  height: 200px;
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

.card-circle{
  border-radius: 30px;
  border-color: #409EFF;
}
</style>