<template>
    <div>
        <el-container>
            <el-aside>
                <LeftMenu></LeftMenu>
            </el-aside>
            <el-main>
                <el-card class="box-card">
                    <div aria-label="A complete example of page header">
                    <el-page-header @back="onBack">
                        <template #breadcrumb>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: './course' }">
                                    在线课程及回放
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>科目1</el-breadcrumb-item>
                            </el-breadcrumb>
                        </template>
                        <template #content>
                            <div class="flex items-center">
                                <el-avatar class="mr-3" :size="32"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <span class="text-large font-600 mr-3"> 李</span>
                                <el-tag>学生</el-tag>
                            </div>
                        </template>
                        
                    </el-page-header>
                </div>

                </el-card>
                
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import LeftMenu from '../../../components/LeftMenu.vue'
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
    //这边写back的跳转链接
    notify('Back')
}
</script>
  
<style  scoped>
div {
    display: inline-block;
}

.box-card {
  width: 950px;
  margin-left: 5%;
}
</style>