<template>
    <div class="playList">
        <div class="posters-background">
            <div class="col-lg-6 content-wrapper">
                <div class="my-auto text-center">
                    <h2 class="fw-bold display-5">{{ title }}</h2>
                </div>
            </div>
        </div>

        <div class="mt-5 px-5">
            <div v-if="tracks.length > 0">
                <div class="row">
                    <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                    <div class="col-3 col-md-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>


import {getRecentlyPlayed} from "@/api/spotify";

import TrackCard from "@/components/TrackCard.vue";
import AlertComponents from "@/components/AlertComponents.vue";
import playlistTypes from "@/enum/playlistTypes";

export default {
    components: {AlertComponents, TrackCard},

    data() {
        return {
            title: playlistTypes.stringToPlaylistType(this.$route.params.type),
            tracks: []
        };
    },
    created() {
        console.log(this.$route.params.type)
        console.log(playlistTypes.stringToPlaylistType("recentlyPlayed"));
        this.fetchRecentlyPlay()
    },
    methods:{
        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed();
                this.tracks = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
    }
}
</script>

<style scoped>
.posters-background {
    position: relative;
    width: 100%;
    height: 30vh;
    background-image: url('../assets/images/posters.png');  /* 替换为你的背景图片路径 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posters-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    filter: blur(10px);  /* 添加模糊滤镜 */
    z-index: 1;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);  /* 添加半透明背景以提高可读性 */
    color: white;  /* 设置文本颜色为白色，确保在深色背景上可见 */
    border-radius: 10px;
}
</style>