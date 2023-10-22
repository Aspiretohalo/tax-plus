<template>
  <div>


    <el-card class="box-card">
      <el-form :rules="rules" :model="form" label-width="120px" ref="ruleFormRef" :hide-required-asterisk="true">
        <el-form-item label="章节名称" prop="video_name">
          <el-input v-model="form.video_name" placeholder="填写章节名称" />
        </el-form-item>
        <!-- <el-form-item label="上传时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 50%" />
          </el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 50%" />
          </el-col>
        </el-form-item> -->
        <el-form-item>
          <el-upload v-model:file-list="fileList" class="upload-demo" :auto-upload="false"
            action="http://localhost:8085/vod/upload" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
            <el-button type="primary">选择视频</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
          <el-dialog v-model="dialogVisible" title="章节确认" width="30%" :before-close="handleClose" :show-close="false">
            <span>
              <p>您将要发布的：{{ form.video_name }}</p>
            </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  确认并提交
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

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
    `Cancel the transfer of ${uploadFile.name, uploadFiles} ?`
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

// do not use same name with ref
const form = reactive({
  video_name: '',

})

const onSubmit = () => {
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
  video_name: [
    { required: true, message: '请输入课程名', trigger: 'blur' },
  ],

})

</script>

<style lang="scss" scoped>
::v-deep .el-aside {
  width: 258px;
}


::v-deep .el-form-item__label {
  font-family: 'Hiragino Sans GB';
  font-size: 2ch;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

::v-deep .el-input__wrapper {
  height: 50px;
}

.box-card {
  // position: relative;
  position: absolute;
  width: 80%
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