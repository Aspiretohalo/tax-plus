<template>
  <div>
    <el-container style="display:flex">
      <el-aside>
        <LeftMenuStudentMsg></LeftMenuStudentMsg>
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
          <div>
            <span class="bgname" style="margin-left: 55px;">{{ student.student_name }}</span>
          </div>
          <el-col :span="6">
            <el-row :gutter="12" style="margin-top:30px;">
              <el-col :span="8">
                <div style="text-align:right; color: gray;"><span>手机号：</span></div>
              </el-col>
              <el-col :span="16">{{ student.phone_number }}</el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top:30px;">
              <el-col :span="8">
                <div style="text-align:right; color: gray;"><span>email：</span></div>
              </el-col>
              <el-col :span="16">{{ student.email }}</el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top:30px;">
              <el-col :span="8">
                <div style="text-align:right; color: gray;"><span>身份：</span></div>
              </el-col>
              <el-col :span="16">
                <el-tag class="role" size="large">学员</el-tag>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="12" style="margin-top:30px;">
              <el-col :span="8">
                <div style="text-align:right; color: gray;"><span>个人介绍：</span></div>
              </el-col>
              <el-col :span="16">对方很懒没留下什么</el-col>
            </el-row> -->
          </el-col>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenuStudentMsg from '../../components/LeftMenuStudentMsg.vue';
import { ref } from 'vue'

const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')



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



.bgname {
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

}
</style>