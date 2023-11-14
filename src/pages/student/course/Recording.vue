<template>
    <div class="video2">
        <video ref="videoPlayer" id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline
            webkit-playsinline></video>
    </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onBeforeMount, ref } from "vue";
import TCPlayer from "tcplayer.js";
// import myAxios from "../../../plugins/myAxios";

const url = `https://api.videosdk.live/v2/recordings?roomId=ypob-bgdr-zmz7`;
const fileUrl = ref('')
const playerRef: any = ref(null);

onBeforeMount(async () => {
    const options = {
        method: "GET",
        headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ODA5ZGE5Yi04MTk1LTQwZGUtOTJiMi04NjExYTJkYzVjYjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5OTk2NTY3MiwiZXhwIjoxNzAwNTcwNDcyfQ.4TSYfgsTL-fwORr4_nsqMra7W_LGcS7y7hiH7HL7sd8",
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    try {
        // Extracting fileUrl from the response data
        if (data && data.data && data.data.length > 0) {
            fileUrl.value = data.data[0].file.fileUrl;
            onMountedLogic()
        } else {
            console.error("No data or invalid response format");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})
const onMountedLogic = () => {
    // 创建 TCPlayer 实例
    const player = TCPlayer("player-container-id", {
        autoplay: false,
        licenseUrl: "https://license.vod2.myqcloud.com/license/v2/1317662942_1/v_cube.license",
    });
    // 将 player 实例保存到 ref 中
    playerRef.value = player;
    // 设置播放源
    player.src(fileUrl.value);
}

onUnmounted(() => {
    // 在组件卸载时释放播放器
    if (playerRef.value) {
        playerRef.value.dispose();
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
