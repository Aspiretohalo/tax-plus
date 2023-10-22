<template>
    <div>
      <el-container style="display:flex">
        <el-aside>
          <LeftMenuMsg></LeftMenuMsg>
        </el-aside>
        <el-main class="main">
          <div style="width:100%">
            <div class="Msgbackground">
              <img src="src\assets\imgs\Msgbackground.png" alt="cover">
            </div>
            <div class="bgavatar">
              <div class="imgbox">
                <img class="imgtip" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
              </div>    
            </div>
            
  
            
  
          </div>
  
  
        </el-main>
  
      </el-container>
    </div>
  </template>
  
  <script lang="ts" setup>
  import LeftMenuMsg from '../../components/LeftMenuMsg.vue'
  
  </script>
  
  <style lang="scss" scoped>
  body {
    background-color: #fff;
  }
  
  .el-descriptions {
    margin-top: 20px;
  }
  
  ::v-deep .el-main {
    --el-main-padding: 0px background-color: #f9f9f9;
  }
  
  ::v-deep .el-col-6 {
    padding-left: 80px;
  }
  
  
  .Msgbackground {
    flex: 1;
    position: relative;
  
    width: 100%;
    max-height: 320px;
    object-fit: cover;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
  }
  
  .Msgbackground img {
    z-index: 1;
    width: 100%;
    height: fit-content;
  }
  
  
  
  .bgname{
    padding-left: 85px;
    font-size: 45px;
    font-weight: 300;
    font-family: 'Hiragino Sans GB';
  
  }
  
  .imgbox {
    padding-left: 120px;
    z-index: 20;
    flex: 1;
    position: relative;
    height: 112px;
    width: 112px;
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
  
  
  }
  
  .imgtip {
  
    transform: translateY(-50%);
    border-radius: 50%;
    height: 100%;
    width: 100%;
  
  }</style>