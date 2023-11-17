<template>
  <div>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container style="display: flex">
        <el-aside>
          <LeftMenuStudentMsg></LeftMenuStudentMsg>
        </el-aside>
        <el-main class="main">
          <div style="width: 100%">
            <div class="Msgbackground">
              <img src="src\assets\imgs\Msgbackground.png" alt="cover" />
            </div>
            <div class="bgavatar">
              <div class="imgbox">
                <img class="imgtip" :src="student.avatar" />
              </div>
            </div>
            <div>
              <span class="bgname" style="margin-left: 55px">{{ student.student_name }}</span>
            </div>
            <el-col :span="6">
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>手机号：</span></div>
                </el-col>
                <el-col :span="16">{{ student.phone_number }}</el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>email：</span></div>
                </el-col>
                <el-col :span="16">{{ student.email }}</el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>身份：</span></div>
                </el-col>
                <el-col :span="16">
                  <el-tag class="role" size="large">学员</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <div style="height: 200px;width: 100%;"></div>

          </div>
          <div class="badge-wall">
            <h2 class="badge-wall-title">勋章墙</h2>
            <!-- Your badge wall content goes here -->
            <div class="badge-slot" v-for="item in badge">
              <img :src="item.badge_url" alt="Badge 1" class="badge-image" />
            </div>
            <el-pagination class="pagination" layout="prev, pager, next" :total="50" />
          </div>

        </el-main>
      </el-container>

    </el-container>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import LeftMenuStudentMsg from "../../components/LeftMenuStudentMsg.vue";
import { ref } from "vue";
import TopNav from "../../components/TopNav.vue";
import SpecialIcon from "../../components/SpecialIcon.vue";

const badge = [
  {
    badge_url: 'src/assets/icon/1.svg'
  }, {
    badge_url: 'src/assets/icon/2.svg'
  }, {
    badge_url: 'src/assets/icon/3.svg'
  }, {
    badge_url: 'src/assets/icon/5.svg'
  }, {
    badge_url: 'src/assets/icon/1.svg'
  }, {
    badge_url: 'src/assets/icon/2.svg'
  }, {
    badge_url: 'src/assets/icon/3.svg'
  }, {
    badge_url: 'src/assets/icon/5.svg'
  }
]
const student: any = ref(JSON.parse(sessionStorage.getItem("students") || "null") || "");
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;

}

.badge-wall {
  position: absolute;
  top: 400px;
  right: 100px;
  width: 600px;
  // height: 300px;
  background: linear-gradient(45deg, #e6e6fa, #977AFF);
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 10;
  color: #333;

  .pagination {
    margin: 0 auto;
    width: 224px;
    margin-top: 30px;
    --el-pagination-bg-color: transparent;
    --el-pagination-button-disabled-bg-color: transparent;
  }

  .badge-wall-title {
    font-size: 1.5em;
    margin-bottom: 10px;
    text-align: center;
  }

  .badge-slot {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 40px;
    margin-top: 30px;
    border-radius: 8px;
    overflow: hidden;

    .badge-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.el-descriptions {
  margin-top: 20px;
}

:deep(.el-main) {
  --el-main-padding: 0px background-color: #f9f9f9;
}

:deep(.el-col-6) {
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