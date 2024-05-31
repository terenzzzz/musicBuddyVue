<template>
    <div class="Search">

        <div class="container-fluid">
            <div class="row d-flex justify-content-center my-5">
                <div class="col-6 d-flex">
                    <input type="search" class="form-control form-control-lg ds-input rounded-end-0" id="search-input"
                           placeholder="Search Tracks..." v-model="keyword">
                    <button class="btn btn-primary rounded-start-0" @click="fetchSearchResult">Search</button>
                </div>

            </div>

            <div class="row">
                <div class="col-6 col-md-3 col-xl-2" v-for="track in result" :key="track.id">
                    <TrackCard :track="track"></TrackCard>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import {getRandomTrack} from "@/api/tracks";
import TrackCard from "@/components/TrackCard.vue";
import {search} from "@/api/search";

export default {
    components: {TrackCard},
    data() {
        return {
            keyword: "",
            result: [],
        };
    },
    methods: {
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.result = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchSearchResult() {
            try {
                const response = await search({keyword:this.keyword});
                if (response.data.status === 200) {
                    this.result = response.data.data;
                    console.log('Updated result:', this.result);
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