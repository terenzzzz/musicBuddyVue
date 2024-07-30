<template>
    <div class="Search container-lg">
        <div class="row mt-5">
            <div class="row m-0 p-0">
                <form @submit.prevent="fetchSearchResult" class="col-12 col-sm-10 col-lg-8 d-flex mx-auto">
                    <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                           placeholder="Search Tracks, Artists, Lyrics..." v-model="keyword">
                    <button class="btn btn-primary rounded-start-0" >Search</button>
                </form>
            </div>
            <div class="btn-group col-8 col-md-4 d-flex my-4 mx-auto"
                 role="group"
                 aria-label="Basic checkbox toggle button group"
                 :class="{ 'no-selection': !hasSelection }">
                <input type="radio" class="btn-check" id="tracks" :value="searchTypes.TRACKS" v-model="selectedType">
                <label class="btn btn-outline-primary" for="tracks">Tracks</label>

                <input type="radio" class="btn-check" id="artists" :value="searchTypes.ARTISTS" v-model="selectedType">
                <label class="btn btn-outline-primary" for="artists">Artists</label>

                <input type="radio" class="btn-check" id="lyrics" :value="searchTypes.LYRICS" v-model="selectedType">
                <label class="btn btn-outline-primary" for="lyrics">Lyrics</label>
            </div>
        </div>

        <div class="row m-0 p-0" >
            <div v-if="searchResult.length > 0" class="row m-0 mt-3 p-0">
                <h3><span class="red-bottom">{{ selectedType.toUpperCase() }} RESULT By MusicBuddy</span></h3>
                <div class="col-4 col-md-3 col-xl-2 " v-for="item in searchResult" :key="item.id">
                    <ArtistCard :artist="item" v-if="selectedType === searchTypes.ARTISTS"></ArtistCard>
                    <TrackCard :track="item" v-else></TrackCard>
                </div>
            </div>


            <div v-if="spotifySearchResult.length > 0" class="row m-0 mt-3 p-0">
                <h3>
                    <span class="red-bottom">{{ selectedType.toUpperCase() }} RESULT By Spotify</span>
                </h3>
                <div class="col-6 col-md-3 col-xl-2" v-for="item in spotifySearchResult" :key="item.id">
                    <ArtistCard :artist="item" v-if="selectedType === searchTypes.ARTISTS"></ArtistCard>
                    <TrackCard :track="item" v-else></TrackCard>
                </div>
            </div>

        </div>
        <div v-if="searchResult.length <= 0 && spotifySearchResult.length <= 0" class="text-center">
            <EmptyPlaceholder></EmptyPlaceholder>
        </div>
    </div>
</template>

<script>
import {getRandomTrack} from "@/api/tracks";
import TrackCard from "@/components/TrackCard.vue";
import {search} from "@/api/search";
import ArtistCard from "@/components/ArtistCard.vue";
import {searchSpotifyArtists, searchSpotifyTracks} from "@/api/spotify";
import EmptyPlaceholder from "@/components/ErrorPlaceholderVertical.vue";
import searchTypes from "@/enum/searchTypes";

export default {
    components: {EmptyPlaceholder, ArtistCard, TrackCard},
    data() {
        return {
            searchTypes: searchTypes,
            keyword: "",
            selectedType: searchTypes.TRACKS,
            hasSelection: true,

            searchResult: [],
            spotifySearchResult: [],

        };
    },

    watch: {
        async selectedType() {
            console.log(this.selectedType)
            await this.fetchSearchResult()
        }
    },
    methods: {
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.searchResult = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchSearchResult() {
            try {
                const response = await search(this.keyword, this.selectedType);
                if (response.data.status === 200) {
                    switch (this.selectedType) {
                        case searchTypes.TRACKS:
                            this.searchResult = response.data.data.tracks || [];
                            break;
                        case searchTypes.ARTISTS:
                            this.searchResult = response.data.data.artists || [];
                            break;
                        case searchTypes.LYRICS:
                            this.searchResult = response.data.data.lyrics || [];
                            break;
                        default:
                            this.searchResult = [];
                            console.warn('Unknown search type:', this.selectedType);
                    }
                    if (this.selectedType !== searchTypes.LYRICS){
                        await this.fetchSpotifyResult()
                    }else {
                        this.spotifySearchResult = []
                    }

                } else {
                    console.error('Error fetching data:', response.data.message);
                    this.searchResult = [];
                }
            } catch (error) {
                console.error('Error during search:', error);
                this.searchResult = [];
            }
        },
        async fetchSpotifyResult() {
            try {
                if (this.selectedType === searchTypes.TRACKS){
                    const response = await searchSpotifyTracks(this.keyword)
                    if (response.status === 200) {
                        this.spotifySearchResult = response.data
                    } else {
                        console.error('Error search Spotify else:', response.data.message);
                    }
                }
                if (this.selectedType  ===  searchTypes.ARTISTS){
                    const response = await searchSpotifyArtists(this.keyword)
                    if (response.status === 200) {
                        this.spotifySearchResult = response.data
                    } else {
                        console.error('Error search Spotify else:', response.data.message);
                    }
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
    },
    created() {
        this.fetchRandomTracks()
    }
}
</script>