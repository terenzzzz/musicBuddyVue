<template>
    <div class="profile">
        <div v-if="user" class="my-3">
            <div class="row d-flex justify-content-end container-fluid">
                <div class="col-12 col-sm-6 col-md-4 d-flex justify-content-end">
                    <button :class="['mb-2', 'btn', isSpotifyConnected ? 'btn-success text-white' : 'btn-outline-secondary']" @click="loginWithSpotify">
                        <i class="fa-brands fa-spotify"></i> {{ isSpotifyConnected ? 'Connected to Spotify' : 'Connect to Spotify' }}
                    </button>
                </div>
            </div>


            <div class="w-75 mx-auto my-3">
                <div class="row d-flex justify-content-center my-5">
                    <div class="col-4 col-md-3 col-xl-2 d-flex flex-column justify-content-center text-center">
                        <div class="ratio ratio-1x1"><img :src="getAvatarUrl(user.avatar)" class="rounded-circle img-fluid object-fit-cover" ></div>
                        <strong>{{ user.name }}</strong>
                    </div>
                </div>

<!--                    <div class="row w-75 mx-auto">-->
<!--                        <div class="col-6 d-flex justify-content-center">-->
<!--                            <HeatMap></HeatMap>-->
<!--                        </div>-->
<!--                    </div>-->

                <div class="card shadow rounded-5">
                    <div class="row text-center my-3">
                        <div class="col-4 d-flex flex-column">
                            <p><strong>309</strong></p>
                            <p class="text-muted">Songs Listened</p>
                        </div>
                        <div class="col-4 d-flex flex-column">
                            <p><strong>309</strong></p>
                            <p class="text-muted">Songs Listened</p>
                        </div>
                        <div class="col-4 d-flex flex-column">
                            <p><strong>309</strong></p>
                            <p class="text-muted">Songs Listened</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row px-3 px-md-5">
            <div class="card p-3 rounded-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="red-bottom">Rated Track</h5>
                    <router-link v-if="ratedTracks.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RATED_TRACKS) } }">
                        All
                    </router-link>
                </div>
                <div class="horizontal-scroll">
                    <div class="col-3 col-md-2 mx-2" v-for="track in ratedTracks" :key="track.id">
                        <TrackCard :track="track.item"></TrackCard>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-3 px-3 px-md-5 mt-1">
            <div class="card p-3 rounded-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="red-bottom">Rated Artist</h5>
                    <router-link v-if="ratedArtists.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RATED_ARTISTS) } }">
                        All
                    </router-link>
                </div>
                <div class="horizontal-scroll">
                    <div class="col-3 col-md-2 mx-2" v-for="artist in ratedArtists" :key="artist.id">
                        <ArtistCard :artist="artist.item"></ArtistCard>
                    </div>
                </div>
            </div>
        </div>


        <!--                    Recently Played-->
        <div class="row g-3 my-2 px-3 px-md-5">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="playing-history card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="red-bottom">Recently Played</h5>
                            <router-link v-if="recentlyPlay.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RECENTLY_PLAYED) } }">
                                All
                            </router-link>
                        </div>
                        <div v-if="recentlyPlay.length>0">
                            <div v-for="track in recentlyPlay.slice(0, 5)" :key="track.id">
                                <TrackCardHorizontal :track="track"></TrackCardHorizontal>
                            </div>
                        </div>
                        <div v-else>
                            <EmptyPlaceholder></EmptyPlaceholder>
                        </div>

                    </div>
                </div>
            </div>
<!--            Saved Tracks-->
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="playing-history card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="red-bottom">Saved Tracks</h5>
                            <router-link v-if="savedTracks.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.SAVED_TRACKS) } }">
                                All
                            </router-link>
                        </div>
                        <div v-if="savedTracks.length>0">
                            <div v-for="track in savedTracks.slice(0, 5)" :key="track.id">
                                <TrackCardHorizontal :track="track"></TrackCardHorizontal>
                            </div>
                        </div>
                        <div v-else>
                            <EmptyPlaceholder></EmptyPlaceholder>
                        </div>
                    </div>
                </div>
            </div>

            <!--                        Top Tracks-->
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="red-bottom">Top Tracks</h5>
                        <router-link v-if="topTracks.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.TOP_TRACKS) } }">
                            All
                        </router-link>
                    </div>
                    <div v-if="topTracks.length>0">
                        <div v-for="track in topTracks.slice(0, 5)" :key="track.id">
                            <TrackCardHorizontal :track="track"></TrackCardHorizontal>
                        </div>
                    </div>
                    <div v-else>
                        <EmptyPlaceholder></EmptyPlaceholder>
                    </div>

                </div>
            </div>

            <!--                        Top Artists-->
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="most-artist card rounded-5 p-3 my-2 h-100 shadow">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="red-bottom">Top Artists</h5>
                        <router-link v-if="topArtists.length>0" :to="{ name: 'Playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.TOP_ARTISTS) } }">
                            All
                        </router-link>
                    </div>
                    <div v-if="topArtists.length>0">
                        <div class="row">
                            <div class="col-4 my-2" v-for="(artist, index) in topArtists.slice(0, 6)" :key="artist.id">
                                <router-link :to="`/artist/${artist._id}`" >
                                    <div class="text-center">
                                        <img v-if="artist.avatar" :src="artist.avatar" class="img-fluid rounded-circle">
                                        <div><strong>{{artist.name}}</strong></div>
                                        <div class="rank">Top {{ index + 1 }}</div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <EmptyPlaceholder></EmptyPlaceholder>
                    </div>


                </div>
            </div>

            <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                <div class="top-tags col-12 card rounded-5 p-3 my-2 h-100 shadow">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="red-bottom">Top Tags</h5>
                        <a href="#" class="text-white">All</a>
                    </div>
                    <div class="mb-2 position-relative">
                        <span class="tag-label">nagie</span>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div class="mb-2 position-relative">
                        <span class="tag-label">rap-metal</span>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getUser, updateSpotifyRefreshToken} from '@/api/users';
import {API_URL, SPOTIFY_AUTH_URL} from "@/utils/connection";
import {getRecentlyPlayed, getSavedTracks, getTopArtists, getTopTracks} from "@/api/spotify";
import TrackCardHorizontal from "@/components/TrackCardHorizontal.vue";
// import HeatMap from "@/components/HeatMap.vue";
import playlistTypes from "@/enum/playlistTypes";
import EmptyPlaceholder from "@/components/EmptyPlaceholder.vue";
import TrackCard from "@/components/TrackCard.vue";
import {getRatings} from "@/api/ratings";
import ArtistCard from "@/components/ArtistCard.vue";

export default {
    computed: {
        playlistTypes() {
            return playlistTypes
        }
    },
    components: {ArtistCard, TrackCard, EmptyPlaceholder, TrackCardHorizontal},
    data() {
        return {
            user: null,
            recentlyPlay: [],
            topTracks: [],
            ratedTracks: [],
            ratedArtists: [],
            savedTracks: [],
            topArtists: [],
            isSpotifyConnected: false
        };
    },
    created() {
        this.fetchUser();
        this.fetchRatings();
        this.checkForSpotifyRefreshToken();
        this.fetchSpotifyData();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await getUser(); // 传递适当的参数
                this.user = response.data.data;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchRatings() {
            try {
                const response = await getRatings(); // 传递适当的参数
                this.ratedTracks = response.data.data.ratedTracks;
                this.ratedArtists = response.data.data.ratedArtists;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchSpotifyData() {
            // Check if Spotify is connected and token is valid
            if (this.isSpotifyConnected && localStorage.getItem('spotify_access_token')) {
                await this.fetchRecentlyPlay();
                await this.fetchSavedTracks();
                await this.fetchTopTracks();
                await this.fetchTopArtists();
            }
        },
        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed();
                this.recentlyPlay = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchSavedTracks() {
            try {
                const response = await getSavedTracks();
                this.savedTracks = response.data;
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
        async fetchTopArtists() {
            try {
                const response = await getTopArtists();
                this.topArtists = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        getAvatarUrl(avatarPath) {
            return avatarPath ? API_URL + '/' + avatarPath : 'https://api.example.com/images/default-avatar.png';
        },
        loginWithSpotify() {
            const storedAccessToken = localStorage.getItem('spotify_access_token');
            if (storedAccessToken) {
                alert("Already Connected to Spotify")
            }else{
                window.location.href = `${SPOTIFY_AUTH_URL}`;
            }
        },

        checkForSpotifyRefreshToken() {
            const hash = window.location.hash.substring(1); // 去掉开头的 #
            const queryStartIndex = hash.indexOf('?');
            const queryString = queryStartIndex !== -1 ? hash.substring(queryStartIndex + 1) : '';
            const urlParams = new URLSearchParams(queryString);
            const accessToken = urlParams.get('access_token');
            const refreshToken = urlParams.get('refresh_token');

            if (refreshToken) {
                localStorage.setItem('spotify_access_token', accessToken);
                localStorage.setItem('spotify_refresh_token', refreshToken);
                localStorage.setItem('token_generate_time', Date.now());

                updateSpotifyRefreshToken(refreshToken)

                this.isSpotifyConnected = true;
                this.$router.replace({ path: '/profile' });
            }else {
                const storedAccessToken = localStorage.getItem('spotify_access_token');
                if (storedAccessToken) {
                    this.isSpotifyConnected = true;
                }
            }
        }
    },
}
</script>

<style scoped>

</style>
