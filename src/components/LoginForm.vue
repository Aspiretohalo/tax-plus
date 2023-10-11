<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane class="el-tab-pane" label="学生端" name="student">
      <el-form class="el-form" label-position="top" :model="form" label-width="120px">
        <el-form-item class="el-form-item" label="手机号码">
          <el-input class="el-input" v-model="form.name" />
        </el-form-item>
        <el-form-item class="el-form-item" label="密码">
          <el-input class="el-input" v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item class="el-form-item">
          <el-button type="primary" @click="onSubmit" size="large">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="教师端" name="teacher">
      <el-form class="el-form" label-position="top" :model="form" label-width="120px">
        <el-form-item class="el-form-item" label="手机号码">
          <el-input class="el-input" v-model="form.name" />
        </el-form-item>
        <el-form-item class="el-form-item" label="密码">
          <el-input class="el-input" v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item class="el-form-item">
          <el-button type="primary" @click="onSubmit" size="large">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('student')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const form = reactive({
  name: '',
  password: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped>
.demo-tabs {
  padding-left: 150px;
  width: 450px;
}
.el-form {
  display: inline-block;
}
.el-form-item {
  margin-top: 25px;
  width: 450px;
}

.el-input {
  height: 50px;
}

::v-deep .el-tabs__item {
  width: 200px;
}
::v-deep .el-tabs__active-bar {
  padding: 0 25px;
}
</style>