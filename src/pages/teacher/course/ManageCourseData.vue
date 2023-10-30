<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>课程资料</h3>
        </div>
        <el-upload v-model:file-list="fileList" class="upload-demo" :auto-upload="true"
          action="http://localhost:8085/course/data/upload" :on-preview="handlePreview" :on-remove="handleRemove"
          :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="handleResponse">
          <div class="newBtn items-center">
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
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'

import type { UploadProps, UploadUserFile } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

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

onMounted(async () => {
  await getFileData(courseId.value)
})

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
  console.log(uploadFiles);

  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleResponse: UploadProps['onSuccess'] = async (response: any) => {
  tableData[0].file_url = response.data
  const obj = {
    course_id: route.params.courseId,
    file_name: 'test.doc',
    file_type: 'doc',
    file_size: 16,
    file_url: tableData[0].file_url,
  }
  try {
    const response = await myAxios.post('/course/setFileData', JSON.stringify(obj), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  } catch (error) {
    console.error('上传资料失败', error);
  }
}

const handleDownload = async (file_url: string) => {
  window.open(file_url)

}
let tableData = [
  // {
  //   course_id: route.params.courseId,
  //   file_name: ' ',
  //   file_type: ' ',
  //   file_size: ' ',
  //   file_url: '',
  // },
  {
    // course_id: route.params.courseId,
    file_name: 'Q.docx',
    file_type: 'docx',
    file_size: '58kb',
    file_url: 'https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/file/Q.docx',
  },

]

const getFileData = async (value: any) => {
  try {
    const response = await myAxios.get('/course/getFileData', {
      params: {
        course_id: value
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.FileData = response.data
    sessionStorage.setItem('FileData', JSON.stringify(state.FileData))
    const coursesString = sessionStorage.getItem('FileData');
    if (coursesString) {
      tableData = response.data

      // tableData[0].file_type = JSON.parse(coursesString).file_type
      // tableData[0].file_size = JSON.parse(coursesString).file_size
      // tableData[0].file_url = JSON.parse(coursesString).file_url
    }


  } catch (error) {
    console.error('获取公告信息失败', error);
  }
};



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