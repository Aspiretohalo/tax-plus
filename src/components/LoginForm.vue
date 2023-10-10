<template>
  <el-form class="el-form" label-position="top" :model="form" label-width="120px">
    <el-form-item class="el-form-item" label="Activity name">
      <el-input class="el-input" v-model="form.name" />
    </el-form-item>
    <el-form-item class="el-form-item" label="Activity name">
      <el-input class="el-input" v-model="form.name" />
    </el-form-item>
    <el-form-item class="el-form-item">
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

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
  console.log('submit!')
}
</script>

<style scoped>
.el-form {
  display: inline-block;
  margin-left: 150px;
}
.el-form-item {
  width: 450px;
}

.el-input {
  height: 50px;
}
</style>