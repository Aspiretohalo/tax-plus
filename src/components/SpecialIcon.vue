<template>
    <div>
        <ul class="social-icons">
            <li v-for="item in icons" :key="item.icon_class">
                <span @click="showDrawer(item.index)" style="cursor: pointer;">
                    <i :class="item.icon_class"></i>
                </span>
            </li>
        </ul>

        <el-drawer v-model="drawer1" title="课程偏好收集" direction="rtl" size="30%">
            <div class="amount" style="color:#E6A23C;">我们会根据您的偏好，来给您推荐最合适的课程</div>
            <div class="container">
                <el-form :model="form">
                    <ul class="ks-cboxtags">
                        <el-form-item>
                            <li v-for="item  in availableTime" :key="item">
                                <input type="checkbox" :id="item" value="Rainbow Dash">
                                <label :for="item">{{ item }}</label>
                            </li>
                        </el-form-item>
                    </ul>
                    <ul class="ks-cboxtags">
                        <el-form-item>
                            <li v-for="item  in taxClassification" :key="item">
                                <input type="checkbox" :id="item" value="Rainbow Dash">
                                <label :for="item">{{ item }}</label>
                            </li>
                        </el-form-item>
                    </ul>
                </el-form>
                <el-button type="primary" @click="handleClassify()" plain size="large"
                    style="margin-left: 150px;width: 100px;">
                    保存
                </el-button>
            </div>
        </el-drawer>

        <el-drawer v-model="drawer2" title="今日任务" direction="rtl" size="30%">
            <div class="amount">总积分: <span style="color:#E6A23C;">100</span></div>
            <el-card class="box-card" v-for="item in tasks" :key="item.task_id" shadow="never">
                <div id="checklist">
                    <input :id="item.task_id.toString()" type="checkbox" name="r" value="1" :checked="item.hasReceived"
                        disabled>
                    <label :for="item.task_id.toString()">{{ item.task_content }}</label>
                    <el-button v-if="!item.hasReceived" @click="handleReceived()" type="warning"
                        style="position: absolute; right: 20px;" :disabled="!item.hasDone">领取</el-button>
                    <span class="integration">
                        <img src="../assets/logo/金币.svg" alt="" style=" width: 24px;height: 24px;">
                        <span class="integration_number">+10</span>
                    </span>
                </div>

            </el-card>
        </el-drawer>

        <el-drawer v-model="drawer3" title="课程表" direction="rtl" size="30%">
            <Schedule></Schedule>
        </el-drawer>

        <el-drawer v-model="drawer4" title="智能助手——税小优 为您解答" direction="rtl" size="30%">
            <iframe src="http://localhost:1002" frameborder="0" width="100%" height="100%"
                allow="midi;encrypted-media;display-capture;clipboard-write;clipboard-read;"></iframe>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import Schedule from './Schedule.vue'
import { ref, reactive } from 'vue'
import { ElDrawer } from 'element-plus'
import myAxios from '../plugins/myAxios';
import { ElMessage } from 'element-plus'


const icons = [
    { index: 1, icon_class: 'fa fa-instagram' },
    { index: 2, icon_class: 'fa fa-instagram' },
    { index: 3, icon_class: 'fa fa-twitter' },
    { index: 4, icon_class: 'fa fa-linkedin' },
]
const tasks = [
    {
        task_id: 1,
        task_content: '登录平台',
        hasDone: true,
        hasReceived: true,
    },
    {
        task_id: 2,
        task_content: '有效观看课程时长达到30min',
        hasDone: true,
        hasReceived: false,
    },
    {
        task_id: 3,
        task_content: '完成每日财税知识小问答',
        hasDone: false,
        hasReceived: false,
    }
]
const availableTime = ['9:00-11:00', '13:00-15:00', '17:30-19:30', '20:30-22:30']
const taxClassification = ['纳税义务人', '计税方法', '免税额', '税率表', '扣缴义务人', '申报纳税', '税务减免', '个税优惠政策', '个税申报流程', '一般纳税人', '小规模纳税人', '税率', '进项税抵扣', '出口退税', '增值税发票', '跨境服务税收政策', '增值税优惠政策', '国内税收制度', '跨境税收政策', '对外税务合作', '税收征管', '地方税种类', '地方税政策', '地方税收征管'
    , '合规管理制度', '风险评估', '内部控制', '税务稽查', '违法处罚', '税务纠纷解决', '税务风险防范', '税务合规培训', '资产负债表', '利润表', '现金流量表', '财务比率分析', '财务报表解读', '财务预测', '财务报告编制', '会计准则遵循',
    '个人税务筹划', '企业税务筹划', '跨境税务筹划', '税务优惠政策利用']
// const hasReceived = ref(false)
const form = reactive({
    classification: ''
})
const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')

const handleClassify = async () => {

    const checkedItems1 = availableTime.filter(item => (document.getElementById(item)! as HTMLInputElement).checked);
    const checkedItems = taxClassification.filter(item => (document.getElementById(item)! as HTMLInputElement).checked);
    try {
        // 发布课程，即将课程信息传给后端，存入数据库
        let obj = {
            student_id: student.value.student_id,
            course_intendencies: JSON.stringify(checkedItems),
            available_time: JSON.stringify(checkedItems1)
        }
        console.log(obj);
        const response = await myAxios.post('/setCourseIntendencies', JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        ElMessage({
            message: '保存成功',
            type: 'success',
        })
        console.log(response);
    } catch (error) {
        console.error('新建课程失败', error);
    }
}
const handleReceived = () => {
    console.log('已领取');


}
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const drawer4 = ref(false)

const showDrawer = (index: number) => {
    if (index === 1) {
        drawer1.value = true
    } else if (index === 2) {
        drawer2.value = true
    } else if (index === 3) {
        drawer3.value = true
    } else if (index === 4) {
        drawer4.value = true
    }
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
    border-radius: 15px;

    :deep(.el-card__body) {
        padding: 0;
    }

    .integration {
        position: relative;
        margin-left: 30px;
        margin-top: 10px;

        img {
            position: absolute;
            z-index: 10;

        }

        .integration_number {
            background-color: #faecd8;
            padding-left: 4px;
            padding-right: 3px;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            font-size: 14px;
            color: #E6A23C;
            position: absolute;
            left: 20px;
            top: 2px;
            z-index: 9;
        }
    }
}


@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css);

$timing : 265ms;
$grape : #86A8E7;
$orchid : #7F7FD5;
$iconColor : #667db6;
$accent : #0082c8;


@mixin transformScale($size: 1) {
    transform: scale($size);
    -ms-transform: scale($size);
    -webkit-transform: scale($size);
}

body {
    background-color: rgba($iconColor, 0.05);

}

.social-icons {
    position: fixed;
    right: 15px;
    bottom: 80px;
    padding: 0;
    list-style: none;
    margin: 1em;
    margin-right: 0;
    width: 70px;

    li {
        display: inline-block;
        margin: 0.15em;
        position: relative;
        font-size: 1.2em;

    }

    i {
        color: #fff;
        position: absolute;
        top: 21px;
        left: 21px;
        transition: all $timing ease-out;
    }

    span {
        display: inline-block;

        &:before {
            @include transformScale();
            content: " ";
            width: 60px;
            height: 60px;
            border-radius: 100%;
            display: block;
            background: linear-gradient(45deg, $iconColor, $accent);
            transition: all $timing ease-out;
        }

        &:hover:before {
            transform: scale(0);
            transition: all $timing ease-in;
        }

        &:hover i {
            @include transformScale(2.2);
            color: $iconColor;
            background: -webkit-linear-gradient(45deg, $iconColor, $accent);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all $timing ease-in;
        }
    }

    span.social-square {

        &:before {
            background: linear-gradient(45deg, $grape, $orchid);
            border-radius: 10%;
        }

        &:hover:before {
            transform: rotate(-180deg);
            -ms-transform: rotate(-180deg);
            -webkit-transform: scale(-180deg);
            border-radius: 100%;
        }

        &:hover i {
            @include transformScale(1.6);
            color: #fff;
            transform: scale(1.6);
            -webkit-text-fill-color: #fff;
        }
    }
}

//////////////////////////////////////////////////////////////////////// 任务多选框
#checklist {
    --background: #ffffff;
    --text: #414856;
    --check: #4F29F0;
    --disabled: #C3C8DE;
    // --width: 100px;
    // --height: 140px;
    --border-radius: 10px;
    background: var(--background);
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    position: relative;
    box-shadow: 0 10px 30px rgba(#414856, 0.05);
    padding: 30px 45px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;

    label {
        color: var(--text);
        position: relative;
        cursor: pointer;
        display: grid;
        align-items: center;
        width: fit-content;
        transition: color .3s ease;

        &::before,
        &::after {
            content: "";
            position: absolute;
        }

        &::before {
            height: 2px;
            width: 8px;
            left: -27px;
            background: var(--check);
            border-radius: 2px;
            transition: background .3s ease;
        }

        &:after {
            height: 4px;
            width: 4px;
            top: 8px;
            left: -25px;
            border-radius: 50%;
        }
    }

    input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        height: 15px;
        width: 15px;
        outline: none;
        border: 0;
        margin: 0 15px 0 0;
        cursor: pointer;
        background: var(--background);
        display: grid;
        align-items: center;

        &::before,
        &::after {
            content: "";
            position: absolute;
            height: 2px;
            top: auto;
            background: var(--check);
            border-radius: 2px;
        }

        &::before {
            width: 0px;
            right: 60%;
            transform-origin: right bottom;
        }

        &::after {
            width: 0px;
            left: 40%;
            transform-origin: left bottom;
        }

        &:checked {
            &::before {
                animation: check-01 .4s ease forwards;
            }

            &::after {
                animation: check-02 .4s ease forwards;
            }

            +label {
                color: var(--disabled);
                animation: move .3s ease .1s forwards;

                &::before {
                    background: var(--disabled);
                    animation: slice .4s ease forwards;
                }

                &::after {
                    animation: firework .5s ease forwards .1s;
                }
            }
        }
    }
}

@keyframes move {
    50% {
        padding-left: 8px;
        padding-right: 0px;
    }

    100% {
        padding-right: 4px;
    }
}

@keyframes slice {
    60% {
        width: 100%;
        left: 4px;
    }

    100% {
        width: 100%;
        left: -2px;
        padding-left: 0;
    }
}

@keyframes check-01 {
    0% {
        width: 4px;
        top: auto;
        transform: rotate(0);
    }

    50% {
        width: 0px;
        top: auto;
        transform: rotate(0);
    }

    51% {
        width: 0px;
        top: 8px;
        transform: rotate(45deg);
    }

    100% {
        width: 5px;
        top: 8px;
        transform: rotate(45deg);
    }
}

@keyframes check-02 {
    0% {
        width: 4px;
        top: auto;
        transform: rotate(0);
    }

    50% {
        width: 0px;
        top: auto;
        transform: rotate(0);
    }

    51% {
        width: 0px;
        top: 8px;
        transform: rotate(-45deg);
    }

    100% {
        width: 10px;
        top: 8px;
        transform: rotate(-45deg);
    }
}

@keyframes firework {
    0% {
        opacity: 1;
        box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
    }

    30% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
    }
}


//--- ## BASIC #############
body {
    background: #E8EBF3;
    height: 100vh;
    font: 400 16px 'Varela Round', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .socials {
        position: fixed;
        display: block;
        left: 20px;
        bottom: 20px;

        >a {
            display: block;
            width: 30px;
            opacity: .2;
            transform: scale(var(--scale, .8));
            transition: transform .3s cubic-bezier(0.38, -0.12, 0.24, 1.91);

            &:hover {
                --scale: 1;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////// 习惯收集
.container {
    max-width: 640px;
    font-family: 'Segoe UI',
        Tahoma,
        Geneva,
        Verdana,
        sans-serif;
    font-size: 13px;
}

ul.ks-cboxtags {
    list-style: none;
    padding: 20px;
}

ul.ks-cboxtags li {
    display: inline;
}

ul.ks-cboxtags li label {
    display: inline-block;
    background-color: rgba(255, 255, 255, .9);
    border: 2px solid rgba(139, 139, 139, .3);
    color: #adadad;
    border-radius: 25px;
    white-space: nowrap;
    margin: 3px 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s;
}

ul.ks-cboxtags li label {
    padding: 8px 12px;
    cursor: pointer;
}

ul.ks-cboxtags li label::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 12px;
    padding: 2px 6px 2px 2px;
    // content: "\f067";
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked+label::before {
    // content: "\f00c";
    transform: rotate(-360deg);
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked+label {
    border: 2px solid #1bdbf8;
    background-color: #12bbd4;
    color: #fff;
    transition: all .2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
    display: absolute;
}

ul.ks-cboxtags li input[type="checkbox"] {
    position: absolute;
    opacity: 0;
}

ul.ks-cboxtags li input[type="checkbox"]:focus+label {
    border: 2px solid #e9a1ff;
}
</style>