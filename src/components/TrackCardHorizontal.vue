<template>
    <router-link :to="`/track/${trackId}`" :class="isBorder? 'card':''">
        <div class="row">
            <div class="col-1 d-flex flex-column align-items-center justify-content-center" v-if="index">
                <p>{{index}}</p>
            </div>
            <div class="col-3 col-sm-2">
                <img :src="trackImage" class="img-fluid">
            </div>
            <div class="col-8 d-flex flex-column align-items-center justify-content-center">
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
        index: {
            type: Number,
            required: false
        },
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
        artists: {
            type: Array,
            required: true,
        },
        isBorder: {
            type: Boolean,
            required: false,
            defaults: false
        }
    },
    methods: {
    }
};
</script>

