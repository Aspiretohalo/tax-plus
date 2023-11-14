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
						<p><strong>专注程度：</strong> {{ item.confirmation_time }}</p>
					</div>
				</div>
			</div>

			<div class="pagination">
				<button v-for="pageNumber in totalPages" :key="pageNumber" @click="setCurrentPage(pageNumber)"
					:class="{ active: pageNumber === currentPage }">
					{{ pageNumber }}
				</button>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted, onBeforeMount, watch } from "vue";
import myAxios from "../../../plugins/myAxios";
import state from '../../../store/state'
import { useRoute } from "vue-router";

const route = useRoute();
const courseId = route.params.courseId;
// const CourseLearningProgress: any = ref()
// const confirmationTime: any = ref()
const AllCourseLearningProgress: any = ref([

])

const students = [
	{ name: "张三", studyDuration: 50, commentCount: 5 },
	{ name: "李四", studyDuration: 45, commentCount: 8 },
	{ name: "王五", studyDuration: 60, commentCount: 3 },
	{ name: "赵六", studyDuration: 55, commentCount: 6 },
	{ name: "钱七", studyDuration: 40, commentCount: 7 },
	{ name: "孙八", studyDuration: 48, commentCount: 4 },
	{ name: "周九", studyDuration: 53, commentCount: 9 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	{ name: "吴十", studyDuration: 42, commentCount: 2 },
	// Add more students as needed
];

const itemsPerRow = 4;
const currentPage = ref(1);
const paginatedStudents = computed(() => {
	console.log(123);

	console.log(AllCourseLearningProgress.value);

	const startIndex = (currentPage.value - 1) * itemsPerRow;
	const endIndex = startIndex + itemsPerRow;
	////////////////////////////////////////这段代码有问题
	return AllCourseLearningProgress.value.slice(startIndex, endIndex);
	// return students.slice(startIndex, endIndex);
});

watch(AllCourseLearningProgress, () => {
	paginatedStudents.value; // Triggers re-computation
});
const totalPages = computed(() => Math.ceil(students.length / itemsPerRow));

function setCurrentPage(pageNumber: number) {
	currentPage.value = pageNumber;
}
const chartDom: any = ref(null);
let myChart: any;

const lineChartDom: any = ref(null);
let lineChart: any;

onBeforeMount(async () => {
	getAllCourseLearningProgress();
})

onMounted(() => {
	const instance = getCurrentInstance();
	if (instance && instance.appContext.config.globalProperties) {
		const { $echarts } = instance.appContext.config.globalProperties;

		chartDom.value = document.getElementById("echarts-chart");
		myChart = $echarts.init(chartDom.value);
		updateECharts();

		lineChartDom.value = document.getElementById("echarts-line-chart");
		lineChart = $echarts.init(lineChartDom.value);
		updateLineChart();
	}
});
// onUnmounted(() => {
// 	sessionStorage.removeItem('AllCourseLearningProgress')
// })
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
					{ value: 1048, name: "0~10h" },
					{ value: 735, name: "10~20h" },
					{ value: 580, name: "20~40h" },
					{ value: 484, name: "40~80h" },
					{ value: 300, name: "80h以上" },
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
				data: [10, 20, 24],
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

			// CourseLearningProgress.value = Math.ceil(parseFloat(JSON.parse(coursesString)[0].course_learning_progress) / 60)
			// confirmationTime.value = JSON.parse(coursesString)[0].confirmation_time
		}
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
