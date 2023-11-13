<template>
  <el-dialog v-model="learningModalVisible" title="学习情况" @closed="recordConfirmationTime">
    <p>点击确认以继续以继续播放视频</p>
    <el-button type="primary" @click="closeLearningModalAndRecordTime">确定</el-button>
  </el-dialog>
  <div class="video2">
    <h3>{{ chapter[chapter_index - 1].video_title }}</h3>
    <el-button @click="goToTalk()" type="primary" class="goToTalkBtn">去讨论</el-button>
    <div class="timer">{{ formattedTime }}</div>
    <video ref="videoPlayer" id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline
      webkit-playsinline @timeupdate="onTimeUpdate"></video>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import TCPlayer from "tcplayer.js";
import myAxios from "../../../plugins/myAxios";

const timer = ref(0);
const formattedTime = computed(() => formatTime(timer.value));
let intervalId: any = null;
let isVideoPlaying = false;

const learningModalVisible = ref(false);
const learningStartTime = ref(0);
const confirmationTime = ref(0);
const hasModalBeenShown = ref(false);

const route = useRoute();
const router = useRouter();
const courseId = route.params.courseId;

const goToTalk = () => {
  // Save the current time before navigating
  saveLastWatchedTime();
  router.push(`/courseId/${courseId}/discussion`);
};

const chapter = JSON.parse(sessionStorage.getItem("chapter") || "null") || "";
const chapter_index: any = route.params.chapter_index;
const lastWatchedTimeKey = `lastWatchedTime_${courseId}_${chapter_index}`;
const videoPlayer: any = ref(null);
const learningDisplayStartTime = ref(0);

const startLearningTimer = () => {
  console.log("startLearningTimer called");

  if (hasModalBeenShown.value) {
    console.log("Modal has already been shown, returning");
    return;
  }

  // 检查视频是否正在播放
  if (!videoPlayer.value.paused) {
    const randomTime = Math.floor(Math.random() * 30) + 10;

    setTimeout(() => {
      learningDisplayStartTime.value = Date.now();
      console.log("Timeout executed, showing modal");
      videoPlayer.value.pause();
      hasModalBeenShown.value = true;
      learningModalVisible.value = true;
    }, randomTime * 1000);
  } else {
    console.log("Video is paused, not showing modal");
  }
};

const closeLearningModal = () => {
  // 恢复视频播放逻辑
  videoPlayer.value.play();
};

const recordConfirmationTime = () => {
  confirmationTime.value = Math.floor((Date.now() - learningDisplayStartTime.value) / 1000);
  console.log(`Confirmation time: ${confirmationTime.value} seconds`);
};

const stopLearningTimer = () => { };

const closeLearningModalAndRecordTime = () => {
  // 关闭学习模态
  learningModalVisible.value = false;

  videoPlayer.value.play();
  // 记录用户确认学习模态的时间
  recordConfirmationTime();

  // 停止学习计时器
  stopLearningTimer();
};

onMounted(() => {
  // Load the last watched time
  const lastWatchedTime = localStorage.getItem(lastWatchedTimeKey);
  const startTime = lastWatchedTime ? parseFloat(lastWatchedTime) : 0;

  // 播放视频需要传入该视频的fileID
  const player = TCPlayer("player-container-id", {
    fileID: chapter[chapter_index - 1].file_id,
    appID: "1317662942",
    psign: chapter[chapter_index - 1].psign,
    autoplay: false,
    licenseUrl: "https://license.vod2.myqcloud.com/license/v2/1317662942_1/v_cube.license",
  });
  getMediaData();
  // Set the start time to the last watched time
  videoPlayer.value.currentTime = startTime;
  onUnmounted(() => {
    player.dispose();
  });

  videoPlayer.value.addEventListener("play", startTimer);

  // Stop the timer when the video pauses or ends
  videoPlayer.value.addEventListener("pause", stopTimer);
  videoPlayer.value.addEventListener("ended", stopTimer);

  videoPlayer.value.addEventListener("play", startLearningTimer);
  videoPlayer.value.addEventListener("pause", stopLearningTimer);
  videoPlayer.value.addEventListener("ended", stopLearningTimer);
  console.log(123);
  console.log(player);
});

const getMediaData = async () => {
  try {
    // 发布课程，即将课程信息传给后端，存入数据库
    let obj = {
      file_id: chapter[chapter_index - 1].file_id,
    };
    const response = await myAxios.post("getMediaData", JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // 处理响应数据
    console.log("media");
    console.log(response.data);
  } catch (error) {
    console.error("传参失败", error);
  }
};
// Save the current time before leaving the page
onBeforeUnmount(() => {
  saveLastWatchedTime();

  // Remove event listeners when leaving the page
  videoPlayer.value.removeEventListener("play", startTimer);
  videoPlayer.value.removeEventListener("pause", stopTimer);
  videoPlayer.value.removeEventListener("ended", stopTimer);

  videoPlayer.value.removeEventListener("play", startLearningTimer);
  videoPlayer.value.removeEventListener("pause", stopLearningTimer);
  videoPlayer.value.removeEventListener("ended", stopLearningTimer);
  stopLearningTimer();
  // Stop the timer if it's still running
  stopTimer();
});

// Save the current time in localStorage
const saveLastWatchedTime = () => {
  if (videoPlayer.value) {
    const currentTime = videoPlayer.value.currentTime;
    localStorage.setItem(lastWatchedTimeKey, currentTime.toString());
  }
};

// Update the current time when the video time changes
const onTimeUpdate = () => {
  saveLastWatchedTime();
};

const startTimer = () => {
  if (!isVideoPlaying) {
    isVideoPlaying = true;
    intervalId = setInterval(() => {
      timer.value++;
    }, 1000);
  }
};

const stopTimer = () => {
  if (isVideoPlaying) {
    isVideoPlaying = false;
    clearInterval(intervalId);
  }
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
const learningDuration = computed(() => {
  if (learningDisplayStartTime.value) {
    return Math.floor((Date.now() - learningDisplayStartTime.value) / 1000);
  } else {
    return 0;
  }
});
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

.video2 {
  padding: 30px;
  background-color: #fff;

  h3 {
    margin-bottom: 20px;
    display: inline-block;
  }

  .goToTalkBtn {
    float: right;
  }
}
</style>