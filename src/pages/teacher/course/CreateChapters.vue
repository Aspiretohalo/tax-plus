<template>
  <div>


    <el-card class="box-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="章节名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="上传时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 50%" />
          </el-col>

          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 50%" />
          </el-col>
        </el-form-item>

        <el-form-item label="老师">
          <el-input v-model="course.course_teacher" disabled />
        </el-form-item>
        <el-form-item label="章节简介">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>

        <!-- <el-form-item label="视频上传">
          <el-upload ref="upload" action="filename" :http-request="httpRequest" :show-file-list="false">
            <i v-if="videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          // 进度条
          <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent"></el-progress>


        </el-form-item> -->






        <el-form-item>
          <el-button type="primary" @click="onSubmit(); dialogVisible = true">确认</el-button>
          <el-dialog v-model="dialogVisible" title="章节确认" width="30%" :before-close="handleClose">
            <span>
              <p>您将要发布的{{ form.name }}章节，时间是{{ form.date2 }}</p>
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
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
// import TcVod from 'vod-js-sdk-v6'




const course = reactive({
  name: '',
  label: '',
  date1: '',
  date2: '',
  introduction: '',
  course_teacher: 'zjt',
})

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
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log(form.date2)
}

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