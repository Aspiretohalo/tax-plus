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
              <el-input v-model="course.course_name" />
            </el-form-item>
            <el-form-item label="课程标签">
              <el-select multiple v-model="course.course_label" placeholder="选择标签" style="width: 360px">
                <el-option label="入门课程" value="入门课程" />
                <el-option label="初级课程" value="初级课程" />
                <el-option label="中级课程" value="中级课程" />
                <el-option label="高级课程" value="高级课程" />
                <el-option label="顶级课程" value="顶级课程" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程时间">
              <el-col :span="11">
                <el-date-picker v-model="course.date1" type="date" placeholder="选择日期" style="width: 50%" />
              </el-col>
              <el-col :span="11">
                <el-time-picker v-model="course.date2" placeholder="选择时间" style="width: 50%" />
              </el-col>
            </el-form-item>
            <el-form-item label="老师">
              <el-input v-model="course.course_teacher" disabled />
            </el-form-item>
            <el-form-item label="上传封面">
              <el-upload v-model:file-list="fileList" action="http://localhost:8085/course/cover/upload"
                list-type="picture-card" :auto-upload="true" :on-remove="handleRemove"
                :on-preview="handlePictureCardPreview" :limit="1" :on-progress="console.log(fileList)">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
              <el-dialog v-model="dialogVisible_preview">
                <img w-full :src="dialogImageUrl" alt="预览 " />
              </el-dialog>
            </el-form-item>
            <el-form-item label="课程简介">
              <el-input v-model="course.course_description" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(); dialogVisible = true">确认</el-button>
              <el-dialog align-center v-model="dialogVisible" title="课程确认" width="30%">
                <span>
                  <p>
                    <el-text tag="b">发布课程：</el-text>
                    <el-text>{{ course.course_name }}</el-text>
                  </p>
                  <p>
                    <el-text tag="b">提交老师：</el-text>
                    <el-text>{{ course.course_teacher }}</el-text>
                  </p>
                  <p><el-text tag="b">课程标签：</el-text>
                    <el-text>{{ course.course_label }}</el-text>
                  </p>
                  <p>
                    <el-text tag="b">发布时间：</el-text>
                    <el-text>{{ course.date2 }}</el-text>
                  </p>
                </span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleRelease()" size="large">
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
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const dialogVisible = ref(false)

const course = reactive({
  course_name: '',
  course_label: '',
  date1: '',
  date2: '',
  // course_url,
  course_description: '',
  course_teacher: 'zjt',
})

const fileList = ref<UploadUserFile[]>([

])

const handleRelease = () => {
  console.log(course);
  dialogVisible.value = false
}

// 图片预览
const dialogImageUrl = ref('')
const dialogVisible_preview = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible_preview.value = true
}

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