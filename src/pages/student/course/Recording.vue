<template>
    <video ref="videoPlayer" id="player-container-id" width="1000" height="600" preload="auto" playbackRates playsinline
        webkit-playsinline></video>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, } from "vue";
import TCPlayer from "tcplayer.js";
// import myAxios from "../../../plugins/myAxios";

onMounted(async () => {
    // Your API request code
    const options = {
        method: "GET",
        headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ODA5ZGE5Yi04MTk1LTQwZGUtOTJiMi04NjExYTJkYzVjYjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5OTk2NTY3MiwiZXhwIjoxNzAwNTcwNDcyfQ.4TSYfgsTL-fwORr4_nsqMra7W_LGcS7y7hiH7HL7sd8",
            "Content-Type": "application/json",
        },
    };

    const url = `https://api.videosdk.live/v2/recordings?roomId=ypob-bgdr-zmz7`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Extracting fileUrl from the response data
        if (data && data.data && data.data.length > 0) {
            const fileUrl = data.data[0].file.fileUrl;

            // Load the video player with the obtained fileUrl
            const player = TCPlayer("player-container-id", {
                autoplay: false,
                licenseUrl: "https://license.vod2.myqcloud.com/license/v2/1317662942_1/v_cube.license",
            });

            player.src(fileUrl);

            // Set the start time to the last watched time

            // Dispose the player when the component is unmounted
            onUnmounted(() => {
                player.dispose();
            });
        } else {
            console.error("No data or invalid response format");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
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
