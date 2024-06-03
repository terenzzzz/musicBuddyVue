<template>
    <router-link :to="`/artist/${artist._id}`" >
        <div class="card rounded-4 h-100  border-0" style="background-color: #f1f4f9;">
            <div class="position-relative">
                <img :src="artist.avatar" class="img-fluid d-block mx-auto rounded-circle" style="height: 150px;">
                <h5 class="card-title  text-center">{{ artist.name }}</h5>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        artist: {
            type: Object,
            required: true
        }
    },
    methods: {
    }
};
</script>