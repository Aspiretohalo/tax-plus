<template>
  <div class="box">
    <el-button @click="handleClick">我是教师</el-button>
    <h3>学生端</h3>
    <el-form class="el-form" label-position="top" :model="student" label-width="120px" :rules="rules" ref="ruleFormRef"
      :hide-required-asterisk="true">
      <el-form-item class="el-form-item" label="手机号码" prop="phone_number">
        <el-input class="el-input" v-model="student.phone_number" />
      </el-form-item>
      <el-form-item class="el-form-item" label="密码" prop="user_password">
        <el-input class="el-input" v-model="student.user_password" type="password" />
      </el-form-item>
      <el-form-item class="el-form-item">
        <el-button type="primary" @click="submitFormStudent(ruleFormRef)" size="large">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import myAxios from '../plugins/myAxios'
import { ElMessage } from 'element-plus'

const handleClick = () => {
  router.push('/loginTeacher')
}

const student = reactive({
  phone_number: '',
  user_password: '',
})
const handleLoginStudent = async (student: { phone_number: string, user_password: string }) => {
  try {
    // 创建章节，即将章节信息传给后端，存入数据库
    const response = await myAxios.post('/student/login', JSON.stringify(student), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('token', response.data.data.jwt)
    ElMessage({
      showClose: true,
      message: '登录成功',
      type: 'success',
    })
    router.push('/')
    console.log(response);
  } catch (error) {
    ElMessage({
      showClose: true,
      message: '账号或密码错误.',
      type: 'error',
    })
    console.error('账号或密码错误', error);
  }
}

import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const submitFormStudent = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleLoginStudent(student)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = reactive({
  phone_number: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
  ],
  user_password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],

})
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  width: 1200px;
  margin-left: 500px;
  margin-top: 100px;

  .el-form {
    display: inline-block;

    .el-form-item {
      margin-top: 25px;
      width: 450px;
    }
  }

}


.el-input {
  height: 50px;
}
</style>