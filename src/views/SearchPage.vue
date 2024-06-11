<template>
    <div class="Search">

        <div class="w-75 mx-auto ">
            <div class="row d-flex justify-content-center mt-5">
                <div class="col-12 col-md-6 d-flex">
                    <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                           placeholder="Search Tracks, Artists, Lyrics..." v-model="keyword">
                    <button class="btn btn-primary rounded-start-0" @click="fetchSearchResult">Search</button>
                </div>
            </div>
            <div class="btn-group col-8 col-md-4 d-flex my-4 mx-auto"
                 role="group"
                 aria-label="Basic checkbox toggle button group"
                 :class="{ 'no-selection': !hasSelection }">
                <input type="checkbox" class="btn-check" id="tracks" value="tracks" v-model="selectedTypes">
                <label class="btn btn-outline-primary" for="tracks">Tracks</label>

                <input type="checkbox" class="btn-check" id="artists" value="artists" v-model="selectedTypes">
                <label class="btn btn-outline-primary" for="artists">Artists</label>

                <input type="checkbox" class="btn-check" id="lyrics" value="lyrics" v-model="selectedTypes">
                <label class="btn btn-outline-primary" for="lyrics">Lyrics</label>
            </div>




            <div class="card rounded-4 p-3 my-3" v-if="selectedTypes.includes('tracks')">
                <div class="row" >
                    <h3>Tracks Result</h3>
                    <div v-if="trackResult.length > 0" class="row">
                        <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                        <div class="col-6 col-md-3 col-xl-2" v-for="track in trackResult" :key="track.id">
                            <TrackCard :track="track"></TrackCard>
                        </div>
                    </div>

                    <div v-if="spotifyTrackResult.length > 0" class="row">
                        <AlertComponents :title="'The Result Below is Provided by Spotify'"></AlertComponents>
                        <div class="col-6 col-md-3 col-xl-2" v-for="track in spotifyTrackResult" :key="track.id">
                            <TrackCard :track="track"></TrackCard>
                        </div>
                    </div>

                </div>
                <p v-if="trackResult.length <= 0" class="text-center">No Result For the Search</p>
            </div>

            <div class="card rounded-4 p-3 my-3" v-if="selectedTypes.includes('artists')">
                <div class="row" >
                    <h3>Artists Result</h3>
                    <div v-if="artistResult.length > 0" class="row">
                        <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                        <div class="col-6 col-md-3 col-xl-2" v-for="artist in artistResult" :key="artist.id">
                            <ArtistCard :artist="artist"></ArtistCard>
                        </div>
                    </div>
                    <div v-if="spotifyArtistResult.length > 0" class="row">
                        <AlertComponents :title="'The Result Below is Provided by Spotify'"></AlertComponents>
                        <div class="col-6 col-md-3 col-xl-2" v-for="artist in spotifyArtistResult" :key="artist.id">
                            <ArtistCard :artist="artist"></ArtistCard>
                        </div>
                    </div>
                    <p v-if="artistResult.length<=0" class="text-center">No Result For the Search</p>
                </div>
            </div>

            <div class="card rounded-4 p-3 my-3" v-if="selectedTypes.includes('lyrics')">
                <div class="row" >
                    <h3>Lyric Result</h3>
                    <div class="col-6 col-md-3 col-xl-2" v-for="track in lyricsResult" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>
            <p v-if="lyricsResult.length<=0" class="text-center">No Result For the Search</p>
            </div>
        </div>

    </div>

</template>

<script>
import {getRandomTrack} from "@/api/tracks";
import TrackCard from "@/components/TrackCard.vue";
import {search} from "@/api/search";
import ArtistCard from "@/components/ArtistCard.vue";
import AlertComponents from "@/components/AlertComponents.vue";

export default {
    components: {AlertComponents, ArtistCard, TrackCard},
    data() {
        return {
            keyword: "",
            selectedTypes: ['tracks'],
            hasSelection: true,
            trackResult: [],
            spotifyTrackResult: [],
            artistResult: [],
            spotifyArtistResult: [],
            lyricsResult: [],
        };
    },
    computed: {
        atLeastOneSelected() {
            return this.selectedTypes.length > 0;
        },
    },
    watch: {
        selectedTypes(newVal) {
            this.hasSelection = newVal.length > 0;
            this.fetchSearchResult()
        }
    },
    methods: {
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.trackResult = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchSearchResult() {
            if (!this.atLeastOneSelected) {
                return alert("Please At Least Select One Type");
            }
            try {
                const response = await search(this.keyword, this.selectedTypes)
                if (response.data.status === 200) {
                    this.trackResult = response.data.data.tracks;
                    this.artistResult = response.data.data.artists;
                    this.lyricsResult = response.data.data.lyrics;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
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