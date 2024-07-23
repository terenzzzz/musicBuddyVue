<template>
    <div class="px-1 px-sm-3 px-md-5 my-3 container-lg">
        <div class="row px-3 px-md-5">
            <div class="card p-3 rounded-5">
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

                <div class="container my-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <label for="inputTracksCount" class="font-weight-bold">Tracks Count to Generate Recommendation:</label>
                        <span class="badge badge-primary">{{ inputTracksCount }}</span>
                    </div>
                    <input
                        id="inputTracksCount"
                        type="range"
                        class="custom-range"
                        v-model.number="inputTracksCount"
                        min="1"
                        max="30"
                        @change="updateInputTracksCount"
                    />
                    <p class="text-muted small">* The larger the number of selections, the longer the processing time</p>
                </div>


                <transition name="fade" mode="out-in">
                    <PieSlider
                        v-show="showPieSlider"
                        class="pie-slider"
                        :modelWeighting.sync="modelWeighting"
                        @update:models="handleModelUpdate"
                    />
                </transition>
            </div>
        </div>

        <div class="mt-5">
            <div class="my-3 mx-auto fit-content text-center">
                <h3 class="text-center text-primary">Recently Play</h3>
                <p class="badge text-bg-primary fs-6 fst-italic">The {{inputTracksCount}} most recently tracks being used</p>
                <p class="text-muted text-center small">* Collected by the third party you have collected</p>
            </div>

            <div class="horizontal-scroll">
                <div class="col-3 col-md-2 mx-2" v-for="track in recentlyPlay" :key="track.id">
                    <TrackCard :track="track"></TrackCard>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <div class="my-3 mx-auto fit-content text-center">
                <h3 class="text-primary">If you like「
                    <span v-if="recentlyPlay.length > 0 && recentlyPlay[0].name">{{ recentlyPlay[0].name }}</span>
                    」, you may also like </h3>
                <p class="badge text-bg-primary fs-6 fst-italic">{{ recommendedModeText }}</p>
                <p class="text-muted small">* Recommended by the lyric base on your most recently played </p>
            </div>

            <div class="horizontal-scroll" v-if="alsoListen.length>0">
                <div class="col-3 col-md-2 mx-2" v-for="track in alsoListen" :key="track.id">
                    <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>

        <div class="mt-5">
            <div class="my-3 mx-auto fit-content text-center">
                <h3 class="text-primary">Recommended for you</h3>
                <p class="badge text-bg-primary fs-6 fst-italic">{{ recommendedModeText }}</p>
                <p class="text-muted small">* Recommended by the lyrics base on your recently played </p>
            </div>
            <div class="horizontal-scroll"  v-if="recommendForYou.length>0">
                <div class="col-3 col-md-2 mx-2" v-for="track in recommendForYou" :key="track.id">
                    <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>

        <div class="mt-5">
            <div class="my-3 mx-auto fit-content text-center">
                <h3 class="text-primary">Artist May Liked</h3>
                <p class="badge text-bg-primary fs-6 fst-italic">{{ recommendedModeText }}</p>
                <p class="text-muted small">* Recommended by the lyrics base on your recently played </p>
            </div>
            <div class="horizontal-scroll" v-if="artistMayLike.length>0">
                <div class="col-3 col-md-2 mx-2" v-for="artist in artistMayLike" :key="artist.id">
                  <ArtistCard :artist="artist.artist" :similarity="artist.similarity"></ArtistCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>

        <div class="mt-5">
            <div class="my-3 mx-auto fit-content text-center">
                <h3 class="text-primary">Everyone's listening</h3>
                <p class="badge text-bg-primary fs-6 fst-italic">{{ recommendedModeText }}</p>
                <p class="text-muted small">* Recommended by the user similar to you </p>
            </div>
            <div class="horizontal-scroll" v-if="EveryoneListening.length>0">
                <div class="col-3 col-md-2 mx-2" v-for="track in EveryoneListening" :key="track.id">
                  <TrackCard :track="track"></TrackCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>
    </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue';
import {getRandomTrack} from "@/api/tracks";
import ArtistCard from "@/components/ArtistCard.vue";
import {getRecentlyPlayed} from "@/api/spotify";
import {
    getLDARecommendArtistsByLyrics,
    getLDARecommendByLyrics, getTfidfRecommendArtistsByLyrics,
    getTfidfRecommendByLyrics, getW2VRecommendArtistsByLyrics,
    getW2VRecommendByLyrics, getWeightedRecommendArtistsByLyrics,
    getWeightedRecommendByLyrics,
} from "@/api/recommend";
import {getLyricsFromGenius} from "@/api/genius";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import PieSlider from "@/components/PieSlider.vue";

export default {
    components: {
        PieSlider,
        LoadingSpinner,
        ArtistCard,
        TrackCard,
    },
    data() {
        return {
            showPieSlider: true,
            selectedRecommendation: "weighted",
            recentlyPlay: [],
            alsoListen: [],
            recommendForYou: [],
            artistMayLike: [],
            EveryoneListening: [],
            lyricsForRecentlyPlay:[],
            modelWeighting: [
                { name: 'Keywords', value: 33},
                { name: 'Semantics', value: 33},
                { name: 'Topics', value: 34 }
            ],
            inputTracksCount: 5
        };
    },
    watch: {
        async selectedRecommendation() {
            // 获取当前选中的推荐方法
            const recommendationType = this.selectedRecommendation;
            // 根据选中的推荐方法来设置 showPieSlider 的状态
            this.showPieSlider = recommendationType === "weighted";

            await this.fetchAlsoListen(this.lyricsForRecentlyPlay[0])
            await this.fetchRecommendedForYou(this.lyricsForRecentlyPlay)
            await this.fetchArtistMayLike(this.lyricsForRecentlyPlay)
        }
    },
    computed:{
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
    },
    methods: {
        async startRecommendation(){
          if (this.recentlyPlay.length>0){
              await this.fetchLyricFromGenius(this.inputTracksCount)
              await this.fetchAlsoListen(this.lyricsForRecentlyPlay[0])
              await this.fetchRecommendedForYou(this.lyricsForRecentlyPlay)
              await this.fetchArtistMayLike(this.lyricsForRecentlyPlay)
              await this.fetchEveryoneListening()
          }
        },
        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed();
                this.recentlyPlay = response.data;
                await this.startRecommendation()
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchLyricFromGenius(trackCount) {
            let lyrics = [];
            // Use a for-of loop to correctly iterate over the items in this.recentlyPlay
            for (let track of this.recentlyPlay.slice(0,trackCount)) {
                try {
                    // Assuming track has properties artist and name
                    let lyric = await getLyricsFromGenius(track.artist.name, track.name);
                    lyrics.push(lyric.data.data.lyric);  // Use push to add items to an array
                } catch (error) {
                    console.error(`Failed to fetch lyrics for ${track.name} by ${track.artist.name}:`, error);
                }
            }
            this.lyricsForRecentlyPlay = lyrics;
            console.log(this.lyricsForRecentlyPlay)
        },
        async fetchAlsoListen(lyric) {
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
                    this.alsoListen = response.data.data;
                } else {
                    console.error('Error TFIDF Recommended tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error Fetch AlsoListen Recommended tracks:', err.message);
            }
        },
        async fetchRecommendedForYou(lyric) {
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
                    this.recommendForYou = response.data.data;
                } else {
                    console.error('Error TFIDF Recommended tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error TFIDF Recommended tracks:', err.message);
            }
        },
        async fetchArtistMayLike(lyric) {
            let response = {};
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
                this.artistMayLike = response.data.data;
            } else {
                console.error('Error artistMayLike Recommended:', response.data.message);
            }
        },
        async fetchEveryoneListening() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.EveryoneListening = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async updateInputTracksCount(){
            console.log(this.inputTracksCount)
            await this.startRecommendation()
        },
        async handleModelUpdate(updatedModels) {
            this.modelWeighting = updatedModels;

            const [alsoLikeResponse, recommendForYouResponse, artistMayLikeResponse] = await Promise.all([
                getWeightedRecommendByLyrics(this.lyricsForRecentlyPlay[0],this.calculatedWeighting[0],
                    this.calculatedWeighting[1],this.calculatedWeighting[2]),
                getWeightedRecommendByLyrics(this.lyricsForRecentlyPlay,this.calculatedWeighting[0],
                    this.calculatedWeighting[1],this.calculatedWeighting[2]),
                getWeightedRecommendArtistsByLyrics(this.lyricsForRecentlyPlay,this.calculatedWeighting[0],
                    this.calculatedWeighting[1],this.calculatedWeighting[2])
            ]);

            if (alsoLikeResponse.status === 200) {
                this.alsoListen = alsoLikeResponse.data.data;
            }

            if (recommendForYouResponse.status === 200) {
                this.recommendForYou = recommendForYouResponse.data.data;
            }

            if (artistMayLikeResponse.status === 200) {
                this.artistMayLike = artistMayLikeResponse.data.data;
            }

        },
    },
    created() {
        this.fetchRecentlyPlay()
    }
}
</script>


<style scoped>
.fit-content {
    width: fit-content;
}
/* 过渡类名定义 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 中 */ {
    opacity: 0;
}

.model-weight {
    margin-bottom: 1rem;
}

.custom-range {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #d3d3d3;
    opacity: 0.7;
    transition: opacity .2s;
}

.custom-range:hover {
    opacity: 1;
}


.badge-primary {
    background-color: #0d6efd;
    padding: 0.5em 0.75em;
    font-size: 0.9em;
}
</style>

