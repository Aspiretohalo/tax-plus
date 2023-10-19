<template>
  <div>
    <el-container>
      <el-aside>
        <CourseMenuTeacher></CourseMenuTeacher>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <el-form :model="course" label-width="120px">
            <el-form-item label="课程名称">
              <el-input v-model="course.name" />
            </el-form-item>
            <el-form-item label="课程标签">
              <el-select multiple v-model="course.label" placeholder="选择标签" style="width: 240px">
                <el-option label="入门课程" value="basic" />
                <el-option label="初级课程" value="low" />
                <el-option label="中级课程" value="mid" />
                <el-option label="高级课程" value="high" />
                <el-option label="顶级课程" value="top" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程时间">
              <el-col :span="11">
                <el-date-picker v-model="course.date1" type="date" placeholder="Pick a date" style="width: 100%" />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker v-model="course.date2" placeholder="Pick a time" style="width: 100%" />
              </el-col>
            </el-form-item>
            <el-form-item label="老师">
              <el-input v-model="course.course_teacher" disabled />
            </el-form-item>

            <el-form-item label="课程简介">
              <el-input v-model="course.introduction" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(); dialogVisible = true">确认</el-button>
              <el-dialog align-center v-model="dialogVisible" title="课程确认" width="30%" >
                <span>
                  <p>您将要发布的{{ course.name }}课程，时间是{{ course.date2}}</p>
                </span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
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
import CourseMenuTeacher from '../../components/LeftMenuTeacher.vue'
import { reactive } from 'vue'
import { ref } from 'vue'

// import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

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
  course_teacher:'zjt',
})

const onSubmit = () => {
  console.log(666);
  
}
</script>

<style  scoped>
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