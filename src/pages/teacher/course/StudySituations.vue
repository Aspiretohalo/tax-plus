<template>
	<div>
		<el-card class="box-card notice">

			<div class="charts-container">
				<!-- ECharts pie chart container -->
				<div id="echarts-chart" style="width: 500px; height: 400px"></div>
				<!-- ECharts line chart container -->
				<div id="echarts-line-chart" class="chart-box"></div>
			</div>

			<div class="student-list">
				<div v-for="item in paginatedStudents" :key="item.student_id" class="student-item">
					<div class="student-info">
						<h2>{{ item.student_name }}</h2>
						<p><strong>学习时长：</strong> {{ (item.course_learning_progress
							/ 3600).toFixed(2) }} 小时</p>
						<p><strong>专注程度：</strong> {{ item.confirmation_time }}s</p>
					</div>
				</div>
			</div>

			<div class="pagination">
				<el-pagination background layout="prev, pager, next" :total="AllCourseLearningProgress.length * 2.5"
					@current-change="setCurrentPage" :current-page="currentPage" />
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted, onBeforeMount } from "vue";
import myAxios from "../../../plugins/myAxios";
import state from '../../../store/state'
import { useRoute } from "vue-router";

const route = useRoute();
const courseId = route.params.courseId;
// const CourseLearningProgress: any = ref()
// const confirmationTime: any = ref()
const AllCourseLearningProgress: any = ref([])

const itemsPerPage = 4; // 每页显示的记录数
const currentPage = ref(1);

const paginatedStudents = computed(() => {
	const startIndex = (currentPage.value - 1) * itemsPerPage;
	const endIndex = currentPage.value * itemsPerPage;
	return AllCourseLearningProgress.value.slice(startIndex, endIndex);
});

function setCurrentPage(pageNumber: number) {
	currentPage.value = pageNumber;
}

const chartDom: any = ref(null);
let myChart: any;

const lineChartDom: any = ref(null);
let lineChart: any;

interface Student {
	course_id: number;
	student_name: string;
	course_learning_progress: number;
	badge_got: boolean;
	student_id: number;
	confirmation_time: number;
}

onBeforeMount(async () => {
	await getAllCourseLearningProgress();
})

onMounted(async () => {

	const instance = getCurrentInstance();

	if (instance && instance.appContext.config.globalProperties) {
		const { $echarts } = instance.appContext.config.globalProperties;

		chartDom.value = document.getElementById("echarts-chart");
		myChart = $echarts.init(chartDom.value);

		lineChartDom.value = document.getElementById("echarts-line-chart");
		lineChart = $echarts.init(lineChartDom.value);
	}

});
const updateECharts = () => {
	const option = {
		title: {
			text: "学生学习时长情况",
			subtext: "",
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
					{ value: rangeCounts["<10"], name: "0~10h" },
					{ value: rangeCounts["10~20"], name: "10~20h" },
					{ value: rangeCounts["20~30"], name: "20~30h" },
					{ value: rangeCounts["30~40"], name: "30~40h" },
					{ value: rangeCounts[">40"], name: "40h以上" },
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
// 分别用<10, 10~20, 20~30, 30~40, 40~50来筛选
const rangeCounts: { [key: string]: number } = {
	"<10": 0,
	"10~20": 0,
	"20~30": 0,
	"30~40": 0,
	">40": 0
};

// 分别用<10和10~30来筛选
const rangeCounts2: { [key: string]: number } = {
	"<10": 0,
	"10~30": 0,
	">30": 0
};

const updateLineChart = () => {
	const option = {
		title: {
			text: "学生专注情况",
			subtext: "",
			left: "center",
		},
		xAxis: {
			type: 'category',
			data: ["优秀", "良好", "不够专注"],
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [
					rangeCounts2["<10"],
					rangeCounts2["10~30"],
					rangeCounts2[">30"]
				],
				type: 'bar',
				barWidth: '40%',
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)'
				}
			}
		]
	};

	option && lineChart.setOption(option);
};
const getAllCourseLearningProgress = async () => {
	try {
		const response = await myAxios.get('/getAllCourseLearningProgress', {
			params: {
				course_id: courseId,
			},
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			}
		});
		// 处理响应数据
		state.AllCourseLearningProgress = response.data
		sessionStorage.setItem('AllCourseLearningProgress', JSON.stringify(state.AllCourseLearningProgress))
		const coursesString = sessionStorage.getItem('AllCourseLearningProgress');
		if (coursesString) {
			AllCourseLearningProgress.value = JSON.parse(coursesString)
			console.log(AllCourseLearningProgress.value);
		}
		// 统计学习进度
		AllCourseLearningProgress.value.forEach((student: Student) => {
			const progress = student.course_learning_progress / 3600;
			if (progress < 10) {
				rangeCounts["<10"] += 1;
			} else if (progress >= 10 && progress < 20) {
				rangeCounts["10~20"] += 1;
			} else if (progress >= 20 && progress < 30) {
				rangeCounts["20~30"] += 1;
			} else if (progress >= 30 && progress < 40) {
				rangeCounts["30~40"] += 1;
			} else if (progress >= 40 && progress < 50) {
				rangeCounts["40~50"] += 1;
			}
		});
		// 统计确认时间
		AllCourseLearningProgress.value.forEach((student: Student) => {
			const confirmationTime = student.confirmation_time;

			if (confirmationTime < 10) {
				rangeCounts2["<10"] += 1;
			} else if (confirmationTime >= 10 && confirmationTime <= 30) {
				rangeCounts2["10~30"] += 1;
			} else if (confirmationTime > 30) {
				rangeCounts2[">30"] += 1;
			}
		});
		updateECharts();
		updateLineChart();
	} catch (error) {
		console.error('获取信息失败', error);
	}
};


</script>

<style scoped>
.box-card {
	margin-top: 20px;
	width: 1100px;
	border-radius: 15px;
}

.student-list {
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */
}


.student-item {
	min-width: 240px;
	min-height: 175.83px;
	/* flex: 1 0 calc(20% - 20px); */
	/* 100% / 5 items - margin-right */
	margin: 10px;
	border: 1px solid #ddd;
	border-radius: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.echarts-chart {
	margin-top: 20px;
	width: 500px;
	height: 400px;
}

.student-info {
	text-align: center;
}

.pagination {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}

.pagination button {
	margin: 0 5px;
	padding: 5px 10px;
	cursor: pointer;
	background-color: #ddd;
	border: 1px solid #999;
	border-radius: 5px;
}

.pagination button.active {
	background-color: #999;
	color: #fff;
}

.charts-container {
	display: flex;
}

.chart-box {
	flex: 1;
	margin: 0 10px;
	width: 600px;
	height: 400px;
}
</style>
