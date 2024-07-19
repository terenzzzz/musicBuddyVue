<template>
    <div class="ArtistDetail" >
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
                                <button class="rounded-3 btn btn-secondary my-1">{{ tag.tag.name }}</button>
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
                        <strong>Introducation: </strong>
                        {{ artist.summary }}
                    </div>
                </div>
            </div>

            <!--    Lyric Analysis -->
            <div class="card shadow p-3 my-3" >
                <div class="row" >
                    <div class="col-12 col-lg-6" v-if="chartLabels.length>0"><canvas ref="radarChart"></canvas></div>
                    <div class="col-12 col-lg-6">
                        <div class="row d-flex flex-row align-items-center" v-if="lyricTopWords.length>0">
                            <strong>Keyword:</strong>
                            <div class="col-auto" v-for="word in lyricTopWords" :key="word.id" >
                                <button class="rounded-3 btn btn-secondary my-1">{{ word.word }}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!--Recommandation-->
            <div class="mt-5">
                <h3>Similar Artists</h3>
                <div v-if="similarArtist.length > 0">
                    <div class="horizontal-scroll">
                        <div class="col-3 col-md-2 mx-2" v-for="artist in similarArtist" :key="artist.id">
                            <ArtistCard :artist="artist"></ArtistCard>
                        </div>
                    </div>
                </div>
                <div v-if="spotifySimilarArtist.length > 0">
                    <div class="horizontal-scroll">
                        <div class="col-3 col-md-2 mx-2" v-for="artist in spotifySimilarArtist" :key="artist.id">
                            <ArtistCard :artist="artist"></ArtistCard>
                        </div>
                    </div>
                </div>

            </div>

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
        </div>
    </div>
</template>

<script>
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import {getArtist, getSimilarArtists} from "@/api/artists";
import {getLyricTopWordsByLyric, getTracksByArtist, getTrackTopicByLyric} from "@/api/tracks";
import {getArtistRelatedArtists, getSpotifyArtistById, searchSpotifyArtists} from "@/api/spotify";
import isValidMongoId from "@/utils/isValidMongoId";
import AlertComponents from "@/components/AlertComponents.vue";
import RateBtn from "@/components/RateBtn.vue";
import {addRating, getRating, itemTypes} from "@/api/ratings";
import Chart from "chart.js";

export default {
    components: {RateBtn, AlertComponents, ArtistCard, TrackCard},
    data() {
        return {
            artistId: this.$route.params.id,
            artist: null,
            tracks: [],
            similarArtist: [],
            spotifySimilarArtist: [],
            spotifyArtistUrl: "",
            artistRating: 0,

            allTracksLyrics:[],
            lyricTopWords: [],
            chartLabels: [],
            chartData: [],
        };
    },
    created() {
        if (isValidMongoId(this.artistId)){
            this.fetchArtistById();
            this.fetchRating()
        }else{
            this.fetchSpotifyMetadata();
            this.fetchSpotifySimilarArtists();
        }
        this.fetchSimilarArtists();
        this.fetchTracksByArtist();
    },
    watch: {
        '$route'(to) {
            this.artistId = to.params.id;
            if (isValidMongoId(this.artistId)){
                this.fetchArtistById();
                this.fetchRating()
            }else{
                this.fetchSpotifyMetadata();
                this.fetchSpotifySimilarArtists();
            }
            this.fetchSimilarArtists();
            this.fetchTracksByArtist();
        }
    },
    methods: {
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
            const response = await addRating(this.artistId, itemType, rating)
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
        async fetchSimilarArtists() {
            try {
                const response = await getSimilarArtists(this.artistId);
                if (response.data.status === 200) {
                    this.similarArtist = response.data.data;
                } else {
                    console.error('Error fetching Recommended Artists:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
        },
        async fetchSpotifySimilarArtists() {
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
        },
        async fetchTrackTopic() {
            try {
                const response = await getTrackTopicByLyric(this.allTracksLyrics);
                if (response.status === 200) {
                    const labels = response.data.data.map(topic => topic.top_words.slice(0, 5).join(','));
                    const data = response.data.data.map(topic => Number((topic.probability * 100).toFixed(2)));
                    this.chartLabels = labels
                    this.chartData = data
                    this.$nextTick(() => {
                        this.createChart()
                    })
                } else {
                    this.chartLabels = []
                    this.chartData = []
                    console.error('Error fetching Track Topic:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track Topic:', err.message);
            }
        },
        createChart() {
            const ctx = this.$refs.radarChart.getContext('2d')
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
        }
    },

    computed: {
        itemTypes() {
            return itemTypes
        }

    }
};
</script>

<style>

</style>