<template>
    <router-link :to="`/track/${trackId}`" >
        <div class="row mt-2">
            <div class="col-3">
                <img :src="trackImage" class="img-fluid">
            </div>
            <div class="col-9 d-flex flex-column align-items-center justify-content-center">
                <div><strong>{{trackName}}</strong></div>
                <div v-for="artist in artists" :key="artist.id">
                    <span>{{ artist.name }} </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        trackId: {
            type: String,
            required: true
        },
        trackName: {
            type: String,
            required: true
        },
        trackImage: {
            type: String,
            required: true
        },
        artists: [{
            type: Object,
            required: true
        }]
    },
    methods: {
    }
};
</script>

