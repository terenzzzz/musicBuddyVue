<template>
  <div class="px-1 px-sm-3 px-md-5 my-3">
    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="my-3 red-bottom">Recently Play</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in recentlyPlay" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="my-3 red-bottom">Listen 「Lock Me Up」 also listening</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in alsoListen" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="my-3 red-bottom">Artist May Liked</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-3 col-md-2 col-xxl-1  mx-2" v-for="artist in artistMayLike" :key="artist.id">
              <ArtistCard :artist="artist"></ArtistCard>
          </div>
      </div>

    <div class="title mt-5 d-flex justify-content-center">
      <h3 class="my-3 red-bottom">Everyone's Listening</h3>
    </div>
      <div class="horizontal-scroll">
          <div class="col-3 col-md-2 col-xxl-1 mx-2" v-for="track in EveryoneListening" :key="track.id">
              <TrackCard :track="track"></TrackCard>
          </div>
      </div>
  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue';
import {getRandomTrack} from "@/api/tracks";
import {getRecommArtist} from "@/api/artists";
import ArtistCard from "@/components/ArtistCard.vue";

export default {
    components: {
        ArtistCard,
        TrackCard,
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


