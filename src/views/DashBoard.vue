<template>
  <div class="container-fluid page-container">
      <SpotifyFrame></SpotifyFrame>
    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Recently Play</h3>
    </div>
    <div class="horizontal-scroll">

    </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Listen 「Lock Me Up」 also listening</h3>
    </div>
    <div class="horizontal-scroll">

    </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Artist May Liked</h3>
    </div>
    <div class="horizontal-scroll">

    </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Everyone's Listening</h3>
    </div>
    <div class="horizontal-scroll">

    </div>

  </div>
</template>

<script>
// import TrackCard from '@/components/TrackCard.vue';
import SpotifyFrame from '@/components/SpotifyFrame.vue';

export default {
    components: {
      // TrackCard
        SpotifyFrame
    },
}
</script>

<style lang="css" scoped>


</style>