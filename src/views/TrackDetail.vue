<template>
    <div class="TrackDetailmy-5 container-fluid" >
        <div v-if="track">
<!--        Track Basic Info-->
            <div class="card track-detail-container shadow my-5 page-container mx-auto "  :style="containerStyle">
                <div class="row">
                    <div class="col-6 col-md-4 col-xl-3 mx-auto">
                        <img :src="track.cover" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-8 col-xl-9 d-flex flex-column justify-content-center">
                        <div>
                            <strong class="fs-2 text-white">{{ track.name }}</strong>
                            <p class="fs-5 text-white">{{ track.artist.name }}</p>
                        </div>
                        <div class="row d-flex flex-row">
                            <div class="col-auto" v-for="tag in track.tags" :key="tag.id">
                                <button class="rounded-3 btn btn-secondary my-1">{{ tag.tag.name }}</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <button class="btn btn-dark my-2">
                                    <i class="fa-solid fa-circle-play mx-2"></i>Play Track
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

    <!--Lyric and MetaData-->
            <div class="row row-gap-3 container-fluid" >
                <div class="left col-12 col-md-6 card shadow p-2 my-4" >
                    <h3 class="text-center">Lyric</h3>
                    <div v-if="formattedLyrics.length === 0" >
                        <div v-for="(line, index) in formattedLyrics" :key="index" class="text-center">
                            <p>{{ line }}</p>
                        </div>
                    </div>
                    <div v-else class="mx-auto">No lyric is privided for this track</div>
                </div>
                <div class="right col-12 col-md-6">
                    <div class="card p-2 row border-0">
                        <div class="col-12 ">
                            <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5>Artist Encyclopedia</h5>
                                </div>
                                <div class="row">
                                    <div class="col-4 col-md-3 mx-auto"><img :src="track.artist.avatar" class="img-fluid rounded-3" ></div>
                                    <div class="col-12 col-md-9">
                                        <p><strong>Artist:</strong> {{ track.artist.name }}</p>
                                        <p><strong>Familiarity:</strong> {{ (track.artist.familiarity * 100).toFixed(2) }}%</p>
                                        <p><strong>Hotness:</strong> {{ (track.artist.hotness * 100).toFixed(2) }}%</p>
                                        <div class="row d-flex flex-row">
                                            <div class="col-auto" v-for="tag in track.artist.tags" :key="tag.id">
                                                <button class="rounded-3 btn btn-secondary btn-sm my-1">{{ tag.tag.name }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card p-2 row border-0">
                        <div class="col-12 ">
                            <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5>Track Encyclopedia</h5>
                                </div>
                                <p v-if="track.album"><strong>Album:</strong> {{ track.album }}</p>
                                <p v-if="track.year"><strong>Year Published:</strong> {{ track.year }}</p>
                                <p v-if="track.duration"><strong>Duration:</strong> {{ millisecondsToMMss(track.duration) }}</p>
                                <p v-if="track.summary"><strong>Summary:</strong> {{ track.summary }}</p>
                            </div>
                    </div>
                </div>
                </div>
            </div>
    <!--Recommandation-->
            <div class="row container-fluid my-2" >
                <h3>Recommended Tracks for「{{track.name}}」</h3>
                <div class="horizontal-scroll">
                    <div class="col-4 col-md-3 col-xl-2 mx-2" v-for="track in recommendedTracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>
            </div>
            <div class="row container-fluid  my-2" >
            <h3>Recommended Tracks for「{{track.artist.name}}」</h3>
            <div class="horizontal-scroll">
                <div class="col-4 col-md-3 col-xl-2 mx-2" v-for="artist in recommendedArtists" :key="artist.id">
                    <ArtistCard :artist="artist"></ArtistCard>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {getRandomTrack, getTrackById} from "@/api/tracks";
import { millisecondsToMMss } from '@/utils/timeConverter';
import {getRecommArtist} from "@/api/artists";
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";

export default {
    components: {ArtistCard, TrackCard},
    data() {
        return {
            trackId: this.$route.params.id,
            track: null,
            formattedLyrics: [],
            recommendedTracks:[],
            recommendedArtists:[],
        };
    },
    watch: {
        '$route'(to) {
            this.trackId = to.params.id;
            this.fetchTrackById();
        }
    },
    methods: {
        millisecondsToMMss,
        async fetchTrackById() {
            try {
                const response = await getTrackById({ track: this.trackId });
                if (response.data.status === 200) {
                    this.track = response.data.data;
                    this.formattedLyrics = this.formatLyrics(response.data.data.lyric)
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        formatLyrics(lyrics) {
            return lyrics.split('\n').map(line => {
                const match = line.match(/\[([0-9:.]+)\](.*)/);
                if (match) {
                    // const time = match[1];
                    const text = match[2];
                    return `${text}`;
                }
                return line;
            });
        },
        async fetchRecommendedArtists() {
            try {
                const response = await getRecommArtist();
                if (response.data.status === 200) {
                    this.recommendedArtists = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchRecommendedTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.recommendedTracks = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        }
    },
    created() {
        this.fetchTrackById();
        this.fetchRecommendedArtists();
        this.fetchRecommendedTracks()
    },
    computed: {
        containerStyle() {
            if (!this.track) return {};
            return {
                background: `url(${this.track.artist.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right'
            };
        }
    }
};
</script>

<style>
.track-detail-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    padding: 20px;
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
