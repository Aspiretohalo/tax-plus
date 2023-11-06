<template>
  <div class="bgimg">
    <img src="src\assets\imgs\login_bg.png" style="width: 1280px;height: 720px;">
    <div class="content-overlay">
      <el-card class="box-card" shadow="hover">
        <div>
          <h3>学生端<el-button @click="handleClick" style="margin-left: 30px;">我是教师</el-button></h3>
        </div>
        <div>
          <h2 style="text-align: center;">欢迎来到税学佳学习平台</h2>
        </div>
        <div>
          <h3 style="text-align: center;">WELCOME!</h3>
        </div>

        <div>
          <el-form class="el-form" label-position="top" :model="student" label-width="120px" :rules="rules"
            ref="ruleFormRef" :hide-required-asterisk="true">
            <el-form-item class="el-form-item" label="手机号码" prop="phone_number">
              <el-input class="el-input" v-model="student.phone_number" />
            </el-form-item>
            <el-form-item class="el-form-item" label="密码" prop="user_password">
              <el-input class="el-input" v-model="student.user_password" type="password" />
            </el-form-item>
            <el-form-item class="el-form-item">
              <el-button type="primary" @click="submitFormStudent(ruleFormRef)" size="large"
                style="width: 400px;">立即登录</el-button>

            </el-form-item>
          </el-form>
        </div>

      </el-card>

    </div>

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
.box-card {
  width: 450px;
  height: 530px;
  margin-left: -700px;

  border-radius: 30px;


  .el-form {
    display: inline-block;

    .el-form-item {
      margin-top: 25px;
      width: 400px;
    }
  }
}

.bgimg {

  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

}

.content-overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}


.el-input {
  height: 50px;
}
</style>