<template>
    <div>
        <el-container>
            <el-header>
                <TopNav></TopNav>
            </el-header>
            <el-container>
                <el-aside>
                    <LeftMenuStudentMsg></LeftMenuStudentMsg>
                </el-aside>
                <el-main class="main">
                    <h2 class="mall-title" style="text-align: left;">积分商城</h2>
                    <el-space direction="vertical" alignment="start" :size="30">
                        <el-space wrap size="large">
                            <el-card v-for="item in rewards" :key="item.reward_id" @click="" shadow="hover"
                                class="courseCard box-card">
                                <div>
                                    <el-image :src="item.reward_url" style="height: 150px;width: 100%;" />
                                </div>
                                <div class="text">
                                    <h3>{{ item.reward_name }}</h3>
                                    <p class="points">所需积分：
                                        <span style="color: #E6A23C;">{{ item.reward_price }}</span>
                                    </p>
                                    <el-button type="warning">兑换</el-button>
                                </div>
                            </el-card>
                        </el-space>
                    </el-space>
                </el-main>
            </el-container>
        </el-container>
        <SpecialIcon></SpecialIcon>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import LeftMenuStudentMsg from '../../components/LeftMenuStudentMsg.vue';
import SpecialIcon from '../../components/SpecialIcon.vue';
import TopNav from '../../components/TopNav.vue'

const rewards = ref([
    {
        reward_id: 1,
        reward_name: '拍立得',
        reward_price: 5000,
        reward_url: ''
    }, {
        reward_id: 2,
        reward_name: '电风扇',
        reward_price: 1000,
        reward_url: ''
    }, {
        reward_id: 3,
        reward_name: '相册',
        reward_price: 300,
        reward_url: ''
    }, {
        reward_id: 4,
        reward_name: '蓝牙耳机',
        reward_price: 1000,
        reward_url: ''
    }, {
        reward_id: 5,
        reward_name: '围巾',
        reward_price: 300,
        reward_url: ''
    }, {
        reward_id: 6,
        reward_name: '纪念徽章',
        reward_price: 500,
        reward_url: ''
    },
])
</script>

<style lang="scss" scoped>
/* 积分商城样式 */
h3 {
    margin: 0;
}

:deep(.el-card) {
    width: 250px;
    height: 290px;
    // margin-left: 10px;
    border-radius: 10px;
}

.mall-title {
    text-align: center;
    font-size: 24px;
    text-align: center;
    // margin-bottom: 20px;
}

.mall-card {
    width: 250px;
    text-align: center;
    margin-bottom: 20px;
}

.item-img {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e6e6e6;
}


// .text {
//     padding: 20px;
// }

.description {
    color: #666;
}
</style>
