<template>
    <div class="TrackDetailmy-5 container-fluid" >
        <div v-if="track">
            <div class="page-container mx-auto"><SpotifyFrame :uri="spotifyUrl"></SpotifyFrame></div>

<!--        Track Basic Info-->
            <div class="card track-detail-container shadow page-container mx-auto rounded-bottom-0 p-2" :style="containerStyle">
                <div class="row" >
                    <div class="col-6 col-md-3 col-xl-2 m-auto">
                        <img :src="track.cover" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
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
            <div class="card shadow page-container mx-auto rounded-top-0" >
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
            <div class="card shadow my-5 page-container mx-auto p-2" >
                <div class="row">
                    <div class="col-6 col-md-3 col-xl-2 m-auto">
                        <img :src="track.artist.avatar" class="img-fluid rounded-circle">
                    </div>
                    <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-row justify-content-between mb-2">
                            <strong class="fs-2">{{ track.artist.name }}</strong>
                            <div class="d-flex text-center">
                                <div class="d-flex flex-column mx-2">
                                    <strong>Familiarity</strong>
                                    {{ (track.artist.familiarity * 100).toFixed(2) }}%
                                </div>
                                <div class="d-flex flex-column mx-2">
                                    <strong>Hotness</strong>
                                    {{ (track.artist.hotness * 100).toFixed(2) }}%
                                </div>
                            </div>

                        </div>
                        <div class="row d-flex flex-row">
                            <div class="col-auto" v-for="tag in track.tags" :key="tag.id">
                                <button class="rounded-3 btn btn-secondary my-1">{{ tag.tag.name }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!--    Lyric-->
            <div class="row row-gap-3 page-container mx-auto" >
                <div class="col-12 card shadow p-2 my-4" >
                    <h3 class="text-center">Lyric</h3>
                    <div v-if="formattedLyrics.length === 0" >
                        <div v-for="(line, index) in formattedLyrics" :key="index" class="text-center">
                            <p>{{ line }}</p>
                        </div>
                    </div>
                    <div v-else class="mx-auto">No lyric is privided for this track</div>
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
import SpotifyFrame from "@/components/SpotifyFrame.vue";
import {search} from "@/api/spotify";

export default {
    components: {SpotifyFrame, ArtistCard, TrackCard},
    data() {
        return {
            trackId: this.$route.params.id,
            track: null,
            formattedLyrics: [],
            recommendedTracks:[],
            recommendedArtists:[],
            spotifyUrl: ""
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
        async searchSpotify(keyword, type) {
            try {
                const response = await search(keyword, type);
                if (response.status === 200) {
                    this.spotifyUrl = response.data.uri;
                    console.log(this.spotifyUrl)
                } else {
                    console.error('Error search Spotify else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify:', err.message);
            }
        },
        async fetchTrackById() {
            try {
                const response = await getTrackById({ track: this.trackId });
                if (response.data.status === 200) {
                    this.track = response.data.data;
                    this.formattedLyrics = this.formatLyrics(response.data.data.lyric)
                    let keyword = `${response.data.data.name} ${response.data.data.artist.name}`
                    await this.searchSpotify(keyword, "track")

                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
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
                    console.error('Error fetching Recommended Artists:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Artists:', err.message);
            }
        },
        async fetchRecommendedTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.recommendedTracks = response.data.data;
                } else {
                    console.error('Error fetching Recommended Tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Recommended Tracks:', err.message);
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
