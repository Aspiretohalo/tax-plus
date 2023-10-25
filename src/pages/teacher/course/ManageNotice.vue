<template>
    <div>
        <el-card class="box-card notice">
            <template #header>
                <div class="card-header">
                    <h3>公告</h3>
                </div>
                <div class="newBtn items-center">
                    <el-button type="primary" @click="dialogFormVisible = true">新建公告</el-button>
                    <el-dialog v-model="dialogFormVisible" title="新建公告">
                        <el-form :model="form">
                            <el-form-item label="公告标题" :label-width="formLabelWidth">
                                <el-input v-model="form.notice_title" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="公告内容" :label-width="formLabelWidth">
                                <el-input v-model="form.notice_text" autocomplete="off" type="textarea" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">
                                    确认
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
            </template>
            <div class="text item">
                <h4>课程结束通知</h4>
                <el-text class="mx-1" type="info">
                    最后一次课通知： 1.考试作品平台和钉钉群文件夹截止时间：今晚8点截止 2.明晚之前完成平台所有视频学习，发帖和完善笔记内容，记得给老师进行评价哈
                    3.非常感谢这段时间以来大家的配合和支持。愿大家学有所成！
                </el-text>
                <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
            </div>
            <div class="text item">
                <h4>课程开课通知</h4>
                <el-text class="mx-1" type="info">
                    最后一次课通知： 1.考试作品平台和钉钉群文件夹截止时间：今晚8点截止 2.明晚之前完成平台所有视频学习，发帖和完善笔记内容，记得给老师进行评价哈
                    3.非常感谢这段时间以来大家的配合和支持。愿大家学有所成！
                </el-text>
                <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
            </div>
        </el-card>
        <el-dialog v-model="dialogFormVisible" title="新建公告">

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel()">取消</el-button>
                    <el-button type="primary" @click="handleAssure()"> 确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    notice_title: '',
    notice_text: '',

    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const handleCancel = () => {
    dialogFormVisible.value = false
    ElMessage({
        message: '已取消操作',
        type: 'warning',
    })
}
const handleAssure = () => {
    dialogFormVisible.value = false
    ElMessage({
        message: '已发布评价',
        type: 'success',
    })
}
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
}

.box-card {
    position: relative;
    width: 950px;

    .newBtn {
        position: absolute;
        right: 30px;
        top: 25px;
        display: inline-block;
    }
}

.welcomeCard {
    position: relative;
}

.welcome {
    margin-left: 50px;
}

.goOnLearning {
    position: absolute;
    right: 50px;
    top: 15px;
}

.notice {
    margin-top: 10px;
}

.text {
    border-bottom: 1px solid #e3e3e3;
    padding: 0 50px;
}

.item {
    margin-bottom: 18px;
}

.releaseTime {
    display: block;
    text-align: right;
    margin-top: 10px;
    margin-bottom: 20px;
}

::v-deep .el-card__body {
    padding-left: 0;
    padding-right: 0;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>