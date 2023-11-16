<template>
    <div>
        <el-card class="box-card notice" shadow="never">
            <template #header>
                <div class="card-header">
                    <h3>公告</h3>
                </div>
                <div class="newBtn items-center">
                    <el-button type="primary" @click="dialogFormVisible = true">新建公告</el-button>
                    <el-dialog v-model="dialogFormVisible" title="新建公告">
                        <el-form :model="form" :rules="rules" ref="ruleFormRef" :hide-required-asterisk="true">
                            <el-form-item label="公告标题" prop="notice_title">
                                <el-input v-model="form.notice_title" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="公告内容" prop="notice_text">
                                <el-input v-model="form.notice_text" autocomplete="off" type="textarea" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="handleCancel()">取消</el-button>
                                <el-button type="primary" @click="handleAssure()"> 确认</el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
            </template>
            <div class="text item" v-for="notice in noticeData">
                <h4>{{ notice.notice_title }}</h4>
                <el-text class="mx-1" type="info">
                    {{ notice.notice_text }}
                </el-text>
                <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

onMounted(async () => {
    await getNotice(courseId.value)
})

const dialogFormVisible = ref(false)

const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')
const form = reactive({
    notice_title: '',
    notice_text: '',
    course_id: route.params.courseId,
    announcer: teacher.value.teacher_id,
    notice_time: new Date()
})
const handleCancel = () => {
    dialogFormVisible.value = false
    ElMessage({
        message: '已取消操作',
        type: 'warning',
    })
}
const handleAssure = async () => {
    await submitForm(ruleFormRef.value)

}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                const response = await myAxios.post('/course/setNotice', JSON.stringify(form), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
            } catch (error) {
                console.error('新建公告失败', error);
            }
            dialogFormVisible.value = false
            ElMessage({
                message: '已发布公告',
                type: 'success',
            })
            getNotice(courseId.value)
        } else {
            console.log('error submit!', fields)
        }
    })
}


const getNotice = async (value: any) => {
    try {
        const response = await myAxios.get('/course/getNotice', {
            params: {
                course_id: value
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        });
        // 处理响应数据
        state.notices = response.data
        sessionStorage.setItem('notices', JSON.stringify(state.notices))
        const coursesString = sessionStorage.getItem('notices');
        if (coursesString) {
            noticeData.value = JSON.parse(coursesString)
        }

    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
const noticeData: any = ref()
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
    notice_title: [
        { required: true, message: '请输入公告标题', trigger: 'blur' },
    ],
    notice_text: [
        { required: true, message: '请输入公告正文', trigger: 'blur' },
    ],
})
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

:deep(.el-dialog) {
    padding: 10px 25px;
    border-radius: 15px;
}

.box-card {
    position: relative;
    margin-top: 20px;
    width: 1100px;
    border-radius: 15px;

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

:deep(.el-card__body) {
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