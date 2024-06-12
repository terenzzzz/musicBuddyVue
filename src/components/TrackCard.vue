<template>
    <router-link :to="`/track/${track._id}`">
        <div class="my-1">
            <div class="card rounded-4 h-100 shadow-sm">
                <div class="position-relative">
                    <img :src="track.cover || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid d-block mx-auto rounded-4">
                    <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 rounded-bottom-4">
                        <p class="card-title modelName mb-0">{{track.name}}</p>
                        <span class="m-0 p-0"><small>{{track.artist.name}}</small></span>
                    </div>
                </div>
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
      }
    },
    methods: {
    },

};
</script>

