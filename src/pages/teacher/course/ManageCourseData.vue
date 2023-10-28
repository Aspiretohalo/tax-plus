<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>课程资料</h3>
        </div>
        <el-upload v-model:file-list="fileList" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
          <div class="newBtn items-center" >

            <el-button type="primary">上传文件</el-button>

          </div>

        </el-upload>


      </template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="file_name" label="文件名" width="260" />
        <el-table-column prop="file_type" label="类型" width="180" />
        <el-table-column prop="file_size" label="大小" />
        <el-table-column>
          <template #default>
            <el-button class="download" @click="handleDownload(tableData[0].file_url)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'element-plus-logo.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
  // {
  //   name: 'element-plus-logo2.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleDownload = async (file_url: string) => {
  window.open(file_url)

}
const tableData = [
  {
    file_name: 'Q.docx',
    file_type: 'docx',
    file_size: '58kb',
    file_url: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/file/Q.docx',
  },

]






</script>
  
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.box-card {
  position: relative;
  width: 950px;

  .newBtn {
    position: absolute;
    right: 30px;
    top: 25px;
    display: inline-block;
  }
}

.row-bg {
  margin-top: 40px;
}

.download {
  margin-left: 100px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.progressAnnular {
  display: inline-block;
}

.progressAnnular .annularText {
  display: block;
  text-align: center;
  margin-top: 30px;
}
</style>