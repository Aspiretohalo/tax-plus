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
          <el-card class="box-card" shadow="never">
            <el-form :rules="rules" :model="course" class="needlarge" label-width="120px" ref="ruleFormRef"
              :hide-required-asterisk="true">
              <h2 style="margin-left: 20px;">填写课程信息</h2>
              <el-form-item label="课程名称" prop="course_name" text-align: center>
                <el-input v-model="course.course_name" placeholder="填写课程名称" />
              </el-form-item>
              <el-form-item label="课程标签" prop="course_label">
                <el-select-v2 v-model="course.course_label" filterable :options="options" placeholder="选择标签"
                  style="width: 300px;" multiple />
              </el-form-item>
              <el-form-item label="老师">
                <el-input v-model="teacher.teacher_name" disabled />
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
                      <el-text tag="b">提交老师：</el-text>
                      <el-text>{{ teacher.teacher_name }}</el-text>
                    </p>

                    <p><el-text tag="b">课程标签：</el-text>
                      <el-text>{{ course.course_label }}</el-text>
                    </p>
                    <p>
                      <el-text tag="b">课程简介：</el-text>
                      <el-text>{{ course.course_description }}</el-text>
                    </p>
                  </span>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false" size="large">取消</el-button>
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

const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')

const course = reactive({
  course_name: '',
  course_label: '',
  teacher_name: '',
  course_url: '',
  course_description: '',
  course_teacher: 1,
})
const taxClassification: { classification: string; items: string[] }[] = [
  {
    classification: '个人所得税',
    items: ['纳税义务人', '计税方法', '免税额', '税率表', '扣缴义务人', '申报纳税', '税务减免', '个税优惠政策', '个税申报流程']
  },
  {
    classification: '企业所得税',
    items: ['税务登记', '纳税申报', '利润分配', '税务优惠', '并购重组', '跨境税务', '税务筹划', '税务检查', '企业所得税汇算清缴']
  }, {
    classification: '增值税',
    items: ['一般纳税人', '小规模纳税人', '税率', '进项税抵扣', '出口退税', '增值税发票', '跨境服务税收政策', '增值税优惠政策']
  }, {
    classification: '国税',
    items: ['国内税收制度', '跨境税收政策', '对外税务合作', '税收征管']
  }, {
    classification: '地方税',
    items: ['地方税种类', '地方税政策', '地方税收征管']
  }, {
    classification: '税务合规',
    items: ['合规管理制度', '风险评估', '内部控制', '税务稽查', '违法处罚', '税务纠纷解决', '税务风险防范', '税务合规培训']
  }, {
    classification: '财务报表分析',
    items: ['资产负债表', '利润表', '现金流量表', '财务比率分析', '财务报表解读', '财务预测', '财务报告编制', '会计准则遵循']
  }, {
    classification: '税务筹划',
    items: ['个人税务筹划', '企业税务筹划', '跨境税务筹划', '税务优惠政策利用']
  }]

const options = Array.from({ length: 8 }).map((_, idx) => {
  return {
    value: `${taxClassification[idx].classification}`,
    label: `${taxClassification[idx].classification}`,
    options: Array.from({ length: taxClassification[idx].items.length }).map((_, innerIdx) => ({
      value: `${taxClassification[idx].items[innerIdx]}`,
      label: `${taxClassification[idx].items[innerIdx]}`,
    })),
  }
})

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
      course_url: course.course_url,
      course_description: course.course_description,
      course_teacher: teacher.value.teacher_id,
    }
    console.log(obj);
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

:deep(.el-input) {
  width: 300px;
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

:deep(.el-dialog) {
  border-radius: 15px;
  padding: 20px;
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