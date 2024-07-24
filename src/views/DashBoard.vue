<template>
    <div class="DashBoard">
        <div class="offcanvas offcanvas-start w-50" tabindex="-1" id="offcanvas">
            <div class="offcanvas-header">
                <h3 class="offcanvas-title d-none d-sm-block red-bottom" id="offcanvas">Recommendation Mode</h3>
                <button type="button" class="btn-close" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                        data-bs-dismiss="offcanvas"></button>
            </div>

            <div class="offcanvas-body p-3">
                <div class="d-flex justify-content-between align-items-center my-2">
                    <label for="dropdownMenuButton" class="my-2 fw-bold">Current Mode:</label>
                    <button class="btn btn-primary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false" :class="isRecommending?'disabled':''">
                        {{ selectedRecommendationText }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="#" @click.prevent="selectRecommendation('weighted')">Weighted</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="selectRecommendation('keywords')">Keywords</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="selectRecommendation('semantics')">Semantics</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="selectRecommendation('topics')">Topics</a></li>
                    </ul>
                </div>

                <div class="d-flex justify-content-between align-items-center my-2">
                    <label for="recentlyPlayedRadio" class="my-2 fw-bold">Recommend by Recently Played:</label>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" id="recentlyPlayedRadio">
                        <input type="radio" class="btn-check" name="recentlyPlayedRadio" id="yesRecentlyPlayed"
                               @click="selectRecentlyPlayed(true)" autocomplete="off" checked
                               :disabled="isRecommending">
                        <label class="btn btn-sm btn-outline-primary" for="yesRecentlyPlayed">Yes</label>

                        <input type="radio" class="btn-check" name="recentlyPlayedRadio" id="noRecentlyPlayed"
                               @click="selectRecentlyPlayed(false)" autocomplete="off"
                               :disabled="isRecommending">
                        <label class="btn btn-sm btn-outline-primary" for="noRecentlyPlayed">No</label>
                    </div>
                </div>

                <div v-show="isRecentlyPlayed">
                    <div class="d-flex justify-content-between align-items-center my-2">
                        <label for="inputTracksCount" class="fw-bold ">Amount of Recently Played Tracks to use:</label>
                        <span class="badge badge-primary">{{ selectedRecentlyPlayedAmount }}</span>
                    </div>
                    <input
                        id="inputTracksCount"
                        type="range"
                        class="custom-range"
                        v-model.number="selectedRecentlyPlayedAmount"
                        min="1"
                        max="30"
                        @change="startRecommendation"
                        :disabled="isRecommending"
                    />
                    <p class="text-muted small">* The larger the number of selections, the longer the processing time</p>
                </div>

                <div class="d-flex justify-content-between align-items-center my-2">
                    <label for="topTracksRadio" class="my-2 fw-bold">Recommend by Top Tracks:</label>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" id="topTracksRadio">
                        <input type="radio" class="btn-check" name="topTracksRadio" id="yesTopTracks"
                               @click="selectTopTracks(true)" autocomplete="off" checked
                               :disabled="isRecommending">
                        <label class="btn btn-sm btn-outline-primary" for="yesTopTracks">Yes</label>

                        <input type="radio" class="btn-check" name="topTracksRadio" id="noTopTracks"
                               @click="selectTopTracks(false)" autocomplete="off"
                               :disabled="isRecommending">
                        <label class="btn btn-sm btn-outline-primary" for="noTopTracks">No</label>
                    </div>
                </div>

                <div  v-show="isTopTracks">
                    <div class="d-flex justify-content-between align-items-center my-2">
                        <label for="inputTracksCount" class="fw-bold ">Amount of Top Tracks Tracks to use:</label>
                        <span class="badge badge-primary">{{ selectedTopTracksAmount }}</span>
                    </div>
                    <input
                        :disabled="isRecommending"
                        id="inputTracksCount"
                        type="range"
                        class="custom-range"
                        v-model.number="selectedTopTracksAmount"
                        min="1"
                        max="30"
                        @change="startRecommendation"
                    />
                    <p class="text-muted small">* The larger the number of selections, the longer the processing time</p>
                </div>

                <PieSlider
                    v-show="showPieSlider"
                    class="pie-slider my-5"
                    :disabled="isRecommending"
                    :modelWeighting.sync="modelWeighting"
                    @update:models="handleModelUpdate"
                />
            </div>

        </div>
        <div class="container-lg">
            <button class="btn btn-sm float-end btn-outline-primary d-flex align-items-center justify-content-center"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" :class="isRecommending?'disabled':''">
                <i class="bi bi-gear-fill fs-4"></i>
                <span class="fw-bold mx-2">{{ selectedRecommendationText }}</span>
                <div class="spinner-border text-primary spinner-border-sm" role="status" v-show="isRecommending">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>


            <div class="mt-5">
                <div class="my-3 mx-auto fit-content text-center">
                    <h3 class="text-primary">If you like「
                        <span v-if="recentlyPlay.length > 0 && recentlyPlay[0].name">{{ recentlyPlay[0].name }}</span>
                        」, you may also like </h3>
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
    </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue';
import {getRandomTrack} from "@/api/tracks";
import ArtistCard from "@/components/ArtistCard.vue";
import {getRecentlyPlayed, getTopTracks} from "@/api/spotify";
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
            showSidebar: true,
            isRecentlyPlayed: true,
            isTopTracks: true,
            selectedRecommendation: "weighted",
            showPieSlider: true,
            modelWeighting: [
                { name: 'Keywords', value: 33},
                { name: 'Semantics', value: 33},
                { name: 'Topics', value: 34 }
            ],
            selectedRecentlyPlayedAmount: 3,
            selectedTopTracksAmount: 3,

            lyricsForRecommend:[],

            isRecommending: true,

            recentlyPlay: [],
            topTracks:[],
            alsoListen: [],
            recommendForYou: [],
            artistMayLike: [],
            EveryoneListening: [],
        };
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
        selectedRecommendationText() {
            const options = {
                weighted: 'Weighted',
                keywords: 'Keywords',
                semantics: 'Semantics',
                topics: 'Topics'
            }
            return options[this.selectedRecommendation] || 'Select Option'
        }
    },
    methods: {
        // =============================================
        async selectRecommendation(option) {
            this.selectedRecommendation = option
            // 根据选中的推荐方法来设置 showPieSlider 的状态
            this.showPieSlider = (option === "weighted");
            await this.startRecommendation()
        },
        async selectRecentlyPlayed(option) {
            this.isRecentlyPlayed = option
            console.log(this.isRecentlyPlayed)
            await this.startRecommendation()
        },
        async selectTopTracks(option) {
            this.isTopTracks = option
            console.log(this.isTopTracks)
            await this.startRecommendation()
        },
        async handleModelUpdate(updatedModels) {
            this.modelWeighting = updatedModels;
            await this.startRecommendation()
        },


        // ==== NEEDED ======
        async getSpotifyData(){
            await this.fetchRecentlyPlay()
            await this.fetchTopTracks()
        },
        async startRecommendation(){
            this.isRecommending = true
            console.log("start Recommendation")
            // const mode = this.selectedRecommendation // weighted/keywords/semantics/topics
            const isRecentlyPlayed = this.isRecentlyPlayed
            const isTopTracks = this.isTopTracks

            if (!isRecentlyPlayed && !isTopTracks){
                this.resetRecommended()
            }else{
                const selectedRecentlyPlayedAmount = isRecentlyPlayed? this.selectedRecentlyPlayedAmount : 0
                const selectedTopTracksAmount = isTopTracks? this.selectedTopTracksAmount : 0


                const slicedRecentlyPlayed =  this.recentlyPlay.slice(0,selectedRecentlyPlayedAmount)
                const slicedTopTracks =  this.topTracks.slice(0,selectedTopTracksAmount)
                const combinedTracks = [...slicedRecentlyPlayed, ...slicedTopTracks];

                await this.fetchLyricFromGenius(combinedTracks)

                if (this.lyricsForRecommend.length>0){
                    await this.fetchAlsoListen(this.lyricsForRecommend[0])
                    await this.fetchRecommendedForYou(this.lyricsForRecommend)
                    await this.fetchArtistMayLike(this.lyricsForRecommend)
                    await this.fetchEveryoneListening()
                }
            }


            this.isRecommending = false
        },
        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed();
                this.recentlyPlay = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchTopTracks() {
            try {
                const response = await getTopTracks();
                this.topTracks = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchLyricFromGenius(tracks) {
            console.log("Getting lyrics from genius")
            let lyrics = [];
            // Use a for-of loop to correctly iterate over the items in this.recentlyPlay
            for (let track of tracks) {
                try {
                    // Assuming track has properties artist and name
                    let lyric = await getLyricsFromGenius(track.artist.name, track.name);
                    lyrics.push(lyric.data.data.lyric);  // Use push to add items to an array
                } catch (error) {
                    console.error(`Failed to fetch lyrics for ${track.name} by ${track.artist.name}:`, error);
                }
            }
            this.lyricsForRecommend = lyrics;
            console.log(this.lyricsForRecommend)
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
        resetRecommended(){
            this.alsoListen= []
            this.recommendForYou= []
            this.artistMayLike= []
            this.EveryoneListening= []
        }
    },
    async created() {
        await this.getSpotifyData()
        await this.startRecommendation()
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

