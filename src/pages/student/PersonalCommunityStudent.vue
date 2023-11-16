<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
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
          </div>
          <el-card class="box-card notice" shadow="never">
            <div style="display: flex;justify-content: right;padding-right: 30px;">
              <el-input v-model="input" placeholder="请输入" clearable />
              <el-button type="primary" :icon="Search" circle />
            </div>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="最新" name="first">
                <el-card class="box-card-small" shadow="never">
                  <template #header>
                    <div class="card-header">
                      <span>曹师傅
                        <el-tag style="margin-left: 15px;">老师</el-tag>
                        <el-text style="padding-left: 20px;">{{ post_time }}</el-text>
                      </span>

                      <el-button class="button" text>回复</el-button>
                    </div>
                  </template>
                  <div>
                    <p>曹师傅牛逼，666</p>
                    <div class="demo-image__preview">
                      <el-image style="width: 100px; height: 100px" :src="url" :zoom-rate="1.2" :max-scale="7"
                        :min-scale="0.2" :preview-src-list="srcList" :initial-index="4" fit="cover" />
                    </div>
                  </div>




                </el-card>


              </el-tab-pane>
              <el-tab-pane label="全部" name="second">全部</el-tab-pane>
              <el-tab-pane label="我的" name="third">我的</el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
    <SpecialIcon></SpecialIcon>
  </div>
</template>
  
<script lang="ts" setup>
import LeftMenuStudentMsg from '../../components/LeftMenuStudentMsg.vue'
import TopNav from '../../components/TopNav.vue'

import { ref } from 'vue'
// import { reactive,defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
// import { ElMessage } from 'element-plus'
import { Search, } from '@element-plus/icons-vue'
// import type { UploadProps } from 'element-plus'

import { onUnmounted, onMounted } from 'vue';
import SpecialIcon from '../../components/SpecialIcon.vue'

const post_time = ref(new Date().toLocaleString());

// 创建一个函数来更新 currentTime
const updateCurrentTime = () => {
  post_time.value = new Date().toLocaleString();
};

// 在组件挂载时开始定时更新 currentTime
onMounted(() => {
  const timer = setInterval(updateCurrentTime, 1000);
  // 在组件卸载时清除定时器，以防内存泄漏
  onUnmounted(() => {
    clearInterval(timer);
  });
});
const input = ref('')

// const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     return false
//   } else if (rawFile.size / 1024 / 1024 > 2) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
//   return true
// }



const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
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


h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}

.box-card {
  width: 90%;
  margin-left: 70px;
}



.notice {
  margin-top: 10px;
}
</style>