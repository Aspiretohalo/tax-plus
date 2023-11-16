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
                    <h2 class="mall-title">积分商城</h2>
                    <el-row>
                        <el-col :span="8">
                            <el-card class="mall-card" shadow="never">
                                <div class="item-img">
                                    <img src="商品1图片链接" />
                                </div>
                                <div class="text">
                                    <h3>商品1</h3>
                                    <p class="description">商品1描述</p>
                                    <p class="points">所需积分：100</p>
                                    <el-button type="primary">兑换</el-button>
                                </div>
                            </el-card>
                        </el-col>

                        <!-- 可以继续添加其他商品的 el-col -->
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
        <SpecialIcon></SpecialIcon>
    </div>
</template>
<script lang="ts" setup>
import LeftMenuStudentMsg from '../../components/LeftMenuStudentMsg.vue';
import SpecialIcon from '../../components/SpecialIcon.vue';
import TopNav from '../../components/TopNav.vue'
</script>

<style lang="scss" scoped>
/* 积分商城样式 */
.mall-title {
    text-align: center;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
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

.item-img img {
    max-height: 100%;
    max-width: 100%;
}

.text {
    padding: 20px;
}

.description {
    color: #666;
}

.points {
    font-weight: bold;
    color: #ff6f61;
}
</style>
