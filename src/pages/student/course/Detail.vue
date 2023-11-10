<template>
  <div class="video2">
    <h3>{{ chapter[chapter_index - 1].video_title }}</h3>
    <el-button @click="goToTalk()" type="primary" class="goToTalkBtn">去讨论</el-button>
    <video ref="videoPlayer" id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline
      webkit-playsinline @timeupdate="onTimeUpdate"></video>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TCPlayer from 'tcplayer.js'

const route = useRoute()
const router = useRouter()
const courseId = route.params.courseId

const goToTalk = () => {
  // Save the current time before navigating
  saveLastWatchedTime()
  router.push(`/courseId/${courseId}/discussion`)
}

const chapter = JSON.parse(sessionStorage.getItem('chapter') || 'null') || ''
const chapter_index: any = route.params.chapter_index
const lastWatchedTimeKey = `lastWatchedTime_${courseId}_${chapter_index}`
const videoPlayer: any = ref(null)


onMounted(() => {
  // Load the last watched time
  const lastWatchedTime = localStorage.getItem(lastWatchedTimeKey)
  const startTime = lastWatchedTime ? parseFloat(lastWatchedTime) : 0

  // 播放视频需要传入该视频的fileID
  const player = TCPlayer('player-container-id', {
    fileID: chapter[chapter_index - 1].file_id,
    appID: '1317662942',
    psign: chapter[chapter_index - 1].psign,
    autoplay: false,
    licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1317662942_1/v_cube.license',
  })

  // Set the start time to the last watched time
  videoPlayer.value.currentTime = startTime
  onUnmounted(() => {
    player.dispose()
  })
  console.log(player)
})

// Save the current time before leaving the page
onBeforeUnmount(() => {
  saveLastWatchedTime()
})

// Save the current time in localStorage
const saveLastWatchedTime = () => {
  if (videoPlayer.value) {
    const currentTime = videoPlayer.value.currentTime
    localStorage.setItem(lastWatchedTimeKey, currentTime.toString())
  }
}

// Update the current time when the video time changes
const onTimeUpdate = () => {
  saveLastWatchedTime()
}
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
