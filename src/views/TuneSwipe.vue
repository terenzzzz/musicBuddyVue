<template>
    <div class="row w-100 m-0">
        <swiper class="swiper"
                :options="swiperOption"
                ref="mySwiper"
                @slideChange="onSlideChange">
            <swiper-slide v-for="track in randomTracks" :key="track.id" class="mt-5 container-padding">
                <div class="card shadow rounded-bottom-0 position-relative">
                    <i class="fa-solid fa-circle-info fs-4  position-absolute"
                       style="top: 1rem; left: 1rem;"
                       @click="handleDetail"></i>
                    <div class="row g-0" v-show="!isShowDetail">

                        <div class="col-6 col-md-4 col-lg-5 col-xl-4 m-auto">
                            <VinylRecord :cover="currentTrack.cover" :isSpin="isPlaying"></VinylRecord>
                        </div>
                        <div class="col-12 col-lg-7 col-xl-8
                            d-flex flex-column justify-content-center bg-dark bg-opacity-50 p-3 text-white">
                            <div>
                                <strong class="fs-2 ">{{ track.name }}</strong>
                                <p class="fs-5 ">{{ track.artist.name }}</p>
                            </div>
                            <div class="row d-flex flex-row" v-if="track.tags">
                                <div class="col-auto" v-for="tag in track.tags" :key="tag.id" >
                                    <TagButton :tag="tag.tag"></TagButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LyricAnalysis :lyric-top-words="lyricTopWords" :chart-data="chartData" :chart-labels="chartLabels"
                                   :chart-label-explain="chartLabelsExplain"  labels="Topic Probability Distribution"
                                   v-show="isShowDetail" :is-card="false"></LyricAnalysis>
                </div>

            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>


        <div class="row w-100 mt-2 p-0 m-0" v-if="randomTracks.length > 0">
            <div class="card col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6
            mx-auto d-flex align-items-center rounded-5 p-2"
                 style="height: fit-content">
                <div class="row w-100">
                    <div class="col-6 col-md-4"><RateBtn :rating="trackRating" :on-rate="updateRate" :item-type="itemTypes.TRACK" class="fs-4"></RateBtn></div>
                    <div class="col-6 col-md-8 d-flex justify-content-end">
                        <router-link :to="`/track/${currentTrack._id}`" class="me-2 ">
                            <button class="btn btn-outline-primary d-inline-flex align-items-center h-100">
                                <img src="@/assets/images/musicBuddyVueLogo.png" class="img-fluid ratio-1x1 " style="width: 30px; height: 30px;">
                                <span class="d-none d-md-block ms-2">More In MusicBuddy</span>
                            </button>
                        </router-link>
                        <button class="btn btn-outline-success d-inline-flex align-items-center h-100" @click="openWindow(spotifyTrackUrl)">
                            <i class="fa-brands fa-spotify"></i>
                            <span class="d-none d-md-block ms-2">More In Spotify</span>
                        </button>
                    </div>

                </div>

                <div class="row w-100 mt-2">
                    <SpotifyFrame v-if="spotifyUri" :uri="spotifyUri" :auto-play="false"
                                  ref="spotifyFrame" class="spotify" @playStateChanged="onPlayStateChanged"></SpotifyFrame>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {getLyricTopWordsByLyric, getRandomTrack, getTrackTopicByLyric} from "@/api/tracks";
import TagButton from "@/components/TagButton.vue";
import RateBtn from "@/components/RateBtn.vue";
import { addRating, deleteRating, getRating, itemTypes } from "@/api/ratings";
import SpotifyFrame from "@/components/SpotifyFrame.vue";
import {searchSpotifyTracks} from "@/api/spotify";
import VinylRecord from "@/components/VinylRecord.vue";
import Chart from "chart.js";
import LyricAnalysis from "@/components/LyricAnalysis.vue";

export default {
    computed: {
        itemTypes() {
            return itemTypes;
        },
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
        currentTrack(){
            return this.randomTracks[this.currentIndex]
        },
        spotifyFrame(){
            return this.$refs.spotifyFrame
        },
        radarChart(){
            const canvas = this.$refs.radarChart;
            console.log('Canvas element:', canvas);
            return this.$refs.radarChart[this.currentIndex]
        }
    },
    components: {
        LyricAnalysis,
        VinylRecord,
        SpotifyFrame,
        RateBtn,
        Swiper,
        SwiperSlide,
        TagButton
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            },
            randomTracks: [],
            trackRating: 0,
            currentIndex: 0,
            spotifyUri: "",
            spotifyTrackUrl: "",
            isPlaying: false,
            isShowDetail: false,
            chartLabels: [],
            lyricTopWords: [],
            chartData:[],
            chartLabelsExplain:[]
        };
    },


    methods: {
        async handleDetail() {
            this.isShowDetail = !this.isShowDetail;
        },
        async fetchTrackTopic() {
            try {
                const response = await getTrackTopicByLyric(this.currentTrack.lyric);
                if (response.status === 200) {
                    const labels = response.data.data.map(topic => topic.name);
                    const labelExplain =  response.data.data.map(topic => topic.top_words.slice(0,5).join("; "));
                    const data = response.data.data.map(topic => Number((topic.probability * 100).toFixed(2)));
                    this.chartLabels = labels
                    this.chartData = data
                    this.chartLabelsExplain =labelExplain
                } else {
                    this.chartLabels = []
                    this.chartData = []
                    console.error('Error fetching Track Topic:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track Topic:', err.message);
            }
        },
        async fetchLyricTopWords() {
            try {
                const response = await getLyricTopWordsByLyric(this.currentTrack.lyric);
                if (response.data.status === 200) {
                    this.lyricTopWords = response.data.data;
                } else {
                    console.error('Error fetching lyricTopWords By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching lyricTopWords By Id:', err.message);
            }
        },
        createChart() {
            if (this.radarChart && typeof this.radarChart.getContext === 'function') {
                const ctx = this.radarChart.getContext('2d')
                this.chart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: this.chartLabels,
                        datasets: [{
                            label: 'Topic Represent words',
                            data: this.chartData,
                            fill: true,
                            backgroundColor: 'rgba(13, 110, 253, 0.2)',  // #0d6efd with 0.2 opacity
                            borderColor: 'rgb(13, 110, 253)',            // #0d6efd
                            pointBackgroundColor: 'rgb(13, 110, 253)',   // #0d6efd
                            pointBorderColor: '#fff',                    // 保持白色
                            pointHoverBackgroundColor: '#fff',           // 保持白色
                            pointHoverBorderColor: 'rgb(11, 94, 215)'    // 稍微深一点的蓝色
                        }]
                    },
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    }
                })
            }else {
                console.error('Canvas element or getContext not available');
            }
        },
        onPlayStateChanged(state) {
            this.isPlaying = state;
        },
        async searchSpotify() {
            let keyword = `${this.currentTrack.name} ${this.currentTrack.artist.name}`
            // 访问本地数据库时,查询spotify获取播放资源
            try {
                const response = await searchSpotifyTracks(keyword);
                if (response.status === 200) {
                    let firstTrack = response.data[0]
                    this.spotifyUri = firstTrack.uri;
                    this.spotifyTrackUrl = firstTrack.external_urls
                } else {
                    console.error('Error search Spotify else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify:', err.message);
            }
        },
        openWindow: function(url) {
            window.open(url, '_blank');
        },
        async onSlideChange() {
            this.currentIndex = this.swiper.realIndex;
            this.isShowDetail = false;
            await this.fetchRating()
            await this.searchSpotify()
            await this.fetchTrackTopic()
            await this.fetchLyricTopWords()
            this.spotifyFrame.play();
        },
        async updateRate(itemType, rating) {
            let response = null;
            if (rating === this.trackRating) {
                response = await deleteRating(this.currentTrack._id, itemType);
            } else {
                response = await addRating(this.currentTrack._id, itemType, rating);
            }
            if (response.status === 200) {
                this.trackRating = rating === this.trackRating ? 0 : response.data.rate;
            } else {
                alert("Rate Track Failed");
            }
        },
        async fetchRating() {
            try {
                const response = await getRating(this.currentTrack._id, itemTypes.TRACK);
                if (response.status === 200 && response.data?.data) {
                    this.trackRating = response.data.data.rate ?? 0;
                }else{
                    this.trackRating = 0
                }
            } catch (err) {
                this.trackRating = 0
                console.error('Error fetching ratings:', err.message);
            }
        },
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                this.randomTracks = response.data.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        }
    },
    async created() {
        await this.fetchRandomTracks();
        await this.fetchRating()
        await this.searchSpotify()
        await this.fetchTrackTopic()
        await this.fetchLyricTopWords()
        this.spotifyFrame.play();
    }
};
</script>

<style scoped>

.container-padding {
    padding-inline: 50px;
}

@media (min-width: 768px) {
    .container-padding {
        padding-inline: 100px;
    }
}

@media (min-width: 992px) {
    .container-padding {
        padding-inline: 200px;
    }
}

@media (min-width: 1400px) {
    .container-padding {
        padding-inline: 300px;
    }
}


</style>
