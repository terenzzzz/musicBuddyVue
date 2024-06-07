<template>
    <div class="ArtistDetail" >
        <AlertComponents :title="isValidMongoId(this.artistId) ? 'The Metadata is Provided by MusicBuddy' : 'The Metadata is Provided by Spotify'"></AlertComponents>
        <div v-if="artist" class="page-container mx-auto my-5">

            <div class="card shadow mt-5 p-2 rounded-bottom-0 p-4" >
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

            <!--Recommandation-->
            <div class="mt-5">
                <h3>Similar Artists</h3>
                <div v-if="similarArtist.length > 0">
                    <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                    <div class="horizontal-scroll">
                        <div class="col-3 col-md-2 mx-2" v-for="artist in similarArtist" :key="artist.id">
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

            <!--Tracks-->
            <div class="mt-5">
                <h3>Top Tracks</h3>
                <div v-if="tracks.length > 0">
                    <div class="row">
                        <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
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
import { millisecondsToMMss } from '@/utils/timeConverter';
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import {getArtist, getSimilarArtists} from "@/api/artists";
import {getTracksByArtist} from "@/api/tracks";
import {getArtistRelatedArtists, getSpotifyArtistById} from "@/api/spotify";
import isValidMongoId from "@/utils/isValidMongoId";
import AlertComponents from "@/components/AlertComponents.vue";

export default {
    components: {AlertComponents, ArtistCard, TrackCard},
    data() {
        return {
            artistId: this.$route.params.id,
            artist: null,
            tracks: [],
            similarArtist: [],
            spotifySimilarArtist: [],
        };
    },
    created() {
        if (isValidMongoId(this.artistId)){
            this.fetchArtistById();
            this.fetchSimilarArtists();
            this.fetchTracksByArtist();
        }else{
            this.fetchSpotifyMetadata();
            this.fetchSpotifySimilarArtists();
        }
    },
    watch: {
        '$route'(to) {
            this.artistId = to.params.id;
            if (isValidMongoId(this.artistId)){
                this.fetchArtistById();
                this.fetchSimilarArtists();
                this.fetchTracksByArtist();
            }else{
                this.fetchSpotifyMetadata();
                this.fetchSpotifySimilarArtists();
            }
        }
    },
    methods: {
        openWindow: function(url) {
            window.open(url, '_blank');
        },
        isValidMongoId,
        millisecondsToMMss,
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
                } else {
                    console.error('Error fetching Track By Id:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching Track By Id:', err.message);
            }
        },

        async fetchTracksByArtist() {
            try {
                const response = await getTracksByArtist(this.artistId);
                if (response.data.status === 200) {
                    this.tracks = response.data.data;
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
    },

    computed: {

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