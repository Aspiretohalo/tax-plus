<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>课程一</h3>
        </div>
      </template>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="o in 4" :title="'视频' + o" :name="o">
            <div style="padding-bottom: 10px">
              <router-link :to="`/courseId/${courseId}/detail`">
                <el-link :underline="false">
                  <template #default> <el-tag class="ml-2" type="success">视频</el-tag> 0{{ o }}欢迎开发SaaS在线课程项目 </template>
                </el-link>
              </router-link>
            </div>
            <div>
              <el-link :underline="false"> <el-tag class="ml-2" type="info">课件</el-tag>0{{ o }}课件</el-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.box-card {
  width: 950px;
}
.row-bg {
  margin-top: 40px;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.progressAnnular {
  display: inline-block;
}
.progressAnnular .annularText {
  display: block;
  text-align: center;
  margin-top: 30px;
}
</style>