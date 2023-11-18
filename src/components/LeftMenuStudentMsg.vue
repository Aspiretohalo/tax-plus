<template>
    <div class="leftCard">
        <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item :index="item.router" class="el-menu-item" v-for="item in menuDemo2">
                <el-icon class="icon">
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </el-menu>

    </div>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'

const menuDemo2 = reactive([
    { name: '个人信息', index: 1, icon: 'User', router: '/studentMsg' },
    // { name: '评论区', index: 3, icon: 'ChatDotRound', router: '/personalCommunityStudent' },
    { name: '积分商城', index: 5, icon: 'Medal', router: '/integrationStore' },
    { name: '返回主页', index: 4, icon: 'House', router: '/myLearning' }
])

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>
  
<style scoped>
.demo-type {
    display: flex;
}

.demo-type>div {
    flex: 1;
    text-align: center;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.leftCard {
    position: fixed;
    background-color: #f9f9f9;
    height: 100%;
}

.el-menu-vertical-demo {
    width: 258px;
}

.el-menu-item span {
    padding-left: 0px;
}

.el-menu-item .icon {
    margin-left: 20px;
}

.name {

    padding-top: 35px;
    padding-bottom: 35px;
    text-align: center;
}

:deep(.el-menu) {
    /* margin-top: 100px; */
    border-right: 0;
    background-color: #f9f9f9;
}

:deep(.el-card) {
    position: absolute;
    bottom: 50px;
    left: 20px;
    width: 160px;
    height: 211px;
    border-radius: 10px;
}
</style>