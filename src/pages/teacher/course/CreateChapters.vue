<template>
  <div>
    <el-container>
      <el-aside>
        <CourseMenuTeacher></CourseMenuTeacher>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <el-form :model="form" label-width="120px">
            <el-form-item label="章节名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="章节标签">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="初级章节" value="low" />
                <el-option label="中级章节" value="mid" />
                <el-option label="高级章节" value="high" />
              </el-select>
            </el-form-item>
            <el-form-item label="章节时间">
              <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
              </el-col>
            </el-form-item>
            <el-form-item label="是否推送 ">
              <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="老师">
              <el-input v-model="teachername" disabled placeholder="默认名" />
            </el-form-item>
            <el-form-item label="章节简介">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-upload ref="uploadRef" class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false">
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <el-button class="ml-3" type="success" @click="submitUpload">
                上传
              </el-button>
              <template #tip>
                <div class="el-upload__tip">
                  注意事项：
                </div>
              </template>
            </el-upload>
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
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
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

const teachername = ref('')
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

.box-card {
  position: relative;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>