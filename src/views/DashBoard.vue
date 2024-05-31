<template>
  <div class="page-container mx-auto my-3">
      <SpotifyFrame></SpotifyFrame>
    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Recently Play</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-6 col-md-3 col-xl-2 mx-2" v-for="track in recentlyPlay" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Listen 「Lock Me Up」 also listening</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-6 col-md-3 col-xl-2 mx-2" v-for="track in alsoListen" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Artist May Liked</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-6 col-md-3 col-xl-2 mx-2" v-for="artist in artistMayLike" :key="artist.id">
              <ArtistCard :artist="artist"></ArtistCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="px-5 my-3 border-bottom-red">Everyone's Listening</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-6 col-md-3 col-xl-2 mx-2" v-for="track in EveryoneListening" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>

  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue';
import SpotifyFrame from '@/components/SpotifyFrame.vue';
import {getRandomTrack} from "@/api/tracks";
import {getRecommArtist} from "@/api/artists";
import ArtistCard from "@/components/ArtistCard.vue";

export default {
    components: {
        ArtistCard,
        TrackCard,
        SpotifyFrame
    },
    data() {
        return {
            recentlyPlay: [],
            alsoListen: [],
            artistMayLike: [],
            EveryoneListening: []
        };
    },
    methods: {
        async fetchRecentlyPlay() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.recentlyPlay = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchAlsoListen() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.alsoListen = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchArtistMayLike() {
            try {
                const response = await getRecommArtist();
                if (response.data.status === 200) {
                    this.artistMayLike = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        },
        async fetchEveryoneListening() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.EveryoneListening = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        }
    },
    created() {
        this.fetchRecentlyPlay()
        this.fetchAlsoListen()
        this.fetchArtistMayLike()
        this.fetchEveryoneListening()
    }
}
</script>

<style lang="css" scoped>


</style>