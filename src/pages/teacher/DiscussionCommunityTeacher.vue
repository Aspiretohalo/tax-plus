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
          <div class="tabbar">
            <span class="welcome">讨论区</span>
            <el-button type="primary" class="goOnLearning" @click="dialogFormVisible = true">创建讨论</el-button>
          </div>
          <el-dialog v-model="dialogFormVisible" title="我的讨论" style="padding: 0 20px;">
            <el-form :model="discussionForm" :rules="rules" ref="ruleFormRef" :hide-required-asterisk="true">
              <el-form-item label="讨论内容" prop="post_text">
                <el-input v-model="discussionForm.post_text" type="textarea" style="width: 780px;" />
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
                <el-button type="primary" @click="handleAssure()">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-card class="box-card notice">
            <div v-for="item in mergedData" :key="item.post_id" class="author-title reply-father">
              <el-avatar class="header-img" :size="50" :src="item.avatar"></el-avatar>
              <div class="author-info">
                <span class="author-name">{{ item.name }}</span>
                <el-tag class="author-tag">{{ item.commentator_type === 'student' ? commentator_type[0] :
                  commentator_type[1] }}</el-tag>
                <span class="author-time marginLeft">{{ item.post_time }}</span>
              </div>
              <el-button type="info" plain class="replyBtn" @click="handleReply(item.post_id)">回复</el-button>
              <div class="talk-box">
                <p>
                  <span class="reply">{{ item.post_text }}</span>
                </p>
              </div>
              <div class="reply-box">
                <div v-for="subItem in item.replies" :key="subItem.post_id" class="author-title">
                  <el-avatar class="header-img" :size="30" :src="subItem.avatar"></el-avatar>
                  <div class="author-info">
                    <span class="author-name">{{ subItem.name }}</span>
                    <el-tag class="author-tag">{{ subItem.commentator_type === 'student' ? commentator_type[0] :
                      commentator_type[1] }}</el-tag>
                    <span class="author-time marginLeft">{{ subItem.post_time }}</span>
                  </div>
                  <div class="talk-box">
                    <p>
                      <span class="reply">{{ subItem.post_text }}</span>
                    </p>
                  </div>
                  <div class="reply-box"></div>
                </div>
              </div>
            </div>
          </el-card>

          <el-dialog v-model="dialogFormVisible2" title="回复" style="padding: 0 20px;">
            <el-form :model="subDiscussionForm" :rules="rules" ref="ruleFormRef" :hide-required-asterisk="true">
              <el-form-item label="回复内容" prop="post_text">
                <el-input v-model="subDiscussionForm.post_text" type="textarea" style="width: 780px;" />
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
                <el-button @click="dialogFormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="handleAssure2()">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'
import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { onUnmounted, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import myAxios from '../../plugins/myAxios'
import state from '../../store/state'


// 创建一个响应式的 currentTime 变量
const post_time = ref(new Date().toLocaleString());

// 创建一个函数来更新 currentTime
const updateCurrentTime = () => {
  post_time.value = new Date().toLocaleString();
};

onMounted(async () => {
  await getDiscussion()
  await getSubDiscussion()
  // 合并嵌套数据
  mergedData.value = discussionData.value.map((item: DiscussionType) => {
    const subItems = subDiscussionData.value.filter((subItem: SubDiscussionType) => subItem.parent_post_id === item.post_id);
    return {
      ...item,
      replies: subItems,
    };
  });
  console.log(mergedData);
  // 在组件挂载时开始定时更新 currentTime
  const timer = setInterval(updateCurrentTime, 1000);
  // 在组件卸载时清除定时器，以防内存泄漏
  onUnmounted(() => {
    clearInterval(timer);
  });
});
const commentator_type = ref(['学员', '老师'])



const getDiscussion = async () => {
  try {
    const response = await myAxios.get('/getDiscussion', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.discussion = response.data
    sessionStorage.setItem('discussion', JSON.stringify(state.discussion))
    const coursesString = sessionStorage.getItem('discussion');
    if (coursesString) {
      discussionData.value = JSON.parse(coursesString)
    }

  } catch (error) {
    console.error('获取信息失败', error);
  }
};

const getSubDiscussion = async () => {
  try {
    const response = await myAxios.get('/getSubDiscussion', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.subDiscussion = response.data
    sessionStorage.setItem('subDiscussion', JSON.stringify(state.subDiscussion))
    const coursesString = sessionStorage.getItem('subDiscussion');
    if (coursesString) {
      subDiscussionData.value = JSON.parse(coursesString)
    }

  } catch (error) {
    console.error('获取信息失败', error);
  }
};
const discussionData: any = ref([
  // {
  //   post_id: 1,
  //   commentator_type: 'student',
  //   commentator_name: '行数搭建ad',
  //   post_text: '撒发发发',
  //   post_time: new Date(),
  //   image_url: '',
  // },
  // {
  //   post_id: 2,
  //   commentator_type: 'student',
  //   commentator_name: '李开复拉开',
  //   post_text: '哦佛山佛山的',
  //   post_time: new Date(),
  //   image_url: '',
  // }
])
const subDiscussionData: any = ref([
  // {
  //   post_id: 1,
  //   parent_post_id: 1,
  //   commentator_type: 'teacher',
  //   commentator_name: '正义使者',
  //   post_text: '奥术大师肯定会将阿斯顿',
  //   post_time: new Date(),
  //   image_url: '',
  // },
  // {
  //   post_id: 2,
  //   parent_post_id: 2,
  //   commentator_type: 'teacher',
  //   commentator_name: 'jaskdjak',
  //   post_text: 'sadjaskdjask',
  //   post_time: new Date(),
  //   image_url: '',
  // }
])
const mergedData: any = ref([]);


interface DiscussionType {
  post_id: number;
  commentator_type: string;
  commentator_name: string;
  post_text: string;
  post_time: Date;
  image_url: string;
}

interface SubDiscussionType {
  post_id: number;
  parent_post_id: number;
  commentator_type: string;
  commentator_name: string;
  post_text: string;
  post_time: Date;
  image_url: string;
}
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
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  post_text: [
    { required: true, message: '请输入文字', trigger: 'blur' },
  ],
})

const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)

const handleAssure = async () => {
  await submitForm(ruleFormRef.value)
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await myAxios.post('/setDiscussion', JSON.stringify(discussionForm), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
      } catch (error) {
        console.error('评论失败', error);
      }
      dialogFormVisible.value = false
      ElMessage({
        message: '评论成功',
        type: 'success',
      })
      await getDiscussion()
      await getSubDiscussion()
      mergedData.value = discussionData.value.map((item: DiscussionType) => {
        const subItems = subDiscussionData.value.filter((subItem: SubDiscussionType) => subItem.parent_post_id === item.post_id);
        return {
          ...item,
          replies: subItems,
        };
      });
    } else {
      console.log('error submit!', fields)
    }
  })
}
const handleAssure2 = async () => {
  await submitForm2(ruleFormRef.value)
}

const submitForm2 = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await myAxios.post('/setSubDiscussion', JSON.stringify(subDiscussionForm), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
      } catch (error) {
        console.error('评论失败', error);
      }
      dialogFormVisible2.value = false
      ElMessage({
        message: '评论成功',
        type: 'success',
      })
      await getDiscussion()
      await getSubDiscussion()
      mergedData.value = discussionData.value.map((item: DiscussionType) => {
        const subItems = subDiscussionData.value.filter((subItem: SubDiscussionType) => subItem.parent_post_id === item.post_id);
        return {
          ...item,
          replies: subItems,
        };
      });
    } else {
      console.log('error submit!', fields)
    }
  })
}

const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')

const discussionForm = reactive({
  post_text: '',
  commentator_name: teacher.value.teacher_name,
  commentator_type: 'teacher',
  // post_time: new Date()
})
const subDiscussionForm = reactive({
  parent_post_id: 0,
  post_text: '',
  commentator_name: teacher.value.teacher_name,
  commentator_type: 'teacher',
  // post_time: new Date()
})
const handleReply = (parent_post_id: number) => {
  dialogFormVisible2.value = true
  subDiscussionForm.parent_post_id = parent_post_id
}

</script>
  
<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}

.tabbar {
  margin: 20px 0;
}

:deep(.el-dialog) {
  padding: 10px 25px;
  border-radius: 15px;
}

.box-card {
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;
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
  right: 150px;
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

// .talk-box {
//   margin-left: 15px;
// }

.my-reply {
  padding: 20px;
  background-color: #f6f6f6;
  border-radius: 5px;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;

    .commentInput {
      height: 64px;
      margin-left: 10px;
    }
  }

  .reply-btn-box {
    height: 25px;
    margin: 10px 0;

    .reply-btn {
      position: relative;
      float: right;
      margin-right: 10px;
    }
  }
}

.my-comment-reply {
  margin-left: 50px;

  .reply-input {
    width: flex;
  }
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;



  .replyBtn {
    float: right;
    margin-right: 30px;
  }

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .author-info {
    display: inline-block;
    margin-left: 25px;
    width: 60%;
    height: 40px;
    line-height: 20px;

    >span {
      // display: block;
      // margin-right: 20px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .marginLeft {
      margin-left: 20px;
    }

    .author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }

    .author-tag {
      margin-left: 10px;
    }

    .author-time {
      font-size: 14px;
    }
  }

  .icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;

    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }

    >span {
      cursor: pointer;
    }

    .iconfont {
      margin: 0 5px;
    }
  }

  .talk-box {
    margin: 0 50px;

    >p {
      margin: 0;
      margin-left: 5px;
    }

    .reply {
      font-size: 16px;
      color: #000;
    }
  }

  .reply-box {
    margin: 10px 30px 0 65px;
    background-color: #e9e9eb;
    border-radius: 5px;
  }
}
</style>