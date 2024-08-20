<template>
    <div class="profile">
        <div class="alert alert-secondary" role="alert">
            We value your feedback! Please click <a :href="FEEDBACK_URL()" class="alert-link">this link</a> to fill out a short feedback form.
        </div>
        <div class="container-lg" id="profile">
        <div v-if="user" class="row my-3 px-3 px-md-5">
            <div class="card shadow rounded-5 mt-2 rounded-bottom-0 p-4 " >
                <div class="d-flex justify-content-end my-2">
                    <button :class="['mb-2', 'btn', isSpotifyConnected ? 'btn-success text-white' : 'btn-outline-secondary']" @click="loginWithSpotify">
                        <i class="fa-brands fa-spotify"></i> {{ isSpotifyConnected ? 'Connected to Spotify' : 'Connect to Spotify' }}
                    </button>
                    <button class="mb-2 ms-2 btn btn-secondary" @click="exportReport">
                        <i class="fa-solid fa-download"></i>
                    </button>

                </div>
                <div class="row">
                    <div class="col-4 col-md-3 col-xl-2 m-auto ">
                        <div class="ratio ratio-1x1"><img :src="user.avatar === ''? `https://ui-avatars.com/api/?name=${user.name}` : getAvatarUrl(user.avatar)" class="rounded-circle img-fluid object-fit-cover" ></div>
                    </div>
                    <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
                        <div class="mb-2">
                            <h3 class="m-0">{{ user.name }}</h3>
                            <p class="text-muted">{{ user.email }}</p>
                        </div>
                        <div class="row d-flex flex-row" v-if="user">
                            <div class="col-auto" v-for="tag in (topTags.length>0? topTags : user.tags).slice(0,10)" :key="tag.id">
                                <tag-button :tag="tag.tag"></tag-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card shadow rounded-5 rounded-top-0" >
                <div class="row text-center py-3">
                    <div class="col-4 d-flex flex-column" >
                        <p><strong>{{ratedTracks.length}}</strong></p>
                        <p class="text-muted">Rated Song</p>
                    </div>

                    <div class="col-4 d-flex flex-column">
                        <p><strong>{{ratedArtists.length}}</strong></p>
                        <p class="text-muted">Rated Artisted</p>
                    </div>

                    <div class="col-4 d-flex flex-column" >
                        <p><strong>「{{topTags.length>0? topTags[0].tag.name : user.tags[0]?.tag.name}}」</strong></p>
                        <p class="text-muted">Personality</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-3 px-md-5" v-if="ratedTracks.length>0">
            <div class="card p-3 rounded-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="red-bottom">Rated Track</h5>
                    <router-link v-if="ratedTracks.length>0" :to="{ name: 'playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RATED_TRACKS) } }">
                        All
                    </router-link>
                </div>
                <div>
                    <LoopSwiper v-if="ratedTracks.length>0" :tracks="ratedTracks"></LoopSwiper>
                    <ErrorPlaceholderHorizontal v-else></ErrorPlaceholderHorizontal>
                </div>
            </div>
        </div>

        <div class="row g-3 px-3 px-md-5 mt-1" v-if="ratedTracks.length>0">
            <div class="card p-3 rounded-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="red-bottom">Rated Artist</h5>
                    <router-link v-if="ratedArtists.length>0" :to="{ name: 'playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RATED_ARTISTS) } }">
                        All
                    </router-link>
                </div>
                <div>
                    <LoopSwiper v-if="ratedArtists.length>0" :artists="ratedArtists"></LoopSwiper>
                    <ErrorPlaceholderHorizontal v-else></ErrorPlaceholderHorizontal>
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
                            <router-link v-if="recentlyPlay.length>0" :to="{ name: 'playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.RECENTLY_PLAYED) } }">
                                All
                            </router-link>
                        </div>
                        <div v-if="recentlyPlay.length>0" class="my-auto">
                            <div v-for="track in recentlyPlay.slice(0, 5)" :key="track.id">
                                <TrackCardHorizontal :track="track"></TrackCardHorizontal>
                            </div>
                        </div>
                        <div v-else>
                            <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                        </div>

                    </div>
                </div>
            </div>
<!--            Saved Tracks-->
<!--            <div class="col-12 col-sm-12 col-md-6 col-lg-4">-->
<!--                <div class="playing-history card rounded-5 p-3 my-2 h-100 shadow">-->
<!--                    <div>-->
<!--                        <div class="d-flex justify-content-between align-items-center mb-3">-->
<!--                            <h5 class="red-bottom">Saved Tracks</h5>-->
<!--                            <router-link v-if="savedTracks.length>0" :to="{ name: 'playlist',-->
<!--                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.SAVED_TRACKS) } }">-->
<!--                                All-->
<!--                            </router-link>-->
<!--                        </div>-->
<!--                        <div v-if="savedTracks.length>0">-->
<!--                            <div v-for="track in savedTracks.slice(0, 5)" :key="track.id">-->
<!--                                <TrackCardHorizontal :track="track"></TrackCardHorizontal>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div v-else>-->
<!--                            <ErrorPlaceholderVertical></ErrorPlaceholderVertical>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <!--                        Top Tracks-->
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="most-listened card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="red-bottom">Top Tracks</h5>
                            <router-link v-if="topTracks.length>0" :to="{ name: 'playlist',
                                params: { type:playlistTypes.playlistTypeToString(playlistTypes.TOP_TRACKS) } }">
                                All
                            </router-link>
                        </div>
                        <div v-if="topTracks.length>0" class="my-auto">
                            <div v-for="track in topTracks.slice(0, 5)" :key="track.id">
                                <TrackCardHorizontal :track="track"></TrackCardHorizontal>
                            </div>
                        </div>
                        <div v-else>
                            <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                        </div>
                    </div>
                </div>
            </div>

            <!--                        Top Artists-->
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="most-artist card rounded-5 p-3 my-2 h-100 shadow">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="red-bottom">Top Artists</h5>
                        <router-link v-if="topArtists.length>0" :to="{ name: 'playlist',
                            params: { type:playlistTypes.playlistTypeToString(playlistTypes.TOP_ARTISTS) } }">
                            All
                        </router-link>
                    </div>
                    <div v-if="topArtists.length>0" class="my-auto">
                        <div class="row">
                            <div class="col-4" v-for="(artist, index) in topArtists.slice(0, 6)" :key="artist.id">
                                <router-link :to="`/artist/${artist._id}`" >
                                    <div class="text-center">
                                        <img v-if="artist.avatar" :src="artist.avatar" class="img-fluid rounded-circle object-fit-cover" style="aspect-ratio: 1">
                                        <div class="text-truncate w-100 text-center fw-bold">{{artist.name}}</div>
                                        <div class="rank">Top {{ index + 1 }}</div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>


                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="top-tags card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Listening calendar</h5>
                        <small class="text-muted ">* Stat by 50 recently played</small>
                    </div>
                    <div v-if="dateStatData.length>0" class="my-auto">
                        <LineChart class="my-auto"
                            :labels="dateStatLabels" :data="dateStatData" title="Listening calendar"
                                   note="* Stat by 50 recently played"></LineChart>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="top-tags card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Listening clock</h5>
                        <small class="text-muted ">* Stat by 50 recently played</small>
                    </div>
                    <div v-if="timeStatData.length>0" class="my-auto">
                        <PieChart :data="timeStatData" :labels="timeStatLabels"></PieChart>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="top-tags card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Music by year</h5>
                        <small class="text-muted ">* Stat by 50 recently played</small>
                    </div>
                    <div v-if="yearStatData.length>0" class="my-auto">
                        <BarChart
                            :chart-data="yearStatData" :chart-labels="yearStatLabels" labels="Music by year"
                                  :data-size="yearStatLabels.length" note="* Stat by 50 recently played"/>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>

                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="top-tags card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Top Tags</h5>
                        <small class="text-muted ">* Stat by rated tracks</small>
                    </div>
                    <div v-if="user && topTags?.length>0">
                        <div class="mb-2 position-relative" v-for="tag in topTags.slice(0, 7)" :key="tag.id">
                            <span class="tag-label">{{ tag.tag.name }}</span>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="background-color: #0d6efd"
                                     :style="{ width: `${getProgressWidth(tag.count)}% ` }"
                                     :aria-valuenow="getProgressWidth(tag.count)" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Key Words</h5>
                        <small class="text-muted ">* Stat by rated tracks</small>
                    </div>
                    <div v-if="wordCloudData.length>0" class="my-auto">
                        <WordCloud :words="wordCloudData"/>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="top-tags card rounded-5 p-3 my-2 h-100 shadow">
                    <div>
                        <h5 class="red-bottom">Top Topic</h5>
                        <small class="text-muted ">* Stat by rated tracks</small>
                    </div>
                    <div v-if="topicStatData?.data?.length>0" class="my-auto mx-auto">
                        <RadarChart :chart-labels="topicStatData.label" :chart-data="topicStatData.data" labels="Top Topic"/>
                    </div>
                    <div v-else>
                        <ErrorPlaceholderVertical></ErrorPlaceholderVertical>
                    </div>

                </div>
            </div>

        </div>
    </div>
    </div>
</template>

<script>
import {getUser, updateSpotifyRefreshToken, updateTags} from '@/api/users';
import {API_URL, FEEDBACK_URL, SPOTIFY_AUTH_URL} from "@/utils/connection";
import {getRecentlyPlayed, getSavedTracks, getTopArtists, getTopTracks} from "@/api/spotify";
import TrackCardHorizontal from "@/components/TrackCardHorizontal.vue";
// import HeatMap from "@/components/HeatMap.vue";
import playlistTypes from "@/enum/playlistTypes";
import {getRatings} from "@/api/ratings";
import ErrorPlaceholderHorizontal from "@/components/ErrorPlaceholderHorizontal.vue";
import ErrorPlaceholderVertical from "@/components/ErrorPlaceholderVertical.vue";

import LoopSwiper from "@/components/LoopSwiper.vue";
import html2canvas from "html2canvas";
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import WordCloud from "@/components/WordCloud.vue";
import PieChart from "@/components/PieChart.vue";
import RadarChart from "@/components/RadarChart.vue";
import TagButton from "@/components/TagButton.vue";



export default {
    computed: {
        playlistTypes() {
            return playlistTypes
        },
        maxCount() {
            return this.user.tags.reduce((total, tag) => total + tag.count, 0);
        }
    },
    components: {
        TagButton,
        RadarChart,
        PieChart,
        WordCloud,
        BarChart,
        LoopSwiper,LineChart,
        ErrorPlaceholderVertical,
        ErrorPlaceholderHorizontal,
        TrackCardHorizontal,
    },
    data() {
        return {
            user: null,
            recentlyPlay: [],
            topTracks: [],
            ratedTracks: [],
            ratedArtists: [],
            // savedTracks: [],
            topArtists: [],
            topTags: [],
            isSpotifyConnected: false,

            dateStatLabels: [],
            dateStatData: [],
            yearStatLabels: [],
            yearStatData: [],
            timeStatLabels: [],
            timeStatData: [],

            wordCloudData: [],
            topicStatData: {}
        };
    },
    created() {
        this.fetchUser();
        this.fetchRatings()
        this.checkForSpotifyRefreshToken();
        this.fetchSpotifyData();
        this.fetchUserTags();
    },

    methods: {
        FEEDBACK_URL() {
            return FEEDBACK_URL
        },
        async exportReport() {
            await this.waitForImages();
            const element = document.getElementById('profile');
            const canvas = await html2canvas(element, {
                allowTaint: true,
                useCORS: true,
                logging: true,
            });
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = `${this.user.name}.png`;
            link.click();
        },
        waitForImages() {
            const images = document.querySelectorAll('#profile img');
            return Promise.all(Array.from(images).filter(img => !img.complete)
                .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })));
        },
        getProgressWidth(count) {
            return (count / this.maxCount) * 100;
        },
        async fetchUser() {
            try {
                const response = await getUser();
                this.user = response.data.data;
                console.log(this.user)
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchUserTags() {
            try {
                const response = await updateTags(); // 传递适当的参数
                this.topTags = response.data.data;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchRatings() {
            try {
                const response = await getRatings("true", "true"); // 传递适当的参数
                this.ratedTracks = response.data.ratedTracks.reverse();
                this.ratedArtists = response.data.ratedArtists.reverse();
                this.wordCloudData = response.data.keywordStatArray
                this.topicStatData = response.data.topicArray
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchSpotifyData() {
            // Check if Spotify is connected and token is valid
            if (this.isSpotifyConnected && localStorage.getItem('spotify_access_token')) {
                await this.fetchRecentlyPlay();
                // await this.fetchSavedTracks();
                await this.fetchTopTracks();
                await this.fetchTopArtists();
            }
        },
        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed("true", "true", "true");
                this.recentlyPlay = response.data.tracks;
                this.dateStatLabels = response.data.dateLabels;
                this.dateStatData = response.data.dateData;

                this.yearStatLabels = response.data.yearLabels;
                this.yearStatData = response.data.yearData;

                this.timeStatLabels = response.data.timeLabels;
                this.timeStatData = response.data.timeData;
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

