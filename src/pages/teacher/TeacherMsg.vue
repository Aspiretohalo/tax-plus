<template>
  <div> <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container style="display:flex">
        <el-aside>
          <LeftMenuTeacherMsg></LeftMenuTeacherMsg>
        </el-aside>
        <el-main class="main">
          <div style="width: 100%">
            <div class="Msgbackground">
              <img src="https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/file/%E6%B8%90%E5%8F%983.jpg"
                alt="cover" />
            </div>
            <div class="bgavatar">
              <div class="imgbox" style="margin-left: 330px ">
                <el-upload v-model:file-list="fileList" class="upload-demo" action="http://localhost:8085/avatar/upload"
                  :on-success="handleResponse" :limit="1" :show-file-list="false">
                  <el-avatar class="imgtip" :size="120" :src="form.avatar" />
                </el-upload>
              </div>
            </div>
            <div>
              <span class="bgname" style="margin-left: 350px ">{{ form.teacher_name }}</span>
              <el-button type="primary" plain @click="dialogFormVisible = true" style="margin-left: 30px;">
                修改信息
              </el-button>
            </div>
            <el-col :span="6" style="margin-left: 350px">
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>手机号：</span></div>
                </el-col>
                <el-col :span="16">{{ form.phone_number }}</el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>email：</span></div>
                </el-col>
                <el-col :span="16">{{ form.email }}</el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>性别：</span></div>
                </el-col>
                <el-col :span="16">
                  <span class="role" size="large">{{ form.gender == '1' ? '男' : '女' }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top: 30px">
                <el-col :span="8">
                  <div style="text-align: right; color: gray"><span>身份：</span></div>
                </el-col>
                <el-col :span="16">
                  <el-tag class="role" size="large">学员</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <div style="height: 100px;width: 100%;"></div>
          </div>
          <el-dialog v-model="dialogFormVisible" title="修改信息" style="padding: 30px;width: 30%;">
            <el-form :model="form" :rules="rules" ref="ruleFormRef" :hide-required-asterisk="true">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="teacher_name">
                <el-input v-model="form.teacher_name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.phone_number" disabled autocomplete="off" />
              </el-form-item>
              <el-form-item label="email" :label-width="formLabelWidth" prop="email">
                <el-input v-model="form.email" autocomplete="off" />
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.gender">
                  <el-option label="男" value="1" />
                  <el-option label="女" value="0" />
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="setTeacherMsg()">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenuTeacherMsg from '../../components/LeftMenuTeacherMsg.vue';
import TopNav from '../../components/TopNav.vue'
import { ref, reactive } from "vue";
import myAxios from "../../plugins/myAxios";
import state from '../../store/state'
import { ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

// const teacher: any = ref(JSON.parse(sessionStorage.getItem("teachers") || "null") || "");
const form = reactive(JSON.parse(sessionStorage.getItem("teachers") || "null") || "")

import type { UploadUserFile, UploadProps } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const handleResponse: UploadProps['onSuccess'] = async (response: any) => {
  form.avatar = response.data
  console.log(form);
  try {
    const response = await myAxios.put('http://localhost:8085/setTeacherAvatar', JSON.stringify(form), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await getUserMsg()
    console.log(response.data);

  } catch (error) {
    console.error('传参失败', error);
  }
}
const setTeacherMsg = async () => {
  console.log(form);
  try {
    const response = await myAxios.put('http://localhost:8085/setTeacherMsg', JSON.stringify(form), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await getUserMsg()
    console.log(response.data);
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } catch (error) {
    console.error('传参失败', error);
  }
  dialogFormVisible.value = false
}
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  teacher_name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入email', trigger: 'blur' },
  ],
})
const getUserMsg = async () => {
  try {
    const response = await myAxios.get('/getTeacherMsg', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.teachers = response.data
    sessionStorage.setItem('teachers', JSON.stringify(state.teachers))
  } catch (error) {
    console.error('获取学生信息失败', error);
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;
}

.el-descriptions {
  margin-top: 20px;
}

:deep(.el-main) {
  --el-main-padding: 0px background-color: #f9f9f9;
}

:deep(.el-col-6) {
  padding-left: 80px;
}


.Msgbackground {
  flex: 1;
  position: relative;

  width: 100%;
  max-height: 320px;
  object-fit: cover;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  overflow: hidden;
}

.Msgbackground img {
  z-index: 1;
  width: 100%;
  height: fit-content;
}



.bgname {
  padding-left: 85px;
  font-size: 45px;
  font-weight: 300;
  font-family: 'Hiragino Sans GB';

}

.imgbox {
  padding-left: 120px;
  z-index: 20;
  flex: 1;
  position: relative;
  height: 112px;
  width: 112px;
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;


}

.imgtip {

  transform: translateY(-50%);
  border-radius: 50%;
  height: 120px;
  width: 120px;

}
</style>