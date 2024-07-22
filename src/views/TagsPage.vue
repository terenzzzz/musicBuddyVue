<template>
    <div class="Tags">
        <div class="row">
            <div class="col-12 col-md-3 col-lg-2 bg-dark p-2 ps-3" >
                <nav class="text-light text-center text-md-start">
                    <div class="position-sticky">
                        <input type="search" class="form-control form-control-sm ds-input mb-2" id="search-input"
                               placeholder="Search Tags" v-model="keyword">
                            <button class="btn btn-sm btn-light w-50" @click="clearSelected">Clear</button>
                            <button class="btn btn-sm btn-primary w-50" @click="fetchTagsByKeyword">Search</button>
                        <hr>

                        <div class="tag-container" style="max-height: 100vh; overflow-y: auto;">
                            <ul class="nav flex-row flex-md-column">
                                <li v-for="tag in tags" :key="tag.id"
                                    class="text-center mx-2"
                                    :class="selectedTags.includes(tag) ? 'bg-white text-secondary' : ''"
                                    @click="clickTag(tag)"
                                    style="cursor: pointer">
                                    {{ tag.name }}
                                </li>
                            </ul>
                        </div>
                        <hr>
                    </div>
                </nav>
            </div>

            <div class="col-12 col-md-9 col-lg-10 px-md-4 p-5" >
                <div class="d-flex flex-column">
                    <strong>Selected Tags:</strong>
                    <div class="d-flex flex-wrap">
                        <span v-for="tag in selectedTags" :key="tag.id" class="badge text-bg-secondary m-1">{{tag.name}}</span>
                    </div>
                </div>


                <div v-if="tracks.length > 0" class="row mt-3">
                    <h3>Tracks Result</h3>
                    <div class="col-3 col-md-3 col-xl-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>



                <div v-if="artists.length > 0" class="row mt-3">
                    <h3>Artists Result</h3>
                    <AlertComponents :title="'The Result Below is Provided by MusicBuddy'"></AlertComponents>
                    <div class="col-3 col-md-3 col-xl-2" v-for="artist in artists" :key="artist.id">
                        <ArtistCard :artist="artist"></ArtistCard>
                    </div>
                </div>

                <EmptyPlaceholder v-if="tracks.length <= 0 && artists.length <= 0"></EmptyPlaceholder>
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
import EmptyPlaceholder from "@/components/EmptyPlaceholder.vue";


export default {
    components: {EmptyPlaceholder, ArtistCard, AlertComponents, TrackCard},
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
