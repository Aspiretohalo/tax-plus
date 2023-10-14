<template>
  <div>
    <el-container>
      <el-aside>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main class="main">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="全部课程" name="first"></el-tab-pane>
          <el-tab-pane v-for="item in courseStatus" :label="item.name" :name="item.status" :key="item.status"> </el-tab-pane>
        </el-tabs>
        <el-table class="table" :data="courseData" :show-header="false">
          <el-table-column prop="courseURL" label="courseURL" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-image :src="scope.row.courseURL" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="courseName" width="180" />
          <el-table-column prop="teacherName" label="teacherName" />
          <el-table-column prop="status" label="status">
            <template #default="scope">
              <el-tag :type="scope.row.tagType" size="large" disable-transitions>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="courseId" label="teacherName">
            <template #default="scope">
              <el-button type="primary" @click="EnterTheCourse(scope.row.courseId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-card class="tools box-card">
          <div class="tool" @click="goToSchedule()">
            <el-icon class="icon" size="36px">
              <Edit />
            </el-icon>
            <span>个性课表</span>
          </div>
          <div class="tool">
            <el-icon class="icon" size="36px">
              <Search />
            </el-icon>
            <span>我的证书</span>
          </div>
          <div class="tool">
            <el-icon class="icon" size="36px">
              <Star />
            </el-icon>
            <span>选课记录</span>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../components/LeftMenu.vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const goToSchedule = () => {
  router.push('/schedule')
}

const EnterTheCourse = (courseId: Number) => {
  router.push(`/courseId/${courseId}/notice`)
}
const courseStatus = reactive([
  {
    status: 'Ongoing',
    name: '进行中',
  },
  {
    status: 'Completed',
    name: '已完成',
  },
  {
    status: 'Coming',
    name: '即将开始',
  },
])

const courseData = reactive([
  {
    courseId: 1,
    courseName: '课程一',
    teacherName: 'cy',
    courseURL: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: '进行中',
    tagType: 'success',
  },
  {
    courseId: 2,
    courseName: '课程二',
    teacherName: 'zbh',
    courseURL: 'src/assets/imgs/TIM图片20200413151955.jpg',
    status: '即将开始',
    tagType: 'info',
  },
  {
    courseId: 3,
    courseName: '课程三',
    teacherName: 'zjt',
    courseURL: 'src/assets/imgs/TIM图片20200413151955.jpg',
    status: '即将开始',
    tagType: 'info',
  },
  {
    courseId: 4,
    courseName: '课程四',
    teacherName: 'lyd',
    courseURL: 'src/assets/imgs/TIM图片20200413151955.jpg',
    status: '已完成',
    tagType: 'danger',
  },
  {
    courseId: 5,
    courseName: '课程五',
    teacherName: 'zrx',
    courseURL: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: '进行中',
    tagType: 'success',
  },
  {
    courseId: 7,
    courseName: '课程一',
    teacherName: 'cy',
    courseURL: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: '进行中',
    tagType: 'success',
  },
  {
    courseId: 8,
    courseName: '课程一',
    teacherName: 'cy',
    courseURL: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: '进行中',
    tagType: 'success',
  },
])
</script>

<style  scoped>
.tools {
  position: absolute;
  right: 15px;
  top: 80px;
  width: 300px;
  border-radius: 10px;
}
.tool {
  display: inline-block;
  margin: auto 2px;
  cursor: pointer;
  width: 80px;
  text-align: center;
}
.icon {
  display: block;
  margin: 0 auto;
}
.table {
  position: absolute;
  top: 80px;
  width: 60%;
  border-radius: 10px;
}
.demo-tabs {
  position: absolute;
}
div {
  display: inline-block;
}
::v-deep .el-aside {
  width: 258px;
}
</style>