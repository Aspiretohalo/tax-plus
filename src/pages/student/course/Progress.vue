<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>授课教师：{{ singleCourse[0]?.teacher_name }}</h3>
        </div>
      </template>
      <div class="annular">
        <el-row class="row-bg" justify="space-evenly">
          <div class="progressAnnular">
            <div id="echarts-chart" style="width: 700px; height: 500px"></div>
          </div>
          <!-- <div class="progressAnnular">
            <div id="echarts-chart2" style="width: 599px; height: 400px"></div>
          </div> -->
        </el-row>
      </div>
      <h4>学习统计</h4>
      <div class="progress-item el-row">
        <div class="el-row">
          <div class="statistics-item el-col el-col-12">
            <div class="el-row">
              <div class="el-col el-col-8">已观看视频：</div>
              <div class="spaceil el-col el-col-16">{{ (CourseLearningProgress / 60).toFixed(2) }}小时</div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-8">已发表讨论：</div>
              <div class="spaceil el-col el-col-16">{{ DiscussionNumber + SubDiscussionNumber }}条</div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-8">已发表评价：</div>
              <div class="spaceil el-col el-col-16">{{ EvaluationNumber }}条</div>
            </div>
          </div>
          <div class="statistics-item el-col el-col-12">
            <div class="el-row">
              <div class="el-col el-col-8">学习专注度：</div>
              <div class="spaceil el-col el-col-16">{{ confirmationTime < 10 ? '优秀' : confirmationTime >= 10 &&
                confirmationTime <= 30 ? '良好' : '不够专注' }}</div>
              </div>
              <div class="el-row">
                <div class="el-col el-col-8">课程成绩：</div>
                <div class="spaceil el-col el-col-16">{{ ((CourseLearningProgress) * 0.060 + ((DiscussionNumber
                  + SubDiscussionNumber)) * 0.20 + Math.ceil((EvaluationNumber)) * 0.20).toFixed(1) }}分</div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
    </el-card>
    <SpecialIcon></SpecialIcon>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, onBeforeMount } from "vue";
import myAxios from "../../../plugins/myAxios";
import state from '../../../store/state'
import { useRoute } from "vue-router";
import SpecialIcon from "../../../components/SpecialIcon.vue";

const route = useRoute();
const courseId = route.params.courseId;
const chartDom: any = ref(null);
let myChart: any;

// const chartDom2: any = ref(null);
// let myChart2: any;
onBeforeMount(async () => {
  await getCourseLearningProgress();
  await getEvaluationNumber();
  await getDiscussionNumber();
  await getSubDiscussionNumber();
})
onMounted(async () => {

  const instance = getCurrentInstance();
  if (instance && instance.appContext.config.globalProperties) {
    const { $echarts } = instance.appContext.config.globalProperties;

    chartDom.value = document.getElementById("echarts-chart");
    myChart = $echarts.init(chartDom.value)
    // 转到getSubDiscussionNumber执行完后初始化
    // updateECharts();

    // chartDom2.value = document.getElementById("echarts-chart2");
    // myChart2 = $echarts.init(chartDom2.value);
    // updateECharts2();
  }
});

// const updateECharts2 = () => {
//   const option2 = {
//     title: {
//       text: "学习进度", // Add your desired title here
//       left: "center", // Adjust the position if needed
//       textStyle: {
//         fontSize: 24, // Adjust the font size if needed
//         fontWeight: "bold", // Adjust the font weight if needed
//       },
//     },
//     series: [
//       {
//         name: "学习进度",
//         type: "pie",
//         radius: ["30%", "60%"],
//         avoidLabelOverlap: false,
//         label: {
//           show: false,
//           position: "center",
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: 40,
//             fontWeight: "bold",
//           },
//         },
//         labelLine: {
//           show: false,
//         },
//         data: [
//           { value: 60, name: "已学习", itemStyle: { color: "#79BBFF" } }, // 蓝色
//           { value: 40, name: "未学习", itemStyle: { color: "#ecf0f1" } }, // 白色
//         ],
//       },
//     ],
//   };

//   option2 && myChart2.setOption(option2);
// };
const singleCourse: any = ref(JSON.parse(sessionStorage.getItem('singleCourse') || 'null') || '')
const student: any = ref(JSON.parse(sessionStorage.getItem('students') || 'null') || '')
const CourseLearningProgress: any = ref()
const EvaluationNumber: any = ref()
const DiscussionNumber: any = ref()
const SubDiscussionNumber: any = ref()
const confirmationTime: any = ref()
const updateECharts = () => {
  const option = {
    title: {
      text: "课程分数占比",
      subtext: "按百分比%",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "详细数据",
        type: "pie",
        radius: "50%",
        data: [
          {
            // 假定课程总时长为100
            value: ((CourseLearningProgress.value) * 0.060).toFixed(1), name: "已观看视频"
          },
          {
            // 假定讨论20条为满分///////////////////////////////////////////修改数据
            value: (((DiscussionNumber.value + SubDiscussionNumber.value)) * 5).toFixed(1), name: "已发表讨论"
          },
          {
            // 假定评论20条记为满分////////////////////////修改数据
            value: (Math.ceil((EvaluationNumber.value)) * 10).toFixed(1), name: "已发表评价"
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
};

const getCourseLearningProgress = async () => {
  try {
    const response = await myAxios.get('/getCourseLearningProgress', {
      params: {
        course_id: courseId,
        student_id: student.value.student_id,
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.CourseLearningProgress = response.data
    sessionStorage.setItem('CourseLearningProgress', JSON.stringify(state.CourseLearningProgress))
    const coursesString = sessionStorage.getItem('CourseLearningProgress');
    if (coursesString) {
      CourseLearningProgress.value = Math.ceil(parseFloat(JSON.parse(coursesString)[0].course_learning_progress) / 60)
      confirmationTime.value = JSON.parse(coursesString)[0].confirmation_time
    }
  } catch (error) {
    console.error('获取信息失败', error);
  }
};

const getEvaluationNumber = async () => {
  try {
    const response = await myAxios.get('/getEvaluationNumber', {
      params: {
        course_id: courseId,
        evaluator: student.value.student_id,
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.EvaluationNumber = response.data
    sessionStorage.setItem('EvaluationNumber', JSON.stringify(state.EvaluationNumber))
    const coursesString = sessionStorage.getItem('EvaluationNumber');
    if (coursesString) {
      EvaluationNumber.value = parseInt(JSON.parse(coursesString)[0].evaluation_count)
    }
  } catch (error) {
    console.error('获取信息失败', error);
  }
};

const getDiscussionNumber = async () => {
  try {
    const response = await myAxios.get('/getDiscussionNumber', {
      params: {
        commentator: student.value.student_id,
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.DiscussionNumber = response.data
    sessionStorage.setItem('DiscussionNumber', JSON.stringify(state.DiscussionNumber))
    const coursesString = sessionStorage.getItem('DiscussionNumber');
    if (coursesString) {
      DiscussionNumber.value = parseInt(JSON.parse(coursesString)[0].discussion_count)
    }
  } catch (error) {
    console.error('获取信息失败', error);
  }
};

const getSubDiscussionNumber = async () => {
  try {
    const response = await myAxios.get('/getSubDiscussionNumber', {
      params: {
        commentator: student.value.student_id,
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    // 处理响应数据
    state.SubDiscussionNumber = response.data
    sessionStorage.setItem('SubDiscussionNumber', JSON.stringify(state.SubDiscussionNumber))
    const coursesString = sessionStorage.getItem('SubDiscussionNumber');
    if (coursesString) {
      SubDiscussionNumber.value = parseInt(JSON.parse(coursesString)[0].subDiscussion_count)
    }
    updateECharts();
  } catch (error) {
    console.error('获取信息失败', error);
  }
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.box-card {
  margin-top: 20px;
  width: 1100px;
  border-radius: 15px;
}

.row-bg {
  margin-top: 40px;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.progressAnnular {
  display: inline-block;
}

.progressAnnular .annularText {
  display: block;
  text-align: center;
  margin-top: 30px;
}

/* 新增样式 */
.el-row {
  padding-top: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.progress-item {
  border: 1px solid #e5e5e5;
  text-align: center;
}

/* .sta-title {
  font-size: 18px;
  text-align: center;
  margin: 20px;
} */

/* .el-col-24 {
  width: 100%;
} */

.el-col {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 20px;
}

.statistics-item {
  line-height: 90px;
  font-size: 14px;
  color: #999;
  padding: 0 20px 20px 40px;
}

.el-col-12 {
  width: 50%;
}

.el-col-8 {
  width: 33.33333%;
  width: 1000px;
}

.spaceil {
  text-align: left;
  color: #005c94;
}

.el-col-16 {
  width: 66.66667%;
}

h4 {
  text-align: center;
  font-size: 22px;
}

#echarts-chart {
  margin-top: 20px;
  margin-right: 10px;
  /* 调整右边距 */
  width: 600px;
  height: 400px;
}

#echarts-chart2 {
  margin-top: 20px;
  width: 600px;
  height: 400px;
}
</style>