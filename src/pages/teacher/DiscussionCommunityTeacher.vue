<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenuTeacher></LeftMenuTeacher>
        </el-aside>
        <el-main>
          <el-card class="box-card welcomeCard">
            <span class="welcome">讨论区</span>
            <el-button type="primary" class="goOnLearning" @click="dialogFormVisible = true">创建讨论</el-button>
            <el-dialog v-model="dialogFormVisible" title="我的讨论">
              <el-form :model="form">
                <el-form-item label="讨论内容">
                  <el-input v-model="form.desc" type="textarea" style="width: 780px;" />
                </el-form-item>
                <el-form-item label="上传图片">

                  <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">
                    确认
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </el-card>
          <el-card class="box-card notice">
            <div style="display: flex;justify-content: right;padding-right: 30px;">
              <el-input v-model="input" placeholder="请输入" clearable />
              <el-button type="primary" :icon="Search" circle />
            </div>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="最新" name="first">
                <el-card class="box-card-small">
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
  </div>
</template>
  
<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'
import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
import { reactive, ref } from 'vue'
// import { reactive,defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Search, } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { onUnmounted, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'

// 创建一个响应式的 currentTime 变量
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

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


// const fileList = ref<UploadUserFile[]>([
//   {
//     name: 'element-plus-logo.svg',
//     url: 'https://element-plus.org/images/element-plus-logo.svg',
//   },
//   {
//     name: 'element-plus-logo2.svg',
//     url: 'https://element-plus.org/images/element-plus-logo.svg',
//   },
// ])

// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles)
// }

// const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
//   console.log(uploadFile)
// }

// const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
//     } totally`
//   )
// }

// const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
//   console.log(uploadFiles);

//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`
//   ).then(
//     () => true,
//     () => false
//   )
// }

const dialogFormVisible = ref(false)


const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


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
  
<style  scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}


/* div {
  display: inline-block;
} */

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
  font-size: larger;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}


.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.goOnLearning {
  position: absolute;
  right: 50px;
  top: 15px;
}

.notice {
  margin-top: 10px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card-small {
  width: 900px;
}




.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>