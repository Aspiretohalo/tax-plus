<template>
	<div>
		<div class="charts-container">
			<!-- ECharts pie chart container -->
			<div id="echarts-chart" style="width: 600px; height: 400px"></div>
			<!-- ECharts line chart container -->
			<div id="echarts-line-chart" class="chart-box"></div>
		</div>

		<div class="student-list">
			<div v-for="(student, index) in paginatedStudents" :key="index" class="student-item">
				<div class="student-info">
					<h2>{{ student.name }}</h2>
					<p><strong>学习时长：</strong> {{ student.studyDuration }} 小时</p>
					<p><strong>评论条数：</strong> {{ student.commentCount }}</p>
				</div>
			</div>
		</div>

		<div class="pagination">
			<button v-for="pageNumber in totalPages" :key="pageNumber" @click="setCurrentPage(pageNumber)"
				:class="{ active: pageNumber === currentPage }">
				{{ pageNumber }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import * as echarts from "echarts";

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
	const startIndex = (currentPage.value - 1) * itemsPerRow;
	const endIndex = startIndex + itemsPerRow;
	return students.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(students.length / itemsPerRow));

function setCurrentPage(pageNumber) {
	currentPage.value = pageNumber;
}
const chartDom = ref(null);
let myChart;

const lineChartDom = ref(null);
let lineChart;

onMounted(() => {
	chartDom.value = document.getElementById("echarts-chart");
	myChart = echarts.init(chartDom.value);
	updateECharts();

	lineChartDom.value = document.getElementById("echarts-line-chart");
	lineChart = echarts.init(lineChartDom.value);
	updateLineChart();
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
			text: "学生评论情况",
			subtext: "",
			left: "center",
		},
		xAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [10, 20, 24, 18, 35, 47, 60],
				type: "line",
			},
		],
	};

	option && lineChart.setOption(option);
};
</script>

<style scoped>
.student-list {
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */
}


.student-item {
	min-width: 285px;
	min-height: 175.83px;
	/* flex: 1 0 calc(20% - 20px); */
	/* 100% / 5 items - margin-right */
	margin: 10px;
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.echarts-chart {
	margin-top: 20px;
	width: 600px;
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
