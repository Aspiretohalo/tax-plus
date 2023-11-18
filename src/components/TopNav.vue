<template>
    <div class="topNav">
        <div class="logo">
            <img src="https://tax-plus-coursecover-1317662942.cos.ap-shanghai.myqcloud.com/logo/%E6%96%B9%E6%A1%882.png"
                @click="role == 'student' ? $router.push('/') : null"
                style="height: 60px; margin-top: 12px; cursor: pointer;">
        </div>
        <div class="userMsg">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar @click="checkMsg()" :src="user.avatar" :size="50" class="avatar" style="cursor: pointer;">
                    </el-avatar>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="checkMsg()">我的主页</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <h4 class="name">{{ role === 'student' ? user.student_name : user.teacher_name }}</h4>
            <el-tag class="mx-1 role">{{ role === 'student' ? '学员' : '老师' }}</el-tag>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const role = ref(sessionStorage.getItem('role'))
// 获得到学生/老师数据之后，判断哪个是要用的
// 在登录成功时直接写到session中
const user = ref(role.value === 'student' ? (JSON.parse(sessionStorage.getItem('students') || 'null') || '') : (JSON.parse(sessionStorage.getItem('teachers') || 'null') || ''))
const msgRouter = ref(role.value === 'student' ? '/studentMsg' : '/teacherMsg')

const checkMsg = () => {
    router.push(msgRouter.value)
}

const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/loginStudent')
}

</script>

<style lang="scss" scoped>
.topNav {
    position: fixed;
    display: block;
    z-index: 100;
    background-color: #fff;
    // width: 1920px;
    height: 76px;
    width: 100%;

    .logo {
        // display: inline-block;
        position: absolute;
        left: 40px;
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

.el-dropdown-link,
.el-tooltip__trigger,
.el-tooltip__trigger:focus-visible {
    outline: none;
}
</style>