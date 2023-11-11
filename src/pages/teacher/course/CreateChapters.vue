<template>
  <div>
    <el-card class="box-card" shadow="never">
      <el-form :rules="rules" :model="form" label-width="120px" ref="ruleFormRef" :hide-required-asterisk="true">
        <el-form-item label="章节名称" prop="video_title">
          <el-input v-model="form.video_title" placeholder="填写章节名称" />
        </el-form-item>
        <el-upload v-model:file-list="fileList" class="upload-demo" :auto-upload="true"
          action="http://localhost:8085/vod/upload" :on-preview="handlePreview" :on-remove="handleRemove"
          :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="handleResponse">
          <el-button type="primary">选择视频</el-button>
        </el-upload>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
          <el-dialog v-model="dialogVisible" title="章节确认" width="30%" :before-close="handleClose" :show-close="false">
            <span>
              <p>您将要发布的：{{ form.video_title }}</p>
            </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleRelease()">
                  确认并提交
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card notice" shadow="never">
      <template #header>
        <div class="card-header">
          <h3>已有章节</h3>
        </div>
      </template>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="item in chapterData" :title="item.video_title" :name="item.chapter_index">
            <div style="padding-bottom: 10px">
              <el-link :underline="false">
                <template #default> <el-tag class="ml-2" type="success">视频</el-tag>{{ item.video_title }} </template>
              </el-link>
            </div>
            <div>
              <el-link :underline="false"> <el-tag class="ml-2" type="info">课件</el-tag>{{ }}课件</el-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
import state from '../../../store/state'
import type { UploadProps, UploadUserFile } from 'element-plus'
import myAxios from '../../../plugins/myAxios'

const route = useRoute()

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定要取消上传该文件${uploadFile.name, uploadFiles} ?`
  ).then(
    () => true,
    () => false
  )
}

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要取消这次提交吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const form = reactive({
  video_title: '',
  file_id: '',
  psign: '',
  course_id: route.params.courseId,
})


const handleResponse: UploadProps['onSuccess'] = (response: any) => {
  // 将响应回来的课程封面地址赋值给course
  form.file_id = response.data[0]
  form.psign = response.data[1]
}

//目前的情况是，视频上传需要时间，上传完了才会获得到两个数据
const handleRelease = async () => {
  try {
    // 创建章节，即将章节信息传给后端，存入数据库
    let obj = {
      video_title: form.video_title,
      file_id: form.file_id,
      psign: form.psign,
      course_id: form.course_id,
    }
    const response = await myAxios.post('/teacher/setChapter', JSON.stringify(obj), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  } catch (error) {
    console.error('新建章节失败', error);
  }
  ElMessage({
    message: '新建章节成功！',
    type: 'success',
  })
  dialogVisible.value = false
  getChapter(route.params.courseId)
}
const onSubmit = async () => {
  dialogVisible.value = true
}

import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      onSubmit()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = reactive({
  video_title: [
    { required: true, message: '请输入课程名', trigger: 'blur' },
  ],
})

const activeNames = ref()
const chapter_index = ref()
const handleChange = () => {
  chapter_index.value = activeNames.value[0]
}
onMounted(async () => {
  await getChapter(route.params.courseId)
})

////////////////////获得章节

const getChapter = async (value: any) => {
  try {
    const response = await myAxios.get('/course/getChapter', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.chapter = response.data
    sessionStorage.setItem('chapter', JSON.stringify(state.chapter))
    const coursesString = sessionStorage.getItem('chapter');
    if (coursesString) {
      chapterData.value = JSON.parse(coursesString)
    }
  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};
const chapterData: any = ref()
</script>

<style lang="scss" scoped>
:deep(.el-aside) {
  width: 258px;
}


:deep(.el-form-item__label) {
  font-family: 'Hiragino Sans GB';
  font-size: 2ch;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

:deep(.el-input__wrapper) {
  height: 50px;
}

:deep(.el-dialog) {
  padding: 10px 25px;
  border-radius: 15px;
}

.box-card {
  position: relative;
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;

  :deep(.el-collapse-item__header) {
    font-size: 16px;
  }

  :deep(.el-card__header) {
    padding-left: 50px;
  }

  :deep(.el-card__body) {
    padding-left: 50px;
    padding-right: 50px;
  }

  .upload-demo {
    margin-left: 120px;
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}

.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>