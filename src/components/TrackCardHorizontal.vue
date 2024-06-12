<template>
    <router-link :to="`/track/${track._id}`" :class="isBorder? 'card':''">
        <div class="row">
            <div class="col-4 col-sm-3 mb-2">
                <img :src="track.cover || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid">
            </div>
            <div class="col-8 d-flex flex-column align-items-center justify-content-center">
                <div><strong>{{track.name}}</strong></div>
                <span class="fw-medium text-muted">{{ track.artist.name }} </span>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        track: {
            type: Object,
            required: true
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

