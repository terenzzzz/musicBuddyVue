<template>
    <div class="profile">
        <div class="w-75 mx-auto">
            <div v-if="user" class="my-3">
                <div class="row d-flex justify-content-end">
                    <div class="col-12 col-sm-6 col-md-4 d-flex justify-content-end">
                        <button :class="['mb-2', 'btn', isSpotifyConnected ? 'btn-success text-white' : 'btn-outline-secondary']" @click="loginWithSpotify">
                            <i class="fa-brands fa-spotify"></i> {{ isSpotifyConnected ? 'Connected to Spotify' : 'Connect to Spotify' }}
                        </button>
                    </div>
                </div>

                <div class="page-container mx-auto my-3">
                    <div class="row d-flex justify-content-center my-5">
                        <div class="col-3 col-md-2 col-xl-1 d-flex flex-column justify-content-center text-center">
                            <img :src="getAvatarUrl(user.avatar)" class="rounded-circle img-fluid">
                            <strong>{{ user.name }}</strong>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8 d-flex justify-content-center">
                            <HeatMap></HeatMap>
                        </div>
                    </div>

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

<!--                    Recently Played-->
                    <div class="row g-3 my-2">
                        <div class="col-12 col-sm-6 col-xl-4">
                            <div class="playing-history card rounded-5 p-3 my-2 h-100 shadow">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Recently Played</h5>
                                        <a href="#" >All</a>
                                    </div>
                                    <div v-for="item in recentlyPlay.slice(0, 5)" :key="item.id">
                                        <TrackCardHorizontal :trackId="item.track.id" :track-name="item.track.name"
                                                             :track-image="item.track.album.images[0]?.url" :artists="item.track.artists">
                                        </TrackCardHorizontal>
                                    </div>
                                </div>
                            </div>
                        </div>

<!--                        Top Tracks-->
                        <div class="col-12 col-sm-6 col-xl-4">
                            <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Top Tracks</h5>
                                    <a href="#" class="text-muted">All</a>
                                </div>
                                <div v-for="(track, index) in topTracks.slice(0, 5)" :key="track.id">
                                    <router-link :to="`/track/${track.id}`" >
                                        <div class="row mt-2">
                                            <div class="col-2 d-flex justify-content-center align-items-center p-0">Top {{ index+1 }}</div>
                                            <div class="col-3">
                                                <img v-if="track.album.images" :src="track.album.images[0].url" class="img-fluid">
                                            </div>
                                            <div class="col-6 d-flex flex-column align-items-center justify-content-center">
                                                <div><strong>{{track.name}}</strong></div>
                                                <div v-for="artist in track.artists" :key="artist.id">
                                                    <span>{{ artist.name }} </span>
                                                </div>
                                            </div>

                                        </div>
                                    </router-link>
                                </div>

                            </div>
                        </div>

<!--                        Top Artists-->
                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="most-artist card rounded-5 p-3 my-2 h-100 shadow">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Top Artists</h5>
                                <a href="#" class="text-white">All</a>
                            </div>
                            <div class="row">
                                <div class="col-4" v-for="(artist, index) in topArtists.slice(0, 6)" :key="artist.id">
                                    <router-link :to="`/artist/${artist.id}`" >
                                        <div class="text-center">
                                            <img v-if="artist.images" :src="artist.images[0].url" class="img-fluid rounded-circle">
                                            <div><strong>{{artist.name}}</strong></div>
                                            <div class="rank">Top {{ index + 1 }}</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6 col-xl-4">
                            <div class="top-tags col-12 card rounded-5 p-3 my-2 h-100 shadow">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Top Tags</h5>
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


            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
    </div>
</template>

<script>
import {getUser, updateSpotifyRefreshToken} from '@/api/users';
import API_URL from "@/utils/connection";
import {getRecentlyPlayed, getTopTracks, getTopArtists} from "@/api/spotify";
import TrackCardHorizontal from "@/components/TrackCardHorizontal.vue";
import HeatMap from "@/components/HeatMap.vue";

export default {
    components: {HeatMap, TrackCardHorizontal},
    data() {
        return {
            user: null,
            recentlyPlay: [],
            topTracks: [],
            topArtists: [],
            isSpotifyConnected: false
        };
    },
    created() {
        this.fetchUser();
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
        async fetchSpotifyData() {
            // Check if Spotify is connected and token is valid
            if (this.isSpotifyConnected && localStorage.getItem('spotify_access_token')) {
                await this.fetchRecentlyPlay();
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
            const baseUrl = API_URL;
            return avatarPath ? baseUrl + avatarPath : 'https://api.example.com/images/default-avatar.png';
        },
        loginWithSpotify() {
            const storedAccessToken = localStorage.getItem('spotify_access_token');
            if (storedAccessToken) {
                alert("Already Connected to Spotify")
            }else{
                window.location.href = 'http://localhost:6906/api/spotifyLogin';
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
