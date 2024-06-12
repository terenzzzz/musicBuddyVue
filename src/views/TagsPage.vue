<template>
    <div class="Tags">
        <div class="row">
            <div class="col-md-3 col-lg-2 bg-secondary m-0 py-2 py-md-0 px-3 h-md-100 vh-md-100" >
                <nav id="sidebarMenu" class="d-none d-md-block sidebar text-light text-center text-md-start">
                    <div class="pt-3 position-sticky">
                        <input type="search" class="form-control form-control-sm ds-input mb-2" id="search-input"
                               placeholder="Search Tags" v-model="keyword">
                            <button class="btn btn-sm btn-danger w-50" @click="clearSelected">Clear</button>
                            <button class="btn btn-sm btn-success w-50" @click="fetchTagsByKeyword">Search</button>
                        <hr>

                        <ul class="nav flex-column">
                            <li v-for="tag in tags" :key="tag.id" class="text-center"
                                :class="selectedTags.includes(tag) ? 'bg-white text-secondary' : ''"
                                @click="clickTag(tag)">{{ tag.name }}</li>
                        </ul>
                        <hr>
                    </div>
                </nav>
            </div>

            <div class="col-md-9 col-lg-10 px-md-4 py-3 " >
                <div class="d-flex flex-column">
                    <strong>Selected Tags:</strong>
                    <div class="d-flex flex-wrap">
                        <span v-for="tag in selectedTags" :key="tag.id" class="badge text-bg-secondary m-1">{{tag.name}}</span>
                    </div>
                </div>


                <div v-if="tracks.length > 0" class="row mt-3">
                    <h3>Tracks Result</h3>
                    <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                    <div class="col-6 col-md-3 col-xl-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>



                <div v-if="artists.length > 0" class="row mt-3">
                    <h3>Artists Result</h3>
                    <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                    <div class="col-6 col-md-3 col-xl-2" v-for="artist in artists" :key="artist.id">
                        <ArtistCard :artist="artist"></ArtistCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllTags, searchTags} from "@/api/tags";
import TrackCard from "@/components/TrackCard.vue";
import AlertComponents from "@/components/AlertComponents.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import {getTracksByTags} from "@/api/tracks";
import {getArtistsByTags} from "@/api/artists";


export default {
    components: {ArtistCard, AlertComponents, TrackCard},
    data() {
        return {
            tags: [],
            keyword:"",
            selectedTags:[],
            tracks:[],
            artists:[]
        };
    },
    methods: {
        async fetchTracksBySelectedTags() {
            try {
                let tags = this.selectedTags.map(tag => tag._id).join(',');
                const response = await getTracksByTags(tags);
                if (response.data.status === 200) {
                    this.tracks = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchArtistsBySelectedTags() {
            try {
                let tags = this.selectedTags.map(tag => tag._id).join(',');
                const response = await getArtistsByTags(tags);
                if (response.data.status === 200) {
                    this.artists = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchAllTags() {
            try {
                const response = await getAllTags();
                if (response.data.status === 200) {
                    this.tags = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchTagsByKeyword() {
            try {
                const response = await searchTags(this.keyword);
                if (response.data.status === 200) {
                    this.tags = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        clickTag(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index > -1) {
                // Tag exists, remove it
                this.selectedTags.splice(index, 1);
            } else {
                // Tag does not exist, add it
                this.selectedTags.push(tag);
            }
            this.fetchTracksBySelectedTags()
            this.fetchArtistsBySelectedTags()
        },
        clearSelected() {
            this.selectedTags = []
            this.tracks = []
            this.artists = []
        }
    },
    created() {
        this.fetchAllTags()
    }
}
</script>
<style>
.aspect-ratio-box {
    aspect-ratio: 1 / 1; /* 设置宽高比为1:1 */
}
</style>


<!--<router-link :to="{ name: 'Playlist',-->
<!--                            params: { type:tag._id } }">-->
<!--<div class="d-flex align-items-center justify-content-center bg-secondary text-white aspect-ratio-box">-->
<!--    <p class="m-0">{{ tag.name }}</p>-->
<!--</div>-->
<!--</router-link>-->