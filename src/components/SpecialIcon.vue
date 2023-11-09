<template>
    <div>
        <ul class="social-icons">
            <li v-for="item in icons" :key="item.icon_class">
                <span @click="showDrawer(item.index)" style="cursor: pointer;">
                    <i :class="item.icon_class"></i>
                </span>
            </li>
        </ul>
        <el-drawer v-model="drawer1" title="今日任务" direction="rtl" size="30%">
            <el-card class="box-card" v-for="item in tasks" :key="item.task_id">
                <div id="checklist">
                    <input :id="item.task_id.toString()" type="checkbox" name="r" value="1" :checked="item.hasReceived"
                        disabled>
                    <label :for="item.task_id.toString()">{{ item.task_content }}</label>
                    <el-button v-if="!item.hasReceived" @click="handleReceived()" type="warning"
                        style="position: absolute; right: 20px;" :disabled="!item.hasDone">领取</el-button>
                </div>
            </el-card>
        </el-drawer>
        <el-drawer v-model="drawer2" title="课程表" direction="rtl" size="30%">

        </el-drawer>
        <el-drawer v-model="drawer3" title="AI助手" direction="rtl" size="30%">

        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDrawer } from 'element-plus'

const icons = [
    { index: 1, icon_class: 'fa fa-instagram' },
    { index: 2, icon_class: 'fa fa-twitter' },
    { index: 3, icon_class: 'fa fa-linkedin' },
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
// const hasReceived = ref(false)

const handleReceived = () => {
    console.log('已领取');

}
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const showDrawer = (index: number) => {
    if (index === 1) {
        drawer1.value = true
    } else if (index === 2) {
        drawer2.value = true
    } else if (index === 3) {
        drawer3.value = true
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
}


@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css);

$timing : 265ms;
$iconColor : #ff003c;
$accent : #c648c8;
$grape : #7b00e0;
$orchid : #ae31d9;

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
</style>