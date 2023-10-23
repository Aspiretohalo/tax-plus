<template>
  <div class="video2">
    <h3>01欢迎开发SaaS在线课程项目</h3>
    <el-button @click="goToTalk()" type="primary" class="goToTalkBtn">去讨论</el-button>
    <video id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline
      webkit-playsinline></video>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TCPlayer from 'tcplayer.js'

const route = useRoute()
const router = useRouter()
const courseId = ref(route.params.courseId)

const goToTalk = () => {
  router.push(`/courseId/${courseId}/discussion`)
}
onMounted(() => {
  // 播放视频需要传入该视频的fileID
  var player = TCPlayer('player-container-id', {
    fileID: '3270835011292328740', // 请传入需要播放的视频fileID 必须
    appID: '1317662942', // 请传入点播账号的子应用appID 必须
    psign:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxNzY2Mjk0MiwiZmlsZUlkIjoiMzI3MDgzNTAxMTI5MjMyODc0MCIsImNvbnRlbnRJbmZvIjp7InJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTAsImF1ZGlvVmlkZW9UeXBlIjoiUmF3QWRhcHRpdmUiLCJpbWFnZVNwcml0ZURlZmluaXRpb24iOjEwfSwiY3VycmVudFRpbWVTdGFtcCI6MTU4OTQ0ODA2NywidXJsQWNjZXNzSW5mbyI6e319.ZPJSjOCSGWl9liBCwagat11OXTWN2P3V1L6H-oJ7fsY',
    // 请传入播放器签名psign 必须
    autoplay: false, // 是否自动播放
    licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1317662942_1/v_cube.license',
  }) // player-container-id 为播放器容器 ID，必须与 html 中一致

  console.log(player)

  // player.src(url); // url 播放地址
})
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