<template>
    <div class="TrackDetail" >
        <AlertComponents :title="isValidMongoId(this.trackId) ? 'The Metadata is Provided by MusicBuddy' : 'The Metadata is Provided by Spotify'"></AlertComponents>
        <div v-if="track">
            <div class="mt-5 px-1 px-md-3 px-lg-5"><SpotifyFrame v-if="spotifyUri" :uri="spotifyUri"></SpotifyFrame></div>
            <div class="px-1 px-md-3 px-lg-5">
                <!--        Track Basic Info-->
                <div class="card track-detail-container shadow rounded-bottom-0 p-3" :style="containerStyle">
                    <div class="d-flex justify-content-end" v-if="isValidMongoId(this.trackId)">
                        <RateBtn :rating="trackRating" :on-rate="updateRate" :item-type="itemTypes.TRACK"></RateBtn>
                    </div>
                    <div class="row" >
                        <div class="col-6 col-md-3 col-xl-2 m-auto">
                            <img :src="this.track.cover || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid">
                        </div>
                        <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
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
                                    <button class="btn btn-dark my-2" @click="openWindow(spotifyTrackUrl)">
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
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <button class="btn btn-dark my-2" @click="openWindow(spotifyArtistUrl)">
                                        <i class="fa-brands fa-spotify mx-2"></i>Open In Spotify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--    Lyric-->
                <div class="row row-gap-3 " >
                    <div class="col-12 card shadow p-5 my-2" >
                        <h3 class="text-center">Lyric</h3>
                        <div v-if="formattedLyrics.length>0" >
                            <div v-for="(line, index) in formattedLyrics" :key="index" class="text-center">
                                <p>{{ line }}</p>
                            </div>
                            <div class="row d-flex flex-row" v-if="track.tags">
                                <strong>Keyword:</strong>
                                <div class="col-auto" v-for="word in lyricTopWords" :key="word.id" >
                                    <button class="rounded-3 btn btn-secondary my-1">{{ word }}</button>
                                </div>
                            </div>

                        </div>
                        <div v-else class="mx-auto">No lyric is privided for this track</div>
                    </div>
                </div>

                <!--Recommandation-->
                <div >
                    <div class="row my-3">
                        <h3>Recommended Tracks for「{{track.name}}」</h3>
                        <div v-if="recommendedTracks.length > 0">
                            <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                            <div class="horizontal-scroll">
                                <div class="col-3 col-md-2 mx-2" v-for="track in recommendedTracks" :key="track.id">
                                    <TrackCard :track="track"></TrackCard>
                                </div>
                            </div>
                        </div>
                        <div v-if="spotifyRecommendedTracks.length > 0">
                            <AlertComponents :title="'The Result Below is Provided by Spotify'"></AlertComponents>
                            <div class="horizontal-scroll">
                                <div class="col-3 col-md-2 mx-2" v-for="track in spotifyRecommendedTracks" :key="track.id">
                                    <TrackCard :track="track"></TrackCard>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row my-3">
                        <h3>Recommended Artists for「{{track.artist.name}}」</h3>
                        <div v-if="recommendedArtists.length > 0">
                            <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                            <div class="horizontal-scroll">
                                <div class="col-3 col-md-2 mx-2" v-for="artist in recommendedArtists" :key="artist.id">
                                    <ArtistCard :artist="artist"></ArtistCard>
                                </div>
                            </div>
                        </div>
                        <div v-if="spotifySimilarArtist.length > 0">
                            <AlertComponents :title="'The Result Below is Provided by Spotify'"></AlertComponents>
                            <div class="horizontal-scroll">
                                <div class="col-3 col-md-2 mx-2" v-for="artist in spotifySimilarArtist" :key="artist.id">
                                    <ArtistCard :artist="artist"></ArtistCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <empty-placeholder></empty-placeholder>
        </div>
    </div>
</template>

<script>
import {getLyricTopWords, getRandomTrack, getTrackById} from "@/api/tracks";
import { millisecondsToMMss } from '@/utils/timeConverter';
import {getRecommArtist} from "@/api/artists";
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import SpotifyFrame from "@/components/SpotifyFrame.vue";
import {getSpotifyTrackById, searchSpotifyTracks} from "@/api/spotify";
import isValidMongoId from "@/utils/isValidMongoId";
import AlertComponents from "@/components/AlertComponents.vue";
import TagButton from "@/components/TagButton.vue";
import RateBtn from "@/components/RateBtn.vue";
import {addRating, getRating, itemTypes} from "@/api/ratings";
import EmptyPlaceholder from "@/components/EmptyPlaceholder.vue";

export default {
    components: {EmptyPlaceholder, TagButton, AlertComponents, SpotifyFrame, ArtistCard, TrackCard, RateBtn},
    data() {
        return {
            trackId: this.$route.params.id,
            track: null,
            formattedLyrics: [],
            recommendedTracks:[],
            spotifyRecommendedTracks:[],
            recommendedArtists:[],
            spotifySimilarArtist:[],
            spotifyUri: "",
            spotifyTrackUrl: "",
            spotifyArtistUrl: "",
            lyricTopWords: [],

            trackRating: 0,
            artistRating: 0,
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
        await this.fetchRecommendedTracks()
    },
    watch: {
        '$route'(to) {
            this.trackId = to.params.id;
            if (isValidMongoId(this.trackId)){
                this.fetchTrackById();
            }else{
                this.fetchSpotifyMetadata();
            }
        }
    },
    methods: {
        async updateRate(itemType,rating) {
            let response = null

            switch (itemType) {
                case itemTypes.TRACK:
                    response = await addRating(this.trackId, itemType, rating)
                    if (response.status === 200) {
                        this.trackRating = response.data.rate
                    } else {
                        alert("Rate Track Failed")
                    }
                    break
                case itemTypes.ARTIST:
                    response = await addRating(this.track.artist._id, itemType, rating)
                    if (response.status === 200) {
                        this.artistRating = response.data.rate
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


        openWindow: function(url) {
            window.open(url, '_blank');
        },
        isValidMongoId,
        millisecondsToMMss,
        async fetchSpotifyMetadata() {
            try {
                const response = await getSpotifyTrackById(this.trackId);
                if (response.status === 200) {
                    this.track = response.data;
                    this.spotifyUri = response.data.uri;
                    this.formattedLyrics = this.formatLyrics(response.data.lyric)
                    this.spotifyTrackUrl = response.data.external_urls
                    this.spotifyArtistUrl = response.data.artist.external_urls
                } else {
                    console.error('Error search Spotify Metadata else:', response.data.message);
                }
            } catch (err) {
                console.error('Error search Spotify Metadata:', err.message);
            }
        },

        async searchSpotify(keyword, type) {
            try {
                const response = await searchSpotifyTracks(keyword, type);
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
                const response = await getLyricTopWords(this.trackId);
                if (response.data.status === 200) {
                    this.lyricTopWords = response.data.data.topwords;
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
                    await this.searchSpotify(keyword, "track")
                    await this.fetchLyricTopWords(this.trackId)

                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
            }
        },
        formatLyrics(lyrics) {
            lyrics = lyrics.lyric? lyrics.lyric : lyrics
            return lyrics.split('\n')
                .map(line => {
                    const match = line.match(/\[([0-9:.]+)\](.*)/);
                    if (match) {
                        const text = match[2].replace(/[^a-zA-Z\s]/g, '').trim(); // Remove non-English characters and trim
                        return text;
                    }
                    return line.replace(/[^a-zA-Z\s]/g, '').trim(); // Remove non-English characters and trim
                })
                .filter(line => line !== ''); // Filter out possible empty lines
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
