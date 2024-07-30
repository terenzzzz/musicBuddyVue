<template>
    <div class="Tags">
        <div class="offcanvas offcanvas-start custom-width" tabindex="-1" id="offcanvas">
            <div class="offcanvas-header">
                <h3 class="offcanvas-title d-none d-sm-block red-bottom" id="offcanvas">Tag Selection</h3>
                <button type="button" class="btn-close" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                        data-bs-dismiss="offcanvas"></button>
            </div>

            <div class="offcanvas-body p-3 ">
                <nav class="text-center text-md-start">
                    <form @submit.prevent="fetchTagsByKeyword" class="col-12 col-sm-10 col-lg-8 d-flex mx-auto">
                        <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                               placeholder="Search Tags" v-model="keyword">
                        <button class="btn btn-primary rounded-start-0" >Search</button>
                    </form>

                    <hr>

                    <div>
                        <ul class=" p-0">
                            <li v-for="tag in tags" :key="tag.id"
                                class="text-center mx-2 no-bullets"
                                :class="selectedTags.includes(tag) ? 'bg-primary text-white' : ''"
                                @click="clickTag(tag)"
                                style="cursor: pointer">
                                {{ tag.name }}
                            </li>
                        </ul>
                    </div>
                    <hr>

                </nav>
            </div>
        </div>
        <div class="container-lg">
            <div class="row m-0 p-0 w-100" >
                <div class="d-flex flex-column">
                    <div class="row m-0 p-0 w-100 mt-2">
                        <div class="col">
                            <i class="fa-solid fa-gear fs-4 float-end mt-3 me-3"
                               data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
                            </i>
                        </div>
                    </div>

                    <div class="d-flex h-100">
                        <h3>Selected Tags:</h3>
                        <button class="btn  ms-2 btn-outline-primary" @click="clearSelected">Clear</button>
                    </div>


                    <div class="d-flex flex-wrap">
                        <span v-for="tag in selectedTags" :key="tag.id"
                              class="badge fs-6 text-bg-secondary m-1">
                            {{tag.name}}
                            <i class="fa-solid fa-xmark" @click="removeTag(tag)" style="cursor: pointer"></i>
                        </span>
                    </div>
                </div>

                <div class="btn-group col-8 col-md-4 d-flex my-4 mx-auto"
                     role="group"
                     aria-label="Basic checkbox toggle button group">
                    <input type="radio" class="btn-check" id="tracks" :value="searchTypes.TRACKS" v-model="selectedType">
                    <label class="btn btn-outline-primary btn-sm" for="tracks">Tracks</label>

                    <input type="radio" class="btn-check" id="artists" :value="searchTypes.ARTISTS" v-model="selectedType">
                    <label class="btn btn-outline-primary btn-sm" for="artists">Artists</label>
                </div>

                <div v-if="selectedType === searchTypes.TRACKS" class="row mt-3 w-100 m-0 p-0">
                    <div class="col-4 col-md-3 col-xl-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>

                <div v-else-if="selectedType === searchTypes.ARTISTS" class="row mt-3 w-100 m-0 p-0">
                    <div class="col-4 col-md-3 col-xl-2" v-for="artist in artists" :key="artist.id">
                        <ArtistCard :artist="artist"></ArtistCard>
                    </div>
                </div>
                <ErrorPlaceholderVertical title="Please at lease select a tag" v-if="selectedTags.length <= 0"></ErrorPlaceholderVertical>
                <ErrorPlaceholderVertical title="No Track Data Math the tags selected"
                                          v-else-if="selectedType===searchTypes.TRACKS && tracks.length <= 0">
                </ErrorPlaceholderVertical>
                <ErrorPlaceholderVertical title="No Artist Data Math the tags selected"
                                          v-else-if="selectedType===searchTypes.ARTISTS && artists.length <= 0">
                </ErrorPlaceholderVertical>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllTags, searchTags} from "@/api/tags";
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import {getTracksByTags} from "@/api/tracks";
import {getArtistsByTags} from "@/api/artists";
import searchTypes from "@/enum/searchTypes";
import ErrorPlaceholderVertical from "@/components/ErrorPlaceholderVertical.vue";

export default {
    components: {ErrorPlaceholderVertical, ArtistCard, TrackCard},
    data() {
        return {
            tags: [],
            keyword:"",
            selectedTags:[],
            tracks:[],
            artists:[],
            searchTypes: searchTypes,
            selectedType: searchTypes.TRACKS
        };
    },
    watch:{
        async selectedTags() {
            if (this.selectedTags.length > 0){
                await this.fetchTracksBySelectedTags()
                await this.fetchArtistsBySelectedTags()
            }else{
                this.tracks.length = 0
                this.artists.length = 0
            }

        }
    },
    methods: {
        removeTag(tagToRemove) {
            this.selectedTags = this.selectedTags.filter(tag => tag !== tagToRemove);
        },
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
    async created() {
        await this.fetchAllTags()
        this.selectedTags.push(this.tags[0])
    }
}
</script>

<style scoped>
.custom-width {
    width: 100% !important;
}

@media (min-width: 768px) {
    .custom-width {
        width: 50% !important;
    }
}

@media (min-width: 992px) {
    .custom-width {
        width: 35% !important;
    }
}

@media (min-width: 1400px) {
    .custom-width {
        width: 25% !important;
    }
}

.no-bullets {
    list-style-type: none; /* 去除项目符号 */
    padding-left: 0; /* 去除左侧默认的内边距 */
    margin: 0; /* 可选，去除上方和下方的默认外边距 */
}
</style>
