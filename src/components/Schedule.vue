<template>
  <div class="timetable w100 h100">
    <div class="timetable-b w100">
      <table class="timetable-content w100">
        <thead style="height: 50px">
          <tr>
            <th></th>
            <th v-for="(item1, index1) in weeks" :key="index1">
              {{ numberToChinease(item1 + 1, "week") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item2, index2) in maxCourseLength" :key="index2">
            <td>
              <!-- <p>{{ numberToChinease(item2) }}</p> -->
              <p>{{ timeList[item2 - 1].time }}</p>
            </td>
            <template v-for="(item3, index3) in weeks" :key="index3">
              <td @click="handleChooseCourse(index3, index2)" class="course" :rowspan="showData(index3, index2 + 1).subject &&
                showData(index3, index2).subject === showData(index3, index2 + 1).subject
                ? 2
                : ''
                " :style="[
    {
      display:
        showData(index3, index2 - 1).subject &&
          showData(index3, index2 - 1).subject === showData(index3, index2).subject
          ? 'none'
          : '',
    },
  ]">
                <div class="dmsjandjs-b" :style="[
                  {
                    background: showData(index3, index2).index ? getRandomColor() : '#FFFFFF',
                  },
                  { color: '#fff' },
                  { borderRadius: '15px' },
                  { padding: '8px' },
                  { height: '100px' },
                ]">
                  <p style="font-size: 16px; overflow: hidden; margin: 0 auto;">{{ showData(index3, index2).subject }}</p>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
        <el-dialog v-model="dialogVisible" title="选择课程" width="30%" :before-close="handleClose"
          :open="getCourseByStudentId()">
          <el-radio-group v-model="selectedCourse" class="ml-4">
            <el-card :body-style="{ padding: '0px' }" class="card-circle" v-for="item in CourseByStudentId"
              shadow="never">
              <el-radio :label="item.course_name" size="large">
                <div style="padding: 14px">
                  <div style="margin-top: 5px; text-align: left">
                    <span style="color: #73767a">课程：</span>
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">{{
                      item.course_name
                    }}</span>
                  </div>
                  <div class="bottom" style="text-align: left">
                    <span style="color: #73767a">教师：</span>{{ item.teacher_name }}
                  </div>
                </div>
              </el-radio>
            </el-card>
          </el-radio-group>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="updateWeekCourse"> 确定 </el-button>
            </span>
          </template>
        </el-dialog>
      </table>
    </div>
  </div>
  <el-dialog v-model="popupVisible" title="课程提醒">
    <p>课程 {{ ongoingCourse.subject }} 开始了</p>
  </el-dialog>
</template>

<script>
import moment from "moment";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import state from "../store/state";
import { ElDialog } from "element-plus";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerVisible: {
      get: function () {
        return this.visible;
      },
      set: function (val) {
        this.$emit("update:visible", val);
      },
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const goBack = () => {
      router.push("/");
    };

    const popupVisible = ref(false);
    const ongoingCourse = ref(null);

    const showCourseAlert = (course) => {
      ongoingCourse.value = course;
      popupVisible.value = true;
    };
    const timeList = reactive([
      { time: "9:00 11:00" },
      { time: "13:00 15:00" },
      { time: "17:30 19:30" },
      { time: "20:30 22:30" },
    ]);
    const colorList = reactive([
      "#F56C6C",
      "#fab6b6",
      "#409EFF",
      "#67C23A",
      "#E6A23C",
      "#a18496",
      "#9dc6b6",
      "#b0ced6",
      "#d2b9b2",
    ]);
    const weekCourse = reactive([
      // ... your existing weekCourse array
      {
        week: 0,
        courses: [
          {
            index: 1,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
            subject: "", //学科
          },
          {
            index: 2,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 3,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 1,
        courses: [
          {
            index: 1,
            startTime: "15:00", //开始时间
            endTime: "16:30", //结束时间
            subject: "", //学科
          },
          {
            index: 2,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 3,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 2,
        courses: [
          {
            index: 1,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
            subject: "", //学科
          },
          {
            index: 2,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 3,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 3,
        courses: [
          {
            index: 1,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
            subject: "", //学科
          },
          {
            index: 2,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 3,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 4,
        courses: [
          {
            index: 1,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
            subject: "", //学科
          },
          {
            index: 2,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 3,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 5,
        courses: [
          {
            index: 1,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
            subject: "", //学科
          },
          {
            index: 3,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 2,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 4,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
      {
        week: 6,
        courses: [
          {
            index: 2,
            startTime: "09:00", //开始时间
            endTime: "11:30", //结束时间
          },
          {
            index: 3,
            startTime: "13:00", //开始时间
            endTime: "15:30", //结束时间
          },
          {
            index: 4,
            startTime: "17:30", //开始时间
            endTime: "19:30", //结束时间
          },
          {
            index: 1,
            startTime: "20:30", //开始时间
            endTime: "22:30", //结束时间
          },
        ],
      },
    ]);

    const startTime = ref("2022.10.17");
    const endTime = ref("2022.10.23");

    const weeks = ref([]);
    const maxCourseLength = ref(0);
    const count = ref(0);

    const dialogVisible = ref(false);

    const selectedCell = ref({ week: null, index: null });

    const handleChooseCourse = (week, index) => {
      console.log(123);
      console.log(week, index);
      console.log(123);
      selectedCell.value = { week, index };
      dialogVisible.value = true;
    };
    const updateWeekCourse = () => {
      console.log(123);
      console.log(weekCourse[1]);
      console.log(123);

      if (selectedCourse.value) {
        const weekIndex = selectedCell.value.week;
        const courseIndex = selectedCell.value.index;

        if (courseIndex !== -1) {
          // Update the subject field with the selected course name
          weekCourse[weekIndex].courses[courseIndex].subject = selectedCourse.value;

          dialogVisible.value = false;
        } else {
          console.error("No empty cell available in the selected week.");
        }
      } else {
        console.error("No course selected!");
      }
    };

    // Get the current system time
    const currentTime = new Date();

    let popupLocked = false; // Boolean variable to control the display of the popup

    // Iterate through each week
    for (const week of weekCourse) {
      // Iterate through each course in the week
      for (const course of week.courses) {
        // Combine the date of the course with the start time
        const courseStartTime = new Date(`${currentTime.toDateString()} ${course.startTime}`);
        const courseEndTime = new Date(`${currentTime.toDateString()} ${course.endTime}`);

        // Check if the current time is after the course start time, before the course end time, and on the correct day
        if (
          currentTime >= courseStartTime &&
          currentTime <= courseEndTime &&
          currentTime.getDay() === (week.week + 1) % 7 && // Adjusting for your week representation // Adjusting for your week representation
          course.subject !== undefined &&
          course.subject !== null &&
          course.subject !== ""
        ) {
          // Check if the subject field is not empty
          if (course.subject !== "") {
            console.log(1234);
            console.log(course.subject);
            console.log(1234);
            // Check if the popup is not locked
            if (!popupLocked) {
              // Show a popup or perform any other action to alert the user
              showCourseAlert(course); // Call the custom method to show the alert

              // Lock the popup
              popupLocked = true;

              // Set a timer to unlock the popup after the course ends
              const timeUntilEnd = courseEndTime - currentTime;
              setTimeout(() => {
                popupLocked = false;
              }, timeUntilEnd);
            }
          }
        }
      }
    }

    const selectedCourses = [
      {
        course_name: "爱神的箭阿萨德就",
        teacher_name: "小黄",
      },
    ];
    const student = ref(JSON.parse(sessionStorage.getItem("students") || "null") || "");
    const CourseByStudentId = ref([]);
    const selectedCourse = ref("1");

    const getCourseByStudentId = async () => {
      console.log(student.value);
      try {
        const response = await myAxios.get("/getCourseByStudentId", {
          params: {
            student_id: student.value.student_id,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        // 处理响应数据
        state.CourseByStudentId = response.data;
        sessionStorage.setItem("CourseByStudentId", JSON.stringify(state.CourseByStudentId));
        const coursesString = sessionStorage.getItem("CourseByStudentId");
        if (coursesString) {
          CourseByStudentId.value = JSON.parse(coursesString);
          console.log(CourseByStudentId.value);
        }
      } catch (error) {
        console.error("获取信息失败", error);
      }
    };
    return {
      popupVisible,
      ongoingCourse,
      showCourseAlert,
      startTime,
      endTime,
      colorList,
      weekCourse,
      weeks,
      maxCourseLength,
      count,
      updateWeekCourse,
      timeList,
      goBack,
      dialogVisible,
      handleChooseCourse,
      selectedCourses,
      selectedCourse,
      getCourseByStudentId,
      student,
      CourseByStudentId,
    };
  },

  created() {
    this.sortData();
    this.init();
    this.getWeek(0);
  },
  methods: {
    //改变选择器次数
    changeCount(i) {
      this.count += i;
      return this.count;
    },
    // 排序周期和课数
    sortData() {
      //周期
      this.weekCourse.sort((a, b) => {
        return a.week - b.week;
      });
      this.weekCourse.forEach((item) => {
        for (const key in item) {
          if (key === "courses") {
            item[key].sort((a, b) => {
              return a.index - b.index;
            });
          }
        }
      });
    },
    // 初始化课数(courses)与天数(week)
    init() {
      this.weeks = []; //周集合
      this.maxCourseLength = 0;
      console.log(123);
      console.log(this.timeList);
      console.log(123);
      this.weeks = this.weekCourse.map((item, index) => {
        for (const key in item) {
          if (key === "courses") {
            let max = 0; //
            //取出一周中最大的课节数及当天的最大课节数
            for (let j of item[key]) {
              j.index > this.maxCourseLength && (this.maxCourseLength = j.index); //取所有一周里最大课节值
              j.index > max && (max = j.index); //取当天最大课节值
            }
            // console.log("max:", max);

            //如果当天的课节总数小于当天的最大课节值
            if (item[key].length < max) {
              //以最大课节值为终点遍历当天课节
              for (let i = 0; i < max; i++) {
                //如果下标课节不存在或着与循环的下标不匹配
                if (!item[key][i] || item[key][i].index != i + 1) {
                  item[key].splice(i, 0, " "); //填充空课节
                }
              }
            }
          }
        }
        return item.week;
      });
    },

    /**
     * 处理数据
     * @param { Number } weekIndex 周几对应的下标
     * @param { Number }  courseNum  第几节课对应的下标
     * @returns { String }   返回对应字符
     */
    showData(weekIndex, courseNum) {
      if (
        this.weekCourse[weekIndex] &&
        this.weekCourse[weekIndex].courses[courseNum] &&
        this.weekCourse[weekIndex].courses[courseNum].index === courseNum + 1
      ) {
        // this.getRandomColor();
        return this.weekCourse[weekIndex].courses[courseNum];
      }
      return false;
    },

    /**
     * 数字转中文
     * @param { Number } n 需转换的数字
     * @param { Boolean }  identifier  标识符
     * @returns { String }  identifier  转换后的中文
     */
    numberToChinease(n, identifier) {
      const chnArr = ["零", "一", "二", "三", "四", "五", "六"];
      return identifier === "week" && (n === 0 || n === 7) ? "日" : chnArr[n];
    },

    //随机获取颜色
    getRandomColor() {
      let colorList = this.colorList;
      let colorRandom = Math.floor(Math.random() * colorList.length + 1) - 1;
      let color;
      for (let i = 0; colorList.length > i; i++) {
        if (i == colorRandom) {
          color = colorList[i];
        }
      }
      return color;
    },

    //随机上、本、下周 日期
    getWeek(i) {
      let weekOfDay = parseInt(moment().format("E")); //计算今天是这周第几天
      let last_monday = moment()
        .subtract(weekOfDay + 7 * i - 1, "days")
        .format("YYYY-MM-DD"); //周一日期
      let last_sunday = moment()
        .subtract(weekOfDay + 7 * (i - 1), "days")
        .format("YYYY-MM-DD"); //周日日期
      this.startTime = last_monday;
      this.endTime = last_sunday;
    },
  },
};
</script>

<style scoped lang="scss">
.timetable {
  background-color: #f1f7ff;

  .h100 {
    height: 500px;
  }

  .time-b {
    .returnBtn {
      margin-left: 20px;
    }

    height: 46px;
    // margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time-detail {
      color: #333333;
      font-weight: 700;
      font-size: 20px;
      font-family: "Microsoft YaHei";
    }
  }

  .timetable-b {
    // height: 1207px;
    height: 100%;
    background-color: #fff;
    overflow: hidden;

    .timetable-content {
      width: 420px;
      height: 100%;
      table-layout: fixed;
      border-collapse: collapse; //设置表格的边框是否被合并为一个单一的边框
      text-align: center;
      color: #333333;
      font-weight: 400;
      font-size: 18px;

      thead {
        height: 100px;

        th {
          // border: 2px solid rgba(27, 100, 240, 0.1);
        }
      }

      tbody {
        height: calc(100% - 2px) / 7;

        .course {
          cursor: pointer;
        }

        td {
          // padding: 12px;
          // border: 2px solid rgba(27, 100, 240, 0.1);

          .dmsjandjs-b {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
          }
        }
      }

      :deep(.el-dialog) {
        margin-right: 5%;
        width: 20%;
        border-radius: 15px;
        padding: 20px;
      }
    }
  }
}

::v-deep {
  .time-controller {
    .el-button-group {
      .el-button {
        height: 46px;
        background: #ffffff;
        font-size: 18px;
        font-weight: 600;
        border: 1px solid rgba(27, 100, 240, 0.1);
        border-radius: 55px;
        color: #1b64f0;
      }

      :nth-child(2) {
        margin: 0px 12px;
      }
    }
  }
}
</style>