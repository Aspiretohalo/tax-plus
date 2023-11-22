<template>
    <div>
        <el-card class="box-card notice" shadow="never">
            <template #header>
                <div class="card-header">
                    <h3>直播公告</h3>
                </div>
                <el-button type="warning" class="create" @click="dialogVisible = true">新建直播课</el-button>
                <el-dialog v-model="dialogVisible" title="直播课程内容" width="30%">
                    <el-form :model="form" :rules="rules" ref="ruleFormRef" :hide-required-asterisk="true">
                        <el-form-item label="直播课标题" prop="living_course_name">
                            <el-input v-model="form.living_course_name" style="width: 780px;" placeholder="请输入直播课标题" />
                        </el-form-item>
                        <el-form-item label="直播课时间" prop="start_time">
                            <el-date-picker v-model="form.start_time" type="datetime" placeholder="请选择时间"
                                format="YYYY/MM/DD HH:mm" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="createNewLiving()">
                                确定
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </template>
            <div class="text item" v-for="item in  LivingNotices ">
                <el-card class="Preview" shadow="none">
                    <!-- <div class="preview_name">{{ item.living_course_name }}</div> -->
                    <el-text class="releaseTime mx-1">{{ item.start_time }}</el-text>
                    <el-button v-if="item.living_course_description === undefined" type="warning"
                        @click="goToLivingModel(item.living_course_id, item.living_course_name)"
                        style="margin-left: 60px;">开始直播</el-button>
                    <el-text v-else type="" disabled style="margin-left: 70px;">回放已生成</el-text>
                </el-card>
                <div class="living-notice">
                    <h4>{{ item.living_course_name }}</h4>
                    <div class="link" v-if="item.living_course_description !== undefined">
                        前往直播间：<el-link type="warning">{{ item.meeting_id }}</el-link>
                    </div>
                    <div class="link" v-else>
                        直播尚未开始
                    </div>
                    <el-text class="mx-1" type="info">
                        {{ item.living_course_description }}
                    </el-text>
                </div>
            </div>
        </el-card>
    </div>
</template>
  

<script lang="ts" setup>
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { onMounted, ref, reactive } from 'vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

onMounted(async () => {
    await getLivingNotice(courseId.value)
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                // 发布课程，即将课程信息传给后端，存入数据库
                let obj = {
                    course_id: courseId.value,
                    living_course_name: form.living_course_name,
                    course_teacher: teacher.value.teacher_id,
                    start_time: form.start_time,
                }
                console.log(obj);
                // const response = await myAxios.post('http://localhost:8085/createNewLiving', JSON.stringify(obj), {
                const response = await myAxios.post('/createNewLiving', JSON.stringify(obj), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('传参失败', error);
            }
            dialogVisible.value = false
            ElMessage({
                message: '创建成功',
                type: 'success',
            })
            await getLivingNotice(courseId.value)
        } else {
            console.log('error submit!', fields)
        }
    })
}
const createNewLiving = async () => {
    await submitForm(ruleFormRef.value)
}
const dialogVisible = ref(false)
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
    living_course_name: [
        { required: true, message: '请输入文字', trigger: 'blur' },
    ],
})
const form = reactive({
    start_time: Date,
    living_course_name: ''
})
const getLivingNotice = async (value: any) => {
    try {
        const response = await myAxios.get('/getLivingNotice', {
            params: {
                course_id: value
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        });
        // 处理响应数据
        state.LivingNotices = response.data
        sessionStorage.setItem('LivingNotices', JSON.stringify(state.LivingNotices))
        const coursesString = sessionStorage.getItem('LivingNotices');
        if (coursesString) {
            LivingNotices.value = JSON.parse(coursesString)
            LivingNotices.value.forEach((item: any) => {
                item.start_time = moment(item.start_time).format('YYYY/MM/DD HH:mm')
            });
        }
    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
const LivingNotices: any = ref()
const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')

const goToLivingModel = (item1: number, item2: string) => {
    window.open(`http://localhost:3000?ifStudent=${0}&courseId=${courseId.value}&name=${teacher.value.teacher_name}&course_teacher=${teacher.value.teacher_id}&living_course_name=${item2}&living_course_id=${item1}`, '_blank');
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
    margin-top: 20px;
    width: 1100px;
    border-radius: 15px;
}

:deep(.el-dialog) {
    --el-dialog-border-radius: 15px;
    padding: 30px;
}

.welcomeCard {
    position: relative;
}

.welcome {
    margin-left: 50px;
}

.notice {
    position: relative;
    margin-top: 10px;

    .create {
        position: absolute;
        right: inherit;
        top: 20px;
        right: 50px;
    }
}

.text {
    border-bottom: 1px solid #e3e3e3;
    padding: 0 50px;
}

.item {
    position: relative;
    margin-bottom: 18px;
}

.Preview {

    width: 200px;
    margin-bottom: 30px;

    .preview_name {
        text-align: center;
    }

    .releaseTime {
        display: block;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }
}

.living-notice {
    position: absolute;
    left: 300px;
    top: 20px;
}

:deep(.el-card__body) {
    padding-left: 0;
    padding-right: 0;
}
</style>