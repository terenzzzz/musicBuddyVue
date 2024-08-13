<template>
    <div class="ArtistDetail container-lg" >
        <AlertComponents :title="isValidMongoId(this.artistId) ? 'The Metadata is Provided by MusicBuddy' : 'The Metadata is Provided by Spotify'"></AlertComponents>
        <div v-if="artist" class="page-container mx-auto my-5">

            <div class="card shadow mt-5 p-2 rounded-bottom-0 p-4" >
                <div class="d-flex justify-content-end my-2" v-if="isValidMongoId(this.artistId)">
                    <RateBtn :rating="artistRating" :on-rate="updateRate" :item-type="itemTypes.ARTIST"></RateBtn>
                </div>
                <div class="row">
                    <div class="col-6 col-md-3 col-xl-2 m-auto ">
                        <img :src="artist.avatar || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid rounded-circle">
                    </div>
                    <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-row justify-content-between mb-2">
                            <strong class="fs-2">{{ artist.name }}</strong>
                            <div class="d-flex text-center">
                                <div class="d-flex flex-column mx-2" v-if="artist.familiarity">
                                    <strong>Familiarity</strong>
                                    {{ (artist.familiarity * 100).toFixed(2) }}%
                                </div>
                                <div class="d-flex flex-column mx-2" v-if="artist.hotness">
                                    <strong>Hotness</strong>
                                    {{ (artist.hotness * 100).toFixed(2) }}%
                                </div>
                                <div class="d-flex flex-column mx-2" v-if="artist.published">
                                    <strong>Published</strong>
                                    {{ artist.published }}
                                </div>
                            </div>

                        </div>
                        <div class="row d-flex flex-row" v-if="artist.tags">
                            <div class="col-auto" v-for="tag in artist.tags" :key="tag.id">
                                <TagButton :tag="tag.tag"></TagButton>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-success my-2 d-inline" @click="openWindow(spotifyArtistUrl)">
                                    <i class="fa-brands fa-spotify mx-2"></i>More In Spotify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card shadow rounded-top-0 p-2" v-if="artist.summary">
                <div class="row py-3">
                    <div class="col-12">
                        <strong>Introduction: </strong>
                        {{ artist.summary }}
                    </div>
                </div>
            </div>

            <!--    Lyric Analysis -->
            <LyricAnalysis :lyric-top-words="lyricTopWords" :chart-data="chartData" :chart-labels="chartLabels" :chart-label-explain="chartLabelsExplain"
                           labels="Topic Probability Distribution"></LyricAnalysis>

            <!--Tracks-->
            <div class="mt-5">
                <h3>Top Tracks</h3>
                <div v-if="tracks.length > 0">
                    <div class="row">
                        <div class="col-3 col-md-2" v-for="track in tracks" :key="track.id">
                            <TrackCard :track="track"></TrackCard>
                        </div>
                    </div>
                </div>
            </div>

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


            <div class="mt-5">
                <div>
                    <h3 class="red-bottom d-inline me-2">Similar Artists</h3>
                </div>
                <LoopSwiper v-if="similarArtist.length>0" :artists="similarArtist" class="mt-2"></LoopSwiper>
                <LoadingSpinner title="We are finding the music that suits you best..." v-else-if="isRecommending"></LoadingSpinner>
                <ErrorPlaceholderHorizontal
                    v-else
                    title="No Content Found">
                </ErrorPlaceholderHorizontal>
            </div>

            <div class="mt-5" v-if="!isValidMongoId(artistId)">
                <div>
                    <h3 class="red-bottom d-inline me-2">Similar Artists from Spotify</h3>
                </div>
                <LoopSwiper v-if="spotifySimilarArtist.length>0" :artists="spotifySimilarArtist" class="mt-2"></LoopSwiper>
                <LoadingSpinner title="We are finding the music that suits you best..." v-else-if="isRecommendingSpotify"></LoadingSpinner>
                <ErrorPlaceholderHorizontal
                    v-else
                    title="No Content Found">
                </ErrorPlaceholderHorizontal>
            </div>

            <div >
                <div>
                    <h3 class="red-bottom d-inline me-2">Similar Tracks</h3>
                </div>
                <div class="row mt-2" v-if="similarTracks.length>0">
                    <div class="col-4 col-md-2" v-for="track in similarTracks" :key="track.id">
                        <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                    </div>
                </div>
                <LoadingSpinner title="We are finding the music that suits you best..." v-else-if="isRecommendingTrack"></LoadingSpinner>
                <ErrorPlaceholderHorizontal
                    v-else
                    title="No Content Found">
                </ErrorPlaceholderHorizontal>
            </div>


        </div>
    </div>
</template>

<script>
import TrackCard from "@/components/TrackCard.vue";
import {getArtist} from "@/api/artists";
import {getLyricTopWordsByLyric, getTracksByArtist, getTrackTopicByLyric} from "@/api/tracks";
import {getArtistRelatedArtists, getSpotifyArtistById, searchSpotifyArtists} from "@/api/spotify";
import isValidMongoId from "@/utils/isValidMongoId";
import AlertComponents from "@/components/AlertComponents.vue";
import RateBtn from "@/components/RateBtn.vue";
import {addRating, deleteRating, getRating, itemTypes} from "@/api/ratings";
import {
    getLDARecommendArtistsByArtist, getLDARecommendArtistsByLyrics, getLDARecommendByLyrics,
    getTfidfRecommendArtistsByArtist, getTfidfRecommendArtistsByLyrics, getTfidfRecommendByLyrics,
    getW2VRecommendArtistsByArtist, getW2VRecommendArtistsByLyrics, getW2VRecommendByLyrics,
    getWeightedRecommendArtistsByArtist, getWeightedRecommendArtistsByLyrics, getWeightedRecommendByLyrics
} from "@/api/recommend";
import PieSlider from "@/components/PieSlider.vue";
import {getLyricsFromGenius} from "@/api/genius";
import TagButton from "@/components/TagButton.vue";
import LoopSwiper from "@/components/LoopSwiper.vue";
import LyricAnalysis from "@/components/LyricAnalysis.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorPlaceholderHorizontal from "@/components/ErrorPlaceholderHorizontal.vue";

export default {
    components: {
        ErrorPlaceholderHorizontal,
        LoadingSpinner, LyricAnalysis, LoopSwiper, TagButton, PieSlider, RateBtn, AlertComponents, TrackCard},
    data() {
        return {
            showPieSlider: true,
            modelWeighting: [
                { name: 'Keywords', value: 33},
                { name: 'Semantics', value: 33},
                { name: 'Topics', value: 34 }
            ],
            selectedRecommendation: "weighted",
            artistId: this.$route.params.id,
            artist: null,
            tracks: [],
            similarArtist: [],
            spotifyArtistUrl: "",
            artistRating: 0,
            spotifySimilarArtist:[],
            lyricsForTracks:[], // Tracks Lyrics for Spotify

            similarTracks: [],

            allTracksLyrics:[], // Artist Tracks Lyrics for database
            lyricTopWords: [],
            chartLabels: [],
            chartData: [],
            chartLabelsExplain:[],

            isRecommending: true,
            isRecommendingSpotify: true,
            isRecommendingTrack: true
        };
    },
    async created() {
        if (isValidMongoId(this.artistId)) {
            await this.fetchArtistById();
            await this.fetchRating();
            await this.fetchTracksByArtist();
            await this.fetchSimilarArtistsByArtist();
            await this.fetchSimilarTracksByLyrics(this.allTracksLyrics);
        } else {
            await this.fetchSpotifyMetadata();
            await this.fetchSpotifySimilarArtists();
            if (this.tracks.length > 0) {
                await this.fetchLyricFromGenius()
                await this.fetchSimilarArtistsByLyrics()
                await this.fetchSimilarTracksByLyrics(this.lyricsForTracks);
            }
        }

    },

    watch: {
        async '$route'(to) {
            this.artistId = to.params.id;
            if (isValidMongoId(this.artistId)) {
                await this.fetchArtistById();
                await this.fetchRating();
                await this.fetchTracksByArtist();
                await this.fetchSimilarArtistsByArtist();
                await this.fetchSimilarTracksByLyrics(this.allTracksLyrics);
            } else {
                await this.fetchSpotifyMetadata();
                await this.fetchSpotifySimilarArtists();
                if (this.tracks.length > 0) {
                    await this.fetchLyricFromGenius()
                    await this.fetchSimilarArtistsByLyrics()
                    await this.fetchSimilarTracksByLyrics(this.lyricsForTracks);
                }
            }


        },
        async selectedRecommendation() {
            // 获取当前选中的推荐方法
            const recommendationType = this.selectedRecommendation;
            // 根据选中的推荐方法来设置 showPieSlider 的状态
            this.showPieSlider = recommendationType === "weighted";
            if (isValidMongoId(this.artistId)) {
                await this.fetchSimilarArtistsByArtist();
            }else{
                await this.fetchSimilarArtistsByLyrics();
            }
        },
    },
    methods: {
        async handleModelUpdate(updatedModels) {
            this.modelWeighting = updatedModels;
            if (isValidMongoId(this.artistId)){
                const artistResponse = await getWeightedRecommendArtistsByArtist(this.artistId,this.calculatedWeighting[0],
                    this.calculatedWeighting[1], this.calculatedWeighting[2])
                if (artistResponse.status === 200) {
                    this.similarArtist = artistResponse.data.data;
                }

                const trackResponse = await getWeightedRecommendByLyrics(this.allTracksLyrics,this.calculatedWeighting[0],
                this.calculatedWeighting[1], this.calculatedWeighting[2])
                if (trackResponse.status === 200) {
                    this.similarTracks = trackResponse.data.data;
                }
            }else{
                const artistResponse = await getWeightedRecommendArtistsByLyrics(this.lyricsForTracks,this.calculatedWeighting[0],
                    this.calculatedWeighting[1], this.calculatedWeighting[2])
                if (artistResponse.status === 200) {
                    this.similarArtist = artistResponse.data.data;
                }
                const trackResponse = await getWeightedRecommendByLyrics(this.lyricsForTracks,this.calculatedWeighting[0],
                    this.calculatedWeighting[1], this.calculatedWeighting[2])
                if (trackResponse.status === 200) {
                    this.similarTracks = trackResponse.data.data;
                }
            }

        },
        async fetchLyricFromGenius() {
            let lyrics = [];
            for (let track of this.tracks.slice(0,5)) {
                try {
                    // Assuming track has properties artist and name
                    let lyric = await getLyricsFromGenius(track.artist.name, track.name);
                    lyrics.push(lyric.data.data.lyric);  // Use push to add items to an array
                } catch (error) {
                    console.error(`Failed to fetch lyrics for ${track.name} by ${track.artist.name}:`, error);
                }
            }
            this.lyricsForTracks = lyrics;
            console.log(this.lyricsForTracks)
        },
        async searchSpotify(keyword) {
            // 访问本地数据库时,查询spotify获取spotify跳转连接
            try {
                const response = await searchSpotifyArtists(keyword);
                if (response.status === 200) {
                    let firstTrack = response.data[0]
                    this.spotifyArtistUrl = firstTrack.external_urls
                } else {
                    console.error('Error search Spotify else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify:', err.message);
            }
        },
        async updateRate(itemType,rating) {
            let response = null
            if (rating === this.artistRating){
                response = await deleteRating(this.artistId, itemType)
            }else {
                response = await addRating(this.artistId, itemType, rating)
            }
            if (response.status === 200) {
                this.artistRating = response.data.rate
            } else {
                alert("Rate Artist Failed")
            }
        },
        async fetchRating() {
            try {
                const response =  await getRating(this.artistId, itemTypes.ARTIST)
                if (response.status === 200 && response.data?.data) {
                    this.artistRating = response.data.data.rate ?? 0;
                }
            } catch (err) {
                console.error('Error fetching ratings:', err.message);
            }
        },
        openWindow: function(url) {
            window.open(url, '_blank');
        },
        isValidMongoId,
        async fetchSpotifyMetadata() {
            try {
                const response = await getSpotifyArtistById(this.artistId);
                if (response.status === 200) {
                    this.tracks = response.data.tracks;
                    this.artist = response.data.artist;
                } else {
                    console.error('Error search Spotify else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify:', err.message);
            }
        },
        async fetchArtistById() {
            try {
                const response = await getArtist(this.artistId);
                if (response.data.status === 200) {
                    this.artist = response.data.data;
                    await this.searchSpotify(this.artist.name)
                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
            }
        },
        async fetchLyricTopWords() {
            try {
                const response = await getLyricTopWordsByLyric(this.allTracksLyrics);
                if (response.data.status === 200) {
                    this.lyricTopWords = response.data.data;
                } else {
                    console.error('Error fetching lyricTopWords By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching lyricTopWords By Id:', err.message);
            }
        },
        async fetchTracksByArtist() {
            try {
                const response = await getTracksByArtist(this.artistId);
                if (response.data.status === 200) {
                    this.tracks = response.data.data;
                    this.allTracksLyrics = this.tracks.map(track => track.lyric);
                    await this.fetchLyricTopWords()
                    await this.fetchTrackTopic();
                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
            }
        },
        async fetchSimilarArtistsByArtist() {
            this.isRecommending = true;
            try {
                let response = {}
                try {
                    if (this.selectedRecommendation === "keywords"){
                        response = await getTfidfRecommendArtistsByArtist(this.artistId)
                    }else if (this.selectedRecommendation === "semantics"){
                        response = await getW2VRecommendArtistsByArtist(this.artistId)
                    }else if (this.selectedRecommendation === "topics"){
                        response = await getLDARecommendArtistsByArtist(this.artistId)
                    }else {
                        response = await getWeightedRecommendArtistsByArtist(this.artistId,this.calculatedWeighting[0],
                            this.calculatedWeighting[1], this.calculatedWeighting[2])
                    }
                    if (response.data.status === 200) {
                        this.similarArtist = response.data.data;
                    } else {
                        console.error('Error Recommended artists:', response.data.message);
                    }
                } catch (err) {
                    console.error('Error Recommended artists:', err.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
            this.isRecommending = false;
        },
        async fetchSimilarArtistsByLyrics() {
            this.isRecommending = true;
            try {
                let response = {}
                try {
                    if (this.selectedRecommendation === "keywords"){
                        response = await getTfidfRecommendArtistsByLyrics(this.lyricsForTracks)
                    }else if (this.selectedRecommendation === "semantics"){
                        response = await getW2VRecommendArtistsByLyrics(this.lyricsForTracks)
                    }else if (this.selectedRecommendation === "topics"){
                        response = await getLDARecommendArtistsByLyrics(this.lyricsForTracks)
                    }else {
                        response = await getWeightedRecommendArtistsByLyrics(this.lyricsForTracks,this.calculatedWeighting[0],
                            this.calculatedWeighting[1], this.calculatedWeighting[2])
                    }
                    if (response.data.status === 200) {
                        this.similarArtist = response.data.data;
                    } else {
                        console.error('Error Recommended artists:', response.data.message);
                    }
                } catch (err) {
                    console.error('Error Recommended artists:', err.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
            this.isRecommending = false;
        },
        async fetchSimilarTracksByLyrics(lyric) {
            this.isRecommendingTrack = true;
            try {
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
                        this.similarTracks = response.data.data;
                    } else {
                        console.error('Error Recommended tracks:', response.data.message);
                    }
                } catch (err) {
                    console.error('Error Recommended tracks:', err.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
            this.isRecommendingTrack = false;
        },
        async fetchSpotifySimilarArtists() {
            this.isRecommendingSpotify = true
            try {
                const response = await getArtistRelatedArtists(this.artistId);
                if (response.status === 200) {
                    this.spotifySimilarArtist = response.data;
                } else {
                    console.error('Error fetching spotify Recommended Artists:', response.message);
                }
            } catch (err) {
                console.error('Error fetching spotify Recommended Artists:', err.message);
            }
            this.isRecommendingSpotify = false
        },
        async fetchTrackTopic() {
            try {
                const response = await getTrackTopicByLyric(this.allTracksLyrics);
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

    },

    computed: {
        itemTypes() {
            return itemTypes
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

<style>

</style>