<template>
    <div>
        <el-container>
            <el-header>
                <TopNav></TopNav>
            </el-header>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
        <SpecialIcon></SpecialIcon>
    </div>
</template>

<script lang="ts" setup>
import SpecialIcon from '../../components/SpecialIcon.vue';
import TopNav from '../../components/TopNav.vue'

</script>

<style lang="scss" scoped></style>