<template>
    <div class="px-1 px-sm-3 px-md-5 my-3">
        <div class="row px-3 px-md-5">
            <div class="card p-3 rounded-5">
                <div class="btn-group d-flex justify-content-end container align-items-center" role="group">
                    <input type="radio" class="btn-check" id="weighted" value="weighted" name="recommendation" v-model="selectedRecommendation" checked>
                    <label class="btn btn-outline-primary" for="weighted">Weighted</label>

                    <input type="radio" class="btn-check" id="tfidf" value="tfidf" name="recommendation" v-model="selectedRecommendation">
                    <label class="btn btn-outline-primary" for="tfidf">TF-IDF</label>

                    <input type="radio" class="btn-check" id="w2v" value="word2vec" name="recommendation" v-model="selectedRecommendation">
                    <label class="btn btn-outline-primary" for="w2v">Word 2 Vec</label>

                    <input type="radio" class="btn-check" id="lda" value="lda" name="recommendation" v-model="selectedRecommendation">
                    <label class="btn btn-outline-primary" for="lda">LDA</label>

                    <i class="fa-solid ms-3 text-primary" :class="(showPieSlider)?'fa-chevron-down':'fa-chevron-up'"
                       v-show="selectedRecommendation==='weighted'" @click="showPieSlider=!showPieSlider"></i>
                </div>


                <transition name="fade" mode="out-in">
                    <PieSlider v-show="showPieSlider" class="pie-slider"/>
                </transition>
            </div>
        </div>



        <div class="mt-5">
            <h3 class="my-3 red-bottom mx-auto fit-content">Recently Play</h3>
            <div class="horizontal-scroll">
                <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in recentlyPlay" :key="track.id">
                    <TrackCard :track="track"></TrackCard>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <h3 class="my-3 red-bottom mx-auto fit-content">
                If you like「
                <span v-if="recentlyPlay.length > 0 && recentlyPlay[0].name">{{ recentlyPlay[0].name }}</span>
                」, you may also like
            </h3>
            <div class="horizontal-scroll" v-if="alsoListen.length>0">
                <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in alsoListen" :key="track.id">
                    <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>

        <div class="mt-5">
            <h3 class="my-3 red-bottom mx-auto fit-content">Recommended for you</h3>
            <div class="horizontal-scroll"  v-if="recommendForYou.length>0">
                <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in recommendForYou" :key="track.id">
                    <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
                </div>
            </div>
            <LoadingSpinner title="We are finding the music that suits you best..." v-else></LoadingSpinner>
        </div>

        <div class="mt-5">
            <h3 class="my-3 red-bottom mx-auto fit-content">Artist May Liked</h3>
            <div class="horizontal-scroll">
                <div class="col-3 col-md-2 col-xxl-1  mx-2" v-for="artist in artistMayLike" :key="artist.id">
                  <ArtistCard :artist="artist"></ArtistCard>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <h3 class="my-3 red-bottom mx-auto fit-content">Everyone's Listening</h3>
            <div class="horizontal-scroll">
                <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in EveryoneListening" :key="track.id">
                  <TrackCard :track="track"></TrackCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue';
import {getRandomTrack} from "@/api/tracks";
import {getRecommArtist} from "@/api/artists";
import ArtistCard from "@/components/ArtistCard.vue";
import {getRecentlyPlayed} from "@/api/spotify";
import {
    getLDARecommendByLyrics,
    getTfidfRecommendByLyrics,
    getW2VRecommendByLyrics,
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
            lyricsForRecentlyPlay:[]
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


        }
    },
    methods: {
        async startRecommendation(){
          if (this.recentlyPlay.length>0){
              await this.fetchLyricFromGenius()
              await this.fetchAlsoListen(this.lyricsForRecentlyPlay[0])
              await this.fetchRecommendedForYou(this.lyricsForRecentlyPlay)
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
        async fetchLyricFromGenius() {
            let lyrics = [];

            // Use a for-of loop to correctly iterate over the items in this.recentlyPlay
            for (let track of this.recentlyPlay.slice(0,5)) {
                try {
                    // Assuming track has properties artist and name
                    let lyric = await getLyricsFromGenius(track.artist.name, track.name);
                    lyrics.push(lyric.data.data.lyric);  // Use push to add items to an array
                } catch (error) {
                    console.error(`Failed to fetch lyrics for ${track.name} by ${track.artist.name}:`, error);
                }
            }

            console.log(lyrics);  // Use console.log to print in JavaScript
            this.lyricsForRecentlyPlay = lyrics;
        },
        async fetchAlsoListen(lyric) {
            let response = {}
            try {
                if (this.selectedRecommendation === "tfidf"){
                    response = await getTfidfRecommendByLyrics(lyric)
                }else if (this.selectedRecommendation === "word2vec"){
                    response = await getW2VRecommendByLyrics(lyric)
                }else if (this.selectedRecommendation === "lda"){
                    response = await getLDARecommendByLyrics(lyric)
                }else {
                    response = await getWeightedRecommendByLyrics(lyric)
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
                if (this.selectedRecommendation === "tfidf"){
                    response = await getTfidfRecommendByLyrics(lyric)
                }else if (this.selectedRecommendation === "word2vec"){
                    response = await getW2VRecommendByLyrics(lyric)
                }else if (this.selectedRecommendation === "lda"){
                    response = await getLDARecommendByLyrics(lyric)
                }else {
                    response = await getWeightedRecommendByLyrics(lyric)
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


        async fetchArtistMayLike() {
            try {
                const response = await getRecommArtist();
                if (response.data.status === 200) {
                    this.artistMayLike = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
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
        }
    },
    created() {
        this.fetchRecentlyPlay()
        this.fetchArtistMayLike()
        this.fetchEveryoneListening()
    }
}
</script>


<style>
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
</style>

