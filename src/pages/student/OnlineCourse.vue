<template>
  <div>
    <el-container>
      <el-header>
        <TopNav></TopNav>
      </el-header>
      <el-container>
        <el-aside>
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main class="main">
          <CourseCard></CourseCard>
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
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import TopNav from '../../components/TopNav.vue'
import LeftMenu from '../../components/LeftMenu.vue'
import CourseCard from '../../components/CourseCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSchedule = () => {
  router.push('/schedule')
}

</script>

<style  scoped>
div {
  display: inline-block;
}

.main {
  padding-top: 0;
}

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
</style>