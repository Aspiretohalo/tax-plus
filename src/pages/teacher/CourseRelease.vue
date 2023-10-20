<template>
  <div>
    <el-container>
      <el-aside>
        <LeftMenuTeacher></LeftMenuTeacher>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <el-form :model="course" class="needlarge" label-width="120px">
            <el-form-item label="课程名称" text-align: center>
              <el-input v-model="course.name" />
            </el-form-item>
            <el-form-item label="课程标签">
              <el-select multiple v-model="course.label" placeholder="选择标签" style="width: 360px">
                <el-option label="入门课程" value="入门课程" />
                <el-option label="初级课程" value="初级课程" />
                <el-option label="中级课程" value="中级课程" />
                <el-option label="高级课程" value="高级课程" />
                <el-option label="顶级课程" value="顶级课程" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程时间">
              <el-col :span="11">
                <el-date-picker v-model="course.date1" type="date" placeholder="Pick a date" style="width: 50%" />
              </el-col>
              <!-- <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col> -->
              <el-col :span="11">
                <el-time-picker v-model="course.date2" placeholder="Pick a time" style="width: 50%" />
              </el-col>
            </el-form-item>
            <el-form-item label="老师">
              <el-input v-model="course.course_teacher" disabled />
            </el-form-item>


            <el-form-item label="上传封面">
              <el-upload action="#" list-type="picture-card" :auto-upload="false">
                <el-icon>
                  <Plus />
                </el-icon>

                <template #file="{ file }">
                  <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <el-icon>
                          <Download />
                        </el-icon>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <el-icon>
                          <Delete />
                        </el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>


            </el-form-item>



            <el-form-item label="课程简介">
              <el-input v-model="course.introduction" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(); dialogVisible = true">确认</el-button>
              <el-dialog align-center v-model="dialogVisible" title="课程确认" width="30%">
                <span>
                  <p>
                    <el-text tag="b">发布课程：</el-text>
                    <el-text>{{ course.name }}</el-text>
                  </p>
                  <p>
                    <el-text tag="b">提交老师：</el-text>
                    <el-text>{{ course.course_teacher }}</el-text>
                  </p>
                  <p><el-text tag="b">课程标签：</el-text>
                    <el-text>{{ course.label }}</el-text>
                  </p>

                  <p>
                    <el-text tag="b">发布时间：</el-text>
                    <el-text>{{ course.date2 }}</el-text>
                  </p>
                </span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false" size="large">
                      发布
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
import { reactive } from 'vue'
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}


// const dialogVisible = ref(false)

// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('你确定要取消这次提交吗？')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }

// do not use same name with ref
const course = reactive({
  name: '',
  label: '',
  date1: '',
  date2: '',
  introduction: '',
  course_teacher: 'zjt',
})

const onSubmit = () => {
  console.log(666);

}
</script>

<style  scoped>
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
  /* position: relative; */
  position: absolute;
  width: 80%
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>