<template>
    <router-link :to="`/track/${track._id}`" >
        <div class="card rounded-4 h-100 shadow-sm">
          <div class="position-relative">
            <img :src="track.cover" class="img-fluid d-block mx-auto rounded-4" style="height: 200px;">
            <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 rounded-bottom-4">
              <h5 class="card-title modelName mb-0">{{track.name}}</h5>
              <p class="m-0 p-0 deviceType"><small>{{track.artist.name}}</small></p>
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
    }
};
</script>

