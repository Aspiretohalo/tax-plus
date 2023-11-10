<template>
  <div class="timetable w100 h100">
    <!-- <div class="time-b w100">
      <el-button @click="goBack()" class="returnBtn" type="primary">返回主页</el-button>

      <div class="time-detail">{{ startTime }} - {{ endTime }}</div>
      <div class="time-controller">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="changeCount(1), getWeek(count)"></el-button>
          <el-button round class="date-btn">本周</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" @click="changeCount(-1), getWeek(count)"></el-button>
        </el-button-group>
      </div>
    </div> -->
    <div class="timetable-b w100">
      <table class="timetable-content w100">
        <thead style="height: 50px;">
          <tr>
            <th></th>
            <th v-for="(item1, index1) in weeks" :key="index1">
              {{ numberToChinease(item1 + 1, 'week') }}
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
              <td @click="handleChooseCourse()" class="course"
                :rowspan="showData(index3, index2 + 1).subject && showData(index3, index2).subject === showData(index3, index2 + 1).subject ? 2 : ''"
                :style="[
                  {
                    display:
                      showData(index3, index2 - 1).subject && showData(index3, index2 - 1).subject === showData(index3, index2).subject ? 'none' : '',
                  },
                ]">
                <div class="dmsjandjs-b" :style="[
                  {
                    background: showData(index3, index2).index ? getRandomColor() : '#FFFFFF',
                  },
                  { color: '#fff' },
                  { borderRadius: '15px' },
                  { padding: '12px' },
                  { height: '100px' },
                ]">
                  <p>{{ showData(index3, index2).subject }}</p>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
        <el-dialog v-model="dialogVisible" title="选择课程" width="30%" :before-close="handleClose">
          <el-card :body-style="{ padding: '0px' }" class="card-circle" v-for="item in selectedCourses">
            <div style="padding: 14px">

              <div style=" margin-top: 5px;text-align: left;">
                <span style="color: #73767a;">课程：</span>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ item.course_name
                }}</span>
              </div>
              <div class="bottom" style="text-align: left;">
                <span style="color: #73767a;">教师：</span>{{ item.teacher_name }}
              </div>
            </div>
          </el-card>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
      </table>
    </div>
  </div>
</template>
 
<script>
import moment from 'moment'
import { weekCourse, colorList } from '../config/Timetable'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
      router.push('/')
    }
    const timeList = reactive([{ time: '9:00-11:00' }, { time: '13:00-15:00' }, { time: '17:30-19:30' }, { time: '20:30-22:30' }])

    const dialogVisible = ref(false)
    const handleChooseCourse = () => {
      dialogVisible.value = true
    }

    const selectedCourses = [
      {
        course_name: '爱神的箭阿萨德就',
        teacher_name: '小黄'
      }
    ]
    return {
      timeList,
      goBack,
      dialogVisible,
      handleChooseCourse,
      selectedCourses,
    }
  },
  data() {
    return {
      startTime: '2022.10.17',
      endTime: '2022.10.23',
      colorList: [], //随机颜色
      weekCourse: [], // 课程详细课程、数量
      weeks: [], //头部周期
      maxCourseLength: 0, //最大课节数,
      count: 0, //上周、下周、本周选择器flag
    }
  },

  created() {
    this.weekCourse = weekCourse
    this.colorList = colorList
    this.sortData()
    this.init()
    this.getWeek(0)
  },
  methods: {
    //改变选择器次数
    changeCount(i) {
      this.count += i
      return this.count
    },
    // 排序周期和课数
    sortData() {
      //周期
      this.weekCourse.sort((a, b) => {
        return a.week - b.week
      })
      this.weekCourse.forEach((item) => {
        for (const key in item) {
          if (key === 'courses') {
            item[key].sort((a, b) => {
              return a.index - b.index
            })
          }
        }
      })
    },
    // 初始化课数(courses)与天数(week)
    init() {
      this.weeks = [] //周集合
      this.maxCourseLength = 0
      this.weeks = this.weekCourse.map((item, index) => {
        for (const key in item) {
          if (key === 'courses') {
            let max = 0 //
            //取出一周中最大的课节数及当天的最大课节数
            for (let j of item[key]) {
              j.index > this.maxCourseLength && (this.maxCourseLength = j.index) //取所有一周里最大课节值
              j.index > max && (max = j.index) //取当天最大课节值
            }
            // console.log("max:", max);

            //如果当天的课节总数小于当天的最大课节值
            if (item[key].length < max) {
              //以最大课节值为终点遍历当天课节
              for (let i = 0; i < max; i++) {
                //如果下标课节不存在或着与循环的下标不匹配
                if (!item[key][i] || item[key][i].index != i + 1) {
                  item[key].splice(i, 0, ' ') //填充空课节
                }
              }
            }
          }
        }
        return item.week
      })
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
        return this.weekCourse[weekIndex].courses[courseNum]
      }
      return false
    },

    /**
     * 数字转中文
     * @param { Number } n 需转换的数字
     * @param { Boolean }  identifier  标识符
     * @returns { String }  identifier  转换后的中文
     */
    numberToChinease(n, identifier) {
      const chnArr = ['零', '一', '二', '三', '四', '五', '六']
      return identifier === 'week' && (n === 0 || n === 7) ? '日' : chnArr[n]
    },

    //随机获取颜色
    getRandomColor() {
      let colorList = this.colorList
      let colorRandom = Math.floor(Math.random() * colorList.length + 1) - 1
      let color
      for (let i = 0; colorList.length > i; i++) {
        if (i == colorRandom) {
          color = colorList[i]
        }
      }
      return color
    },

    //随机上、本、下周 日期
    getWeek(i) {
      let weekOfDay = parseInt(moment().format('E')) //计算今天是这周第几天
      let last_monday = moment()
        .subtract(weekOfDay + 7 * i - 1, 'days')
        .format('YYYY-MM-DD') //周一日期
      let last_sunday = moment()
        .subtract(weekOfDay + 7 * (i - 1), 'days')
        .format('YYYY-MM-DD') //周日日期
      this.startTime = last_monday
      this.endTime = last_sunday
    },
  },
}
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
      font-family: 'Microsoft YaHei';
    }
  }

  .timetable-b {
    // height: 1207px;
    height: 100%;
    background-color: #fff;
    overflow: hidden;

    .timetable-content {
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
          border: 2px solid rgba(27, 100, 240, 0.1);
        }
      }

      tbody {
        height: calc(100% - 2px) / 7;

        .course {
          cursor: pointer;
        }

        td {
          // padding: 12px;
          border: 2px solid rgba(27, 100, 240, 0.1);

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