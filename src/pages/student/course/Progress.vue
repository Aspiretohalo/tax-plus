<template>
  <div>
    <el-card class="box-card notice">
      <template #header>
        <div class="card-header">
          <h3>授课教师：cy</h3>
        </div>
      </template>
      <div class="annular">
        <h4>学习进度</h4>
        <el-row class="row-bg" justify="space-evenly">
          <el-col :span="6">
            <div class="progressAnnular">
              <el-progress type="circle" stroke-width="12" :percentage="80">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
              <span class="annularText">课程进度</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="progressAnnular">
              <el-progress type="circle" stroke-width="12" :percentage="66">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
              <span class="annularText">我的进度</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <h4>学习统计</h4>
      <div class="progress-item el-row">
        <!-- <div class="el-row">
          <div class="sta-title el-col el-col-24">学习记录</div>
        </div> -->

        <div class="el-row">
          <div class="statistics-item el-col el-col-12">
            <div class="el-row">
              <div class="el-col el-col-8">已观看视频：</div>
              <div class="spaceil el-col el-col-16">10分钟</div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-8">已发表讨论：</div>
              <div class="spaceil el-col el-col-16">1条</div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-8">已发表评价：</div>
              <div class="spaceil el-col el-col-16">0条</div>
            </div>
          </div>

          <div class="statistics-item el-col el-col-12">
            <div class="el-row">
              <div class="el-col el-col-8">课程成绩：</div>
              <div class="spaceil el-col el-col-16">75分</div>
            </div>

            <div>
              <div id="echarts-chart" style="width: 600px; height: 400px"></div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import * as echarts from "echarts";

const chartDom = ref(null);
let myChart;

onMounted(() => {
  chartDom.value = document.getElementById("echarts-chart");
  myChart = echarts.init(chartDom.value);
  updateECharts();
});
const updateECharts = () => {
  const option = {
    title: {
      text: "课程分数占比",
      subtext: "按百分百%",
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
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 20, name: "已观看视频" },
          { value: 10, name: "已发表讨论" },
          { value: 10, name: "已发表评价" },
          { value: 60, name: "课程成绩" },
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
  width: 600px;
  height: 400px;
}
</style>
