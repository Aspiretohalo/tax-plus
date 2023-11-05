<template>
    <div class="topNav">
        <div class="logo">
            <h1>税学佳</h1>
        </div>
        <div class="userMsg">
            <el-avatar class="avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-avatar>
            <h4 class="name">{{ 666 }}</h4>
            <el-tag class="mx-1 role">Large</el-tag>
        </div>

    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.topNav {
    position: fixed;
    display: block;
    z-index: 100;
    background-color: #fff;
    // width: 1920px;
    height: 60px;
    width: 100%;

    .logo {
        // display: inline-block;
        position: absolute;
        left: 80px;
    }

    .userMsg {
        position: absolute;
        right: 50px;
        display: flex;

        .avatar {
            display: inline-block;
            margin-right: 20px;
            margin-top: 10px;
        }

        .name {
            display: inline-block;
            margin-right: 20px;
            margin-top: 25px;
        }

        .role {
            // display: inline-block;
            margin-right: 10px;
            margin-top: 20px;
        }
    }
}
</style>