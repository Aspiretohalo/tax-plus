<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenuTeacher></LeftMenuTeacher>
        </el-aside>
        <el-main class="main">
          <el-card class="box-card">
            <el-form :rules="rules" :model="course" class="needlarge" label-width="120px" ref="ruleFormRef"
              :hide-required-asterisk="true">
              <el-form-item label="课程名称" prop="course_name" text-align: center>
                <el-input v-model="course.course_name" placeholder="填写课程名称" />
              </el-form-item>
              <el-form-item label="课程标签" prop="course_label">
                <el-select multiple v-model="course.course_label" placeholder="选择标签" style="width: 360px">
                  <el-option label="入门课程" value="入门课程" />
                  <el-option label="初级课程" value="初级课程" />
                  <el-option label="中级课程" value="中级课程" />
                  <el-option label="高级课程" value="高级课程" />
                  <el-option label="顶级课程" value="顶级课程" />
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="课程时间">
              <el-col :span="11">
                <el-date-picker v-model="course.date1" type="datetime" placeholder="Select date and time" />
              </el-col>
            </el-form-item> -->
              <el-form-item label="老师">
                <el-input v-model="course.course_teacher" disabled />
              </el-form-item>
              <el-form-item label="上传封面">
                <el-upload ref="uploadRef" v-model:file-list="fileList" action="http://localhost:8085/course/cover/upload"
                  list-type="picture-card" :auto-upload="false" :on-remove="handleRemove"
                  :on-preview="handlePictureCardPreview" :limit="1" :on-success="handleResponse">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible_preview">
                  <img w-full :src="dialogImageUrl" alt="预览 " />
                </el-dialog>
              </el-form-item>
              <el-form-item label="课程简介" prop="course_description">
                <el-input v-model="course.course_description" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                <el-dialog align-center v-model="dialogVisible" title="课程确认" width="30%" :show-close="false">
                  <span>
                    <p>
                      <el-text tag="b">发布课程：</el-text>
                      <el-text>{{ course.course_name }}</el-text>
                    </p>
                    <p>
                      <el-text class="needgy">提交老师：</el-text>
                      <el-text>{{ course.course_teacher }}</el-text>
                    </p>

                    <p><el-text tag="b">课程标签：</el-text>
                      <el-text>{{ course.course_label }}</el-text>
                    </p>
                    <!-- <p>
                    <el-text tag="b">发布时间：</el-text>
                    <el-text>{{ course.date1 }}</el-text>
                  </p> -->

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
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'
import LeftMenuTeacher from '../../components/LeftMenuTeacher.vue'
import { reactive } from 'vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { UploadProps, UploadUserFile } from 'element-plus'
import myAxios from '../../plugins/myAxios'

const router = useRouter()
const dialogVisible = ref(false)

const course = reactive({
  course_name: '',
  course_label: '',
  // date1: '',
  course_url: '',
  course_description: '',
  course_teacher: 1,
})

// const date1 = ref('')

import type { UploadInstance } from 'element-plus'


const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<UploadInstance>()

const onSubmit = () => {
  dialogVisible.value = true
  uploadRef.value!.submit()
}
const handleRelease = async () => {
  try {
    // 发布课程，即将课程信息传给后端，存入数据库
    let obj = {
      course_name: course.course_name,
      course_label: JSON.stringify(course.course_label),
      // date1: course.date1,
      course_url: course.course_url,
      course_description: course.course_description,
      course_teacher: 1,
    }
    const response = await myAxios.post('/teacher/setCourse', JSON.stringify(obj), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  } catch (error) {
    console.error('新建课程失败', error);
  }
  open1()
  dialogVisible.value = false
}

import { ElMessage } from 'element-plus'

const open1 = () => {
  ElMessage({
    message: '新建课程成功！',
    type: 'success',
  })
  router.push('/courseManage')
}

const handleResponse: UploadProps['onSuccess'] = async (response: any) => {
  // 将响应回来的课程封面地址赋值给course
  course.course_url = response.data

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
  course_name: [
    { required: true, message: '请输入课程名', trigger: 'blur' },
  ],
  course_label: [
    {
      required: true,
      message: '请选择标签',
      trigger: 'change',
    },
  ],

  course_description: [
    { required: true, message: '请输入课程简介', trigger: 'blur' },
  ],

})

</script>

<style  scoped>
:deep(.el-aside) {
  width: 258px;
}

:deep(.el-form-item__label) {
  font-family: 'Hiragino Sans GB';
  font-size: 2ch;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}


:deep(.el-input__wrapper) {
  height: 50px;
}

.needgy {
  color: gray;
  font-weight: 600;
}

.box-card {
  /* position: relative; */
  position: absolute;
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>