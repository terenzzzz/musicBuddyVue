<template>
    <div class="TrackDetail container-lg" >
        <AlertComponents :title="isValidMongoId(this.trackId) ? 'The Metadata is Provided by MusicBuddy' : 'The Metadata is Provided by Spotify'"></AlertComponents>
        <div v-if="track">
            <div class="mt-2 px-1 px-md-3 px-lg-5"><SpotifyFrame v-if="spotifyUri" :uri="spotifyUri"></SpotifyFrame></div>
            <div class="px-1 px-md-3 px-lg-5">
                <!--        Track Basic Info-->
                <div class="card track-detail-container shadow rounded-bottom-0 p-3" :style="containerStyle">
                    <div class="d-flex justify-content-end" v-if="isValidMongoId(this.trackId)">
                        <RateBtn :rating="trackRating" :on-rate="updateRate" :item-type="itemTypes.TRACK"></RateBtn>
                    </div>
                    <div class="row" >
                        <div class="col-6 col-sm-5 col-md-4 col-xl-3 m-auto">
                            <VinylRecord :cover="track.cover"></VinylRecord>
                        </div>
                        <div class="col-12 col-md-8 col-xl-9 d-flex flex-column justify-content-center">
                            <div>
                                <strong class="fs-2 text-white">{{ track.name }}</strong>
                                <p class="fs-5 text-white">{{ track.artist.name }}</p>
                            </div>
                            <div class="row d-flex flex-row" v-if="track.tags">
                                <div class="col-auto" v-for="tag in track.tags" :key="tag.id" >
                                    <TagButton :tag="tag.tag"></TagButton>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <button class="btn btn-outline-success my-2" @click="openWindow(spotifyTrackUrl)">
                                        <i class="fa-brands fa-spotify mx-2"></i>Open In Spotify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow rounded-top-0" >
                    <div class="row text-center py-3">
                        <div class="col-4 d-flex flex-column" v-if="track.album">
                            <strong>Album</strong>
                            {{ track.album }}
                        </div>

                        <div class="col-4 d-flex flex-column" v-if="track.year">
                            <strong>Year Publish</strong>
                            {{ track.year }}
                        </div>

                        <div class="col-4 d-flex flex-column" v-if="track.duration">
                            <strong>Duration</strong>
                            {{ millisecondsToMMss(track.duration) }}
                        </div>
                    </div>
                </div>

                <!--            Artist Card-->
                <div class="card shadow my-5 p-3" >
                    <div class="row">
                        <div class="d-flex justify-content-end" v-if="isValidMongoId(this.trackId)">
                            <RateBtn :rating="artistRating" :on-rate="updateRate" :item-type="itemTypes.ARTIST"></RateBtn>
                        </div>
                        <div class="col-6 col-md-3 col-xl-2 m-auto">
                            <div class="rounded-circle overflow-hidden img-container">
                                <img :src="track.artist.avatar || 'https://placehold.co/600x600?text=No+Cover'"
                                     class="img-fluid" style="object-fit: cover;">
                            </div>
                        </div>
                        <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
                            <div class="d-flex flex-row justify-content-between mb-2">
                                <strong class="fs-2">{{ track.artist.name }}</strong>
                                <div class="d-flex text-center" >
                                    <div class="d-flex flex-column mx-2" v-if="track.artist.familiarity">
                                        <strong>Familiarity</strong>
                                        {{ (track.artist.familiarity * 100).toFixed(2) }}%
                                    </div>
                                    <div class="d-flex flex-column mx-2" v-if="track.artist.hotness">
                                        <strong>Hotness</strong>
                                        {{ (track.artist.hotness * 100).toFixed(2) }}%
                                    </div>
                                </div>

                            </div>
                            <div class="row d-flex flex-row" v-if="track.artist.tags">
                                <div class="col-auto"  v-for="tag in track.artist.tags" :key="tag.id">
                                    <TagButton :tag="tag.tag"></TagButton>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <router-link :to="`/artist/${track.artist._id}`" class="me-2 ">
                                        <button class="btn btn-outline-primary d-inline-flex align-items-center h-100">
                                            <img src="@/assets/images/musicBuddyVueLogo.png" class="img-fluid ratio-1x1 me-2" style="width: 30px; height: 30px;">
                                            <span>More In MusicBuddy</span>
                                        </button>
                                    </router-link>
                                    <button class="btn btn-outline-success d-inline-flex align-items-center h-100" @click="openWindow(spotifyArtistUrl)">
                                        <i class="fa-brands fa-spotify me-2"></i>
                                        <span>More In Spotify</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--    Lyric-->

                <div class="card shadow p-5 my-2" >
                    <h3 class="text-center">Lyric</h3>
                    <div v-if="formattedLyrics.length>0" >
                        <div v-for="(line, index) in formattedLyrics" :key="index" class="text-center">
                            <p>{{ line }}</p>
                        </div>
                        <p class="text-muted mt-3" v-if="track.lyric.lyricAPI">Lyric Provider: <a>{{track.lyric.lyricAPI}}</a></p>
                    </div>
                    <div v-else class="mx-auto">No lyric is privided for this track</div>
                </div>


                <!--    Lyric Analysis -->
                <LyricAnalysis :lyric-top-words="lyricTopWords" :chart-data="chartData" :chart-labels="chartLabels"
                               labels="Topic Probability Distribution"></LyricAnalysis>

                <!--Recommandation-->
                <div class="my-3">

                    <div class="card p-3 rounded-5 my-3">
                        <div class="btn-group d-flex justify-content-end container align-items-center" role="group">
                            <input type="radio" class="btn-check" id="weighted" value="weighted" name="recommendation" v-model="selectedRecommendation" checked>
                            <label class="btn btn-outline-primary" for="weighted">Weighted</label>

                            <input type="radio" class="btn-check" id="keywords" value="keywords" name="recommendation" v-model="selectedRecommendation">
                            <label class="btn btn-outline-primary" for="keywords">Keywords</label>

                            <input type="radio" class="btn-check" id="semantics" value="semantics" name="recommendation" v-model="selectedRecommendation">
                            <label class="btn btn-outline-primary" for="semantics">Semantics</label>

                            <input type="radio" class="btn-check" id="topics" value="topics" name="recommendation" v-model="selectedRecommendation">
                            <label class="btn btn-outline-primary" for="topics">Topics</label>

                            <i class="fa-solid ms-3 text-primary" :class="(showPieSlider)?'fa-chevron-down':'fa-chevron-up'"
                               v-show="selectedRecommendation==='weighted'" @click="showPieSlider=!showPieSlider"></i>
                        </div>


                        <transition name="fade" mode="out-in" >
                            <PieSlider
                                v-show="showPieSlider"
                                class="pie-slider"
                                :modelWeighting.sync="modelWeighting"
                                @update:models="handleModelUpdate"
                            />
                        </transition>
                    </div>


                    <div v-if="recommendedTracks.length>0">
                        <div>
                            <h3 class="red-bottom d-inline me-2">Recommended Tracks for「{{track.name}}」</h3>
                        </div>
                        <div class="row mt-2">
                            <div class="col-4 col-md-2" v-for="track in recommendedTracks" :key="track.id">
                                <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>No recommendations available.</p>
                    </div>
                </div>

                <div class="my-3">
                    <div>
                        <h3 class="red-bottom d-inline me-2">Recommended Artists for「{{track.artist.name}}」</h3>
                    </div>
                    <div v-if="recommendedArtists.length > 0" class="mt-2">
                        <LoopSwiper v-if="recommendedArtists.length>0" :artists="recommendedArtists"></LoopSwiper>
<!--                        <div class="horizontal-scroll">-->
<!--                            <div class="col-3 col-md-2 mx-2" v-for="artist in recommendedArtists" :key="artist.id">-->
<!--                                <ArtistCard :artist="artist.artist" :similarity="artist.similarity"></ArtistCard>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="isLoadingSpotify">
            <LoadingSpinner title="We are collecting data for you."></LoadingSpinner>
        </div>
        <div v-else>
            <ErrorPlaceholderVertical title="No Data Founded"></ErrorPlaceholderVertical>
        </div>
    </div>
</template>

<script>
import {getLyricTopWordsByLyric, getTrackById, getTrackTopicByLyric} from "@/api/tracks";
import {millisecondsToMMss} from '@/utils/timeConverter';
import TrackCard from "@/components/TrackCard.vue";
import SpotifyFrame from "@/components/SpotifyFrame.vue";
import {getSpotifyTrackById, searchSpotifyTracks} from "@/api/spotify";
import isValidMongoId from "@/utils/isValidMongoId";
import AlertComponents from "@/components/AlertComponents.vue";
import TagButton from "@/components/TagButton.vue";
import RateBtn from "@/components/RateBtn.vue";
import {addRating, deleteRating, getRating, itemTypes} from "@/api/ratings";

import {
    getLDARecommendArtistsByLyrics, getLDARecommendByLyrics, getTfidfRecommendArtistsByLyrics,
    getTfidfRecommendByLyrics, getW2VRecommendArtistsByLyrics, getW2VRecommendByLyrics,
    getWeightedRecommendArtistsByLyrics, getWeightedRecommendByLyrics,
} from "@/api/recommend";
import PieSlider from "@/components/PieSlider.vue";
import VinylRecord from "@/components/VinylRecord.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorPlaceholderVertical from "@/components/ErrorPlaceholderVertical.vue";
import LoopSwiper from "@/components/LoopSwiper.vue";
import LyricAnalysis from "@/components/LyricAnalysis.vue";

export default {
    components: {
        LyricAnalysis,
        LoopSwiper,
        ErrorPlaceholderVertical,
        LoadingSpinner,
        VinylRecord,
        PieSlider, TagButton, AlertComponents, SpotifyFrame, TrackCard, RateBtn},
    data() {
        return {
            showPieSlider: true,
            modelWeighting: [
                { name: 'Keywords', value: 33},
                { name: 'Semantics', value: 33},
                { name: 'Topics', value: 34 }
            ],
            selectedRecommendation: "weighted",
            chartLabels: [],
            chartData: [],
            trackId: this.$route.params.id,
            track: null,
            formattedLyrics: [],
            recommendedTracks:[],
            recommendedArtists:[],
            spotifyUri: "",
            spotifyTrackUrl: "",
            spotifyArtistUrl: "",
            lyricTopWords: [],

            trackRating: 0,
            artistRating: 0,

            isLoadingSpotify: false
        };
    },
    async created() {
        if (isValidMongoId(this.trackId)) {
            await this.fetchTrackById();
            await this.fetchRating()
        } else {
            await this.fetchSpotifyMetadata();
        }

        await this.fetchRecommendedArtists();
        await this.fetchRecommendedTracks();
    },
    watch: {
        async '$route'(to) {
            this.trackId = to.params.id;
            if (isValidMongoId(this.trackId)) {
                await this.fetchTrackById();
                await this.fetchRating()
            } else {
                await this.fetchSpotifyMetadata();
            }
            await this.fetchRecommendedArtists();
            await this.fetchRecommendedTracks();
        },
        async selectedRecommendation() {
            // 获取当前选中的推荐方法
            const recommendationType = this.selectedRecommendation;
            // 根据选中的推荐方法来设置 showPieSlider 的状态
            this.showPieSlider = recommendationType === "weighted";

            await this.fetchRecommendedTracks()
            await this.fetchRecommendedArtists();
        }
    },
    methods: {
        async handleModelUpdate(updatedModels) {
            this.modelWeighting = updatedModels;
            const response = await getWeightedRecommendByLyrics(this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric,this.calculatedWeighting[0],
                this.calculatedWeighting[1], this.calculatedWeighting[2])
            if (response.status === 200) {
                this.recommendedTracks = response.data.data;
            }

            const artistResponse = await getWeightedRecommendArtistsByLyrics(this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric,this.calculatedWeighting[0],
                this.calculatedWeighting[1], this.calculatedWeighting[2])
            if (artistResponse.status === 200) {
                this.recommendedArtists = artistResponse.data.data;
            }

        },
        async fetchTrackTopic() {
            try {
                const response = await getTrackTopicByLyric(this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric);
                if (response.status === 200) {
                    const labels = response.data.data.map(topic => topic.top_words.slice(0, 5).join(','));
                    const data = response.data.data.map(topic => Number((topic.probability * 100).toFixed(2)));
                    this.chartLabels = labels
                    this.chartData = data
                } else {
                    this.chartLabels = []
                    this.chartData = []
                    console.error('Error fetching Track Topic:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track Topic:', err.message);
            }
        },
        async updateRate(itemType,rating) {
            let response = null
            switch (itemType) {
                case itemTypes.TRACK:
                    if (rating === this.trackRating){
                        response = await deleteRating(this.trackId, itemType)
                    }else {
                        response = await addRating(this.trackId, itemType, rating)
                    }
                    if (response.status === 200) {
                        this.trackRating = rating === this.trackRating?  0 : response.data.rate
                    } else {
                        alert("Rate Track Failed")
                    }
                    break
                case itemTypes.ARTIST:
                    if (rating === this.artistRating){
                        response = await deleteRating(this.track.artist._id, itemType)
                    }else {
                        response = await addRating(this.track.artist._id, itemType, rating)
                    }
                    if (response.status === 200) {
                        this.artistRating = rating === this.artistRating? 0 : response.data.rate
                    } else {
                        alert("Rate Artist Failed")
                    }
                    break
                default:
                    alert("Rate Failed Default")
                    break
            }
        },
        async fetchRating() {
            try {
                const [trackResponse, artistResponse] = await Promise.all([
                    getRating(this.trackId, itemTypes.TRACK),
                    getRating(this.track.artist._id, itemTypes.ARTIST)
                ]);

                if (trackResponse.status === 200 && trackResponse.data?.data) {
                    this.trackRating = trackResponse.data.data.rate ?? 0;
                }

                if (artistResponse.status === 200 && artistResponse.data?.data) {
                    this.artistRating = artistResponse.data.data.rate ?? 0;
                }
            } catch (err) {
                console.error('Error fetching ratings:', err.message);
            }
        },
        async fetchSpotifyMetadata() {
            this.isLoadingSpotify = true
            try {
                const response = await getSpotifyTrackById(this.trackId);
                if (response.status === 200) {
                    this.track = response.data;
                    console.log(response.data)
                    this.spotifyUri = response.data.uri;
                    this.formattedLyrics = this.formatLyrics(response.data.lyric)
                    this.spotifyTrackUrl = response.data.external_urls
                    this.spotifyArtistUrl = response.data.artist.external_urls
                    await this.fetchTrackTopic();
                    await this.fetchLyricTopWords()
                } else {
                    console.error('Error search Spotify Metadata else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify Metadata:', err.message);
            }
            this.isLoadingSpotify = false
        },
        async searchSpotify(keyword) {
            // 访问本地数据库时,查询spotify获取播放资源
            try {
                const response = await searchSpotifyTracks(keyword);
                if (response.status === 200) {
                    let firstTrack = response.data[0]
                    this.spotifyUri = firstTrack.uri;
                    this.spotifyTrackUrl = firstTrack.external_urls
                    this.spotifyArtistUrl = firstTrack.artist.external_urls.spotify
                } else {
                    console.error('Error search Spotify else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify:', err.message);
            }
        },
        async fetchLyricTopWords() {
            try {
                const response = await getLyricTopWordsByLyric(this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric);
                if (response.data.status === 200) {
                    this.lyricTopWords = response.data.data;
                } else {
                    console.error('Error fetching lyricTopWords By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching lyricTopWords By Id:', err.message);
            }
        },
        async fetchTrackById() {
            try {
                const response = await getTrackById({ track: this.trackId });
                if (response.data.status === 200) {
                    this.track = response.data.data;
                    this.formattedLyrics = this.formatLyrics(response.data.data.lyric)
                    let keyword = `${response.data.data.name} ${response.data.data.artist.name}`
                    await this.searchSpotify(keyword)
                    await this.fetchLyricTopWords()
                    await this.fetchTrackTopic();

                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
            }
        },
        async fetchRecommendedArtists() {
            try {
                const lyric = this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric
                let response = {}
                try {
                    if (this.selectedRecommendation === "keywords"){
                        response = await getTfidfRecommendArtistsByLyrics(lyric)
                    }else if (this.selectedRecommendation === "semantics"){
                        response = await getW2VRecommendArtistsByLyrics(lyric)
                    }else if (this.selectedRecommendation === "topics"){
                        response = await getLDARecommendArtistsByLyrics(lyric)
                    }else {
                        response = await getWeightedRecommendArtistsByLyrics(lyric,this.calculatedWeighting[0],
                            this.calculatedWeighting[1], this.calculatedWeighting[2])
                    }
                    if (response.data.status === 200) {
                        this.recommendedArtists = response.data.data;
                    } else {
                        console.error('Error TFIDF Recommended tracks:', response.data.message);
                    }
                } catch (err) {
                    console.error('Error TFIDF Recommended tracks:', err.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
        },
        async fetchRecommendedTracks() {
            try {
                const lyric = this.track.lyric.lyric?this.track.lyric.lyric:this.track.lyric
                let response = {}
                try {
                    if (this.selectedRecommendation === "keywords"){
                        response = await getTfidfRecommendByLyrics(lyric)
                    }else if (this.selectedRecommendation === "semantics"){
                        response = await getW2VRecommendByLyrics(lyric)
                    }else if (this.selectedRecommendation === "topics"){
                        response = await getLDARecommendByLyrics(lyric)
                    }else {
                        response = await getWeightedRecommendByLyrics(lyric,this.calculatedWeighting[0],
                            this.calculatedWeighting[1], this.calculatedWeighting[2])
                    }

                    if (response.data.status === 200) {
                        this.recommendedTracks = response.data.data;
                    } else {
                        console.error('Error TFIDF Recommended tracks:', response.data.message);
                    }
                } catch (err) {
                    console.error('Error TFIDF Recommended tracks:', err.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Tracks:', err.message);
            }
        },
        formatLyrics(lyrics) {
            // 如果传入的 lyrics 对象有 lyric 属性，使用该属性，否则使用传入的 lyrics
            lyrics = lyrics.lyric ? lyrics.lyric : lyrics;

            // 将歌词按换行符分割成数组，然后对每一行进行处理
            return lyrics.split('\n')
            // .map(line => {
            //     // 使用正则表达式匹配时间戳格式 [mm:ss.xx] 或 [hh:mm:ss.xx]
            //     const match = line.match(/\[([0-9:.]+)\](.*)/);
            //
            //     // 如果匹配成功
            //     if (match) {
            //         // 获取时间戳后的歌词文本，并移除所有非英文字母字符和空白字符，再修剪两端的空白
            //         // const text = match[2].replace(/[^a-zA-Z\s]/g, '').trim();
            //         const text = match[2];
            //         return text;
            //     }
            //     // 如果没有时间戳，移除所有非英文字母字符和空白字符，再修剪两端的空白
            //     return line.replace(/[^a-zA-Z\s]/g, '').trim();
            // })
            // .filter(line => line !== ''); // 过滤掉可能的空行
        },
        openWindow: function(url) {
            window.open(url, '_blank');
        },
        isValidMongoId,
        millisecondsToMMss,

    },
    computed: {
        itemTypes() {
            return itemTypes
        },
        containerStyle() {
            if (!this.track) return {};
            return {
                background: `url(${this.track.artist.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right'
            };
        },
        calculatedWeighting() {
            // 计算总和
            const totalValue = this.modelWeighting.reduce((sum, model) => sum + model.value, 0);

            // 计算每个模型的权重，但不立即舍入
            let calculatedWeighting = this.modelWeighting.map(model => model.value / totalValue);

            // 对前n-1个权重进行舍入
            for (let i = 0; i < calculatedWeighting.length - 1; i++) {
                calculatedWeighting[i] = Number(calculatedWeighting[i].toFixed(4));
            }

            // 计算前n-1个权重的总和
            const sumOfN1 = calculatedWeighting.slice(0, -1).reduce((sum, weight) => sum + weight, 0);

            // 最后一个权重设为1减去其他权重之和
            calculatedWeighting[calculatedWeighting.length - 1] = Number((1 - sumOfN1).toFixed(4));

            return calculatedWeighting;
        },
        recommendedModeText(){
            let mode = this.selectedRecommendation.toUpperCase()
            let weights = this.calculatedWeighting
            if (mode === "WEIGHTED"){
                mode = `${mode}
                Keywords=${(weights[0]*100).toFixed(0)}%
                Semantics=${(weights[1]*100).toFixed(0)}%
                Topics=${(weights[2]*100).toFixed(0)}%`
            }
            return mode
        }
    }
};
</script>

<style scoped>
.highlight {
    color: red; /* 或者你想要的任何其他颜色 */
    font-weight: bold; /* 可选：加粗字体 */
}

.img-container {
    position: relative;
    padding-bottom: 100%; /* 创建一个正方形容器 */
}

.img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.track-info {
    max-width: 50%; /* 可根据需要调整 */
}

.buttons {
    margin-top: 20px;
}

.buttons button {
    margin-right: 10px;
}

.stats {
    margin-top: 20px;
    font-size: 14px;
}

.stats span {
    margin-right: 20px;
}
</style>
