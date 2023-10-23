<template>
  <div>
    <el-container>
      <el-aside>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <div class="ke-cover">
        <div class="ke-coverimg">
          <img src="src\assets\imgs\bgexample.jpg" alt="zhibo-cover" style="width: 100%; height: 100%;">
          <div class="ke-coverword">
            <div class="Prompt">直播即将开始</div>
            <div class="Prompt">10月23日 18：00-20：00</div>
            <div class="Prompt">直播间房号（复制以下房间号）</div>
            <div class="Prompt">xxx-xxxxxx</div>
            <el-button class="cover-btn">进入直播间</el-button>
          </div>
        </div>
      </div>
      </el-main>
      
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../../components/LeftMenu.vue'
</script>

<style  scoped>


.ke-cover {
  width: 1080px;
  height: 620px;
  position: absolute;
  z-index: 10;
  
}

.ke-coverimg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
}

.ke-coverword {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
}

.Prompt {
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #fff;
  overflow: hidden;
  text-shadow: 0 1px 3px rgba(0, 0, 0, .25);
}

.cover-btn {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  width: auto;
  padding: 12px 32px;
  color: #fff;
  cursor: pointer;
  background-color: #2080f7;
  border: 0;
  border-radius: 24px;
  overflow: hidden;
  position: relative;

}
</style>