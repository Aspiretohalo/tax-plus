<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>学习资料</h3>
        </div>
      </template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="file_name" label="文件名" width="260" />
        <el-table-column prop="file_type" label="类型" width="180" />
        <el-table-column prop="file_size" label="大小" />
        <el-table-column>
          <template #default>
            <el-button class="download">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const tableData = [
  {
    file_name: '试卷一',
    file_type: 'pdf',
    file_size: '10kb',
  },
  {
    file_name: '试卷一',
    file_type: 'pdf',
    file_size: '10kb',
  },
  {
    file_name: '试卷一',
    file_type: 'pdf',
    file_size: '10kb',
  },
  {
    file_name: '试卷一',
    file_type: 'pdf',
    file_size: '10kb',
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
  width: 950px;
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