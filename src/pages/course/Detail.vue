<template>
  <div class="video2">
    <h3>01欢迎开发SaaS在线课程项目</h3>
    <el-button @click="goToTalk()" type="primary" class="goToTalkBtn">去讨论</el-button>
    <video id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline webkit-playsinline></video>
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
  var player = TCPlayer('player-container-id', {
    sources: [
      {
        src: 'src/assets/videos/school.mp4',
      },
    ],
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