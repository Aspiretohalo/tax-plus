<template>
  <div>
    <el-card class="box-card notice" shadow="never">
      <template #header>
        <div class="card-header">
          <h3>课程资料</h3>
        </div>
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
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import SpecialIcon from '../../../components/SpecialIcon.vue';

// import myAxios from '../../../plugins/myAxios'

const handleDownload = async (file_url: string) => {
  window.open(file_url)

}
const tableData = [
  {
    // course_id: route.params.courseId,
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
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;
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