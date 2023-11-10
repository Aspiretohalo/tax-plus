<template>
    <div>
        <el-card class="box-card user">
            <div class="userMsg items-center">
                <el-avatar class="mr-3" :size="46" :src="teacher.avatar" />
                <span class="text-large font-600 mr-3">{{ teacher.teacher_name }} </span>
                <el-tag>老师</el-tag>
            </div>
            <div class="newBtn items-center">
                <el-rate v-model="average_evaluation_stars" disabled show-score text-color="#ff9900"
                    score-template="平均 {value} 分" />
            </div>
        </el-card>
        <el-dialog v-model="dialogFormVisible" title="评分">
            <el-form :model="form">
                <div class="demo-rate-block">
                    <el-rate v-model="form.evaluation_stars" size="large" :colors="colors" />
                </div>
                <el-input class="comment" :rows="3" v-model="form.evaluation_text" type="textarea" placeholder="请输入评论" />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel()">取消</el-button>
                    <el-button type="primary" @click="handleAssure()"> 确认</el-button>
                </span>
            </template>
        </el-dialog>
        <el-card class="box-card notice">
            <template #header>
                <div class="card-header">
                    <h3>课程评价</h3>
                </div>
            </template>
            <div class="text item" v-for="item in evaluationData" :key="item.evaluation_id">
                <div class="commentLeft">
                    <el-avatar :size="32"> <el-avatar :size="36" :src="item.avatar" /></el-avatar>
                    <span style="display: inline-block; margin-left: 10px">{{ item.student_name }}</span>
                    <el-tag class="studentTag">学员</el-tag>
                    <el-rate v-model="item.evaluation_stars" disabled size="large" :colors="colors" />
                </div>
                <el-text class="mx-1 commentText" type="info">
                    {{ item.evaluation_text }}
                </el-text>
                <el-text class="releaseTime mx-1">2023/10/13 19:19:19</el-text>
            </div>
        </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import myAxios from '../../../plugins/myAxios'
import state from '../../../store/state'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.courseId)

const teacher: any = ref(JSON.parse(sessionStorage.getItem('teachers') || 'null') || '')
const average_evaluation_stars: any = ref(0)

onMounted(async () => {
    await getEvaluation(courseId.value)
    average_evaluation_stars.value = JSON.parse(sessionStorage.getItem('evaluations') || 'null')[0]?.average_stars || 0;
})

////////////////////获得评价
const getEvaluation = async (value: any) => {
    try {
        const response = await myAxios.get('/course/getEvaluation', {
            params: {
                course_id: value
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        });
        // 处理响应数据
        state.evaluations = response.data
        sessionStorage.setItem('evaluations', JSON.stringify(state.evaluations))
        const coursesString = sessionStorage.getItem('evaluations');
        if (coursesString) {
            evaluationData.value = JSON.parse(coursesString)
        }

    } catch (error) {
        console.error('获取公告信息失败', error);
    }
};
const evaluationData: any = ref()

///////////////////////////////新建评价
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

const dialogFormVisible = ref(false)
const handleCancel = () => {
    dialogFormVisible.value = false
    ElMessage({
        message: '已取消操作',
        type: 'warning',
    })
}
const handleAssure = async () => {
    console.log(form);
    try {
        const response = await myAxios.post('/course/setEvaluation', form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        ElMessage({
            message: '已发布评价',
            type: 'success',
        })
    } catch (error) {
        console.error('新建评价失败', error);
    }
    dialogFormVisible.value = false
    getEvaluation(courseId.value)
}
const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')

const form = reactive({
    evaluation_stars: Number,
    evaluation_text: '',
    course_id: route.params.courseId,
    evaluator: student.value.student_name,
})

</script>
  
<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
}

.box-card {
    position: relative;
    margin-top: 20px;
    width: 1100px;
    border-radius: 15px;

    .userMsg {
        display: inline-block;
        margin-left: 50px;
    }

    .newBtn {
        position: absolute;
        right: 30px;
        top: 35px;
        display: inline-block;
    }

    .commentLeft {
        margin-bottom: 10px;

        .studentTag {
            margin-right: 10px;
        }
    }

    .comment {
        display: block;
        width: 500px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .commentBtn {
        position: absolute;
        width: 100px;
        height: 60px;
        left: 160px;
        bottom: 20px;
    }
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

::v-deep {
    .el-card__body {
        padding-left: 0;
        padding-right: 0;
    }

    .el-dialog__body {
        padding-top: 0;
    }
}
</style>