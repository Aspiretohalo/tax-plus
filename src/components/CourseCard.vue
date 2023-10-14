<template>
  <div class="home">
    <div class="search">
      <el-select v-model="value" class="m-2" placeholder="筛选" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="input3" placeholder="请输入课程名称、教师等" class="input-with-select">
        <template #prefix>
          <el-button :icon="Search" style="border: 0" />
        </template>
      </el-input>
    </div>

    <el-space direction="vertical" alignment="start" :size="30">
      <el-space wrap :size="size">
        <el-card v-for="i in 2" :key="i" class="courseCard box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>彭于晏</span>
            </div>
          </template>
          <div class="pic">
            <el-image src="src/assets/imgs/TIM图片20200413151955.jpg" />
          </div>
        </el-card>
      </el-space>
      <el-space wrap :size="size">
        <el-card v-for="i in 2" :key="i" class="courseCard box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>白敬亭</span>
            </div>
          </template>
          <div class="pic">
            <el-image src="src/assets/imgs/TIM图片20200413151955.jpg" />
          </div>
        </el-card>
      </el-space>
      <el-space wrap :size="size">
        <el-card v-for="i in 2" :key="i" class="courseCard box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>白敬亭</span>
            </div>
          </template>
          <div class="pic">
            <el-image src="src/assets/imgs/TIM图片20200413151955.jpg" />
          </div>
        </el-card>
      </el-space>
    </el-space>
  </div>
</template>


<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const size = ref('large')
const value = ref('')
const input3 = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.home {
  /* margin-left: 15px; */
  margin-top: 20px;
}
.input-with-select {
  display: inline;
  /* position: absolute; */
  margin-left: 520px;
}
.search {
  margin-bottom: 30px;
}
::v-deep .el-input__wrapper {
  width: 300px;
  height: 40px;
}
::v-deep .el-select {
  position: absolute;
  display: inline-block;
  margin-left: 10px;
  /* margin-bottom: 20px; */
  width: 150px;
}
::v-deep .el-card {
  width: 400px;
  height: 300px;
  margin-left: 10px;
  border-radius: 10px;
}
.courseCard {
  cursor: pointer;
}
::v-deep .el-card__body {
  padding: 0;
}
.pic {
  width: 550px;
  height: 100px;
}
</style>
