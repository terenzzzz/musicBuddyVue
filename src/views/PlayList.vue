<template>
    <div class="playList">
        <div class="posters-background">
            <div class="col-lg-6 content-wrapper">
                <div class="my-auto text-center">
                    <h2 class="fw-bold display-5">{{ title }}</h2>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#receiptModel" v-if="showReceiptButton">Generate Receipt</button>
                </div>
            </div>
        </div>

        <div class="mt-5 px-5 container-lg">
            <div v-if="tracks.length > 0">
                <div class="row">
                    <AlertComponents :title="`The Result Below is Provided by ${dataProvider}`"></AlertComponents>
                    <div class="col-4 col-md-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>
            </div>

            <div v-if="artists.length > 0">
                <div class="row">
                    <AlertComponents :title="`The Result Below is Provided by ${dataProvider}`"></AlertComponents>
                    <div class="col-4 col-md-2 " v-for="artist in artists" :key="artist.id">
                        <ArtistCard :artist="artist"></ArtistCard>
                    </div>
                </div>
            </div>
        </div>

<!--        ReceiptModel-->
        <div class="modal fade" id="receiptModel" tabindex="-1" aria-labelledby="receiptModel" aria-hidden="true"  v-if="showReceiptButton">
            <div class="modal-dialog">
                <div class="modal-content">
                    <i class="fa-solid fa-x p-4" data-bs-dismiss="modal" aria-label="Close"></i>
                    <ReceiptPaper :tracks="tracks" :title="title"></ReceiptPaper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import {getRecentlyPlayed, getSavedTracks, getTopArtists, getTopTracks} from "@/api/spotify";

import TrackCard from "@/components/TrackCard.vue";
import AlertComponents from "@/components/AlertComponents.vue";
import playlistTypes from "@/enum/playlistTypes";
import ArtistCard from "@/components/ArtistCard.vue";
import {getTracksByTag} from "@/api/tracks";
import {getTagById} from "@/api/tags";
import ReceiptPaper from "@/components/ReceiptPaper.vue";
import {getRatings} from "@/api/ratings";

export default {
    components: {ReceiptPaper, ArtistCard, AlertComponents, TrackCard},

    data() {
        return {
            title:  playlistTypes.stringToPlaylistType(this.$route.params.type),
            tracks: [],
            artists:[],
            showReceiptButton: false,
            dataProvider:"MusicBuddy"
        };
    },
    created() {
        this.fetchTracks()
    },
    methods:{
        async fetchTracks(){
            switch (this.title) {
                case playlistTypes.RECENTLY_PLAYED: await this.fetchRecentlyPlay()
                    this.showReceiptButton = true
                    this.dataProvider = "Spotify"
                    break
                case playlistTypes.SAVED_TRACKS: await this.fetchSavedTracks()
                    this.showReceiptButton = true
                    this.dataProvider = "Spotify"
                    break
                case playlistTypes.TOP_TRACKS: await this.fetchTopTracks()
                    this.showReceiptButton = true
                    this.dataProvider = "Spotify"
                    break
                case playlistTypes.TOP_ARTISTS: await this.fetchTopArtists()
                    this.dataProvider = "Spotify"
                    break
                case playlistTypes.RATED_TRACKS: await this.fetchRatings()
                    break
                case playlistTypes.RATED_ARTISTS: await this.fetchRatings()
                    break
                default:
                    await this.fetchTracksByTag(this.title)
                    await this.fetchTagById(this.title)
            }

        },

        async fetchRatings() {
            try {
                const response = await getRatings();
                let ratings = response.data.data
                if (this.title === playlistTypes.RATED_TRACKS){
                    this.tracks = ratings.ratedTracks.map(rating => rating.item);
                }else if(this.title === playlistTypes.RATED_ARTISTS){
                    this.artists = ratings.ratedArtists.map(rating => rating.item);
                }

            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        async fetchTracksByTag(tag) {
            try {
                const response = await getTracksByTag(tag);
                this.tracks = response.data.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },

        async fetchTagById(tag) {
            try {
                const response = await getTagById(tag);
                this.title = response.data.data.name.toUpperCase();
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },


        async fetchSavedTracks() {
            try {
                const response = await getSavedTracks();
                this.tracks = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },

        async fetchRecentlyPlay() {
            try {
                const response = await getRecentlyPlayed();
                this.tracks = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchTopTracks() {
            try {
                const response = await getTopTracks();
                this.tracks = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
        async fetchTopArtists() {
            try {
                const response = await getTopArtists();
                this.artists = response.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        },
    }
}
</script>

<style scoped>
.posters-background {
    position: relative;
    width: 100%;
    height: 30vh;
    background-image: url('../assets/images/posters.png');  /* 替换为你的背景图片路径 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posters-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    filter: blur(10px);  /* 添加模糊滤镜 */
    z-index: 1;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);  /* 添加半透明背景以提高可读性 */
    color: white;  /* 设置文本颜色为白色，确保在深色背景上可见 */
    border-radius: 10px;
}
</style>