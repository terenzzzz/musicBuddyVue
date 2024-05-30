<template>
  <div class="container-fluid p-0">

    <div class="posters-background">
      <div class="col-lg-6 content-wrapper">
        <div class="mb-3">
          <div>
            <h2 class="fw-bold display-5">Explore Your Musical Taste</h2>
          </div>
        </div>

        <div class="mb-3 fs-5 fw-medium">
          <div>
            <p>Helping you listen to the music in your own way.</p>
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid object-fit-cover ">
      <div class="row bg-light pb-3 d-flex justify-content-center">
        <div class="col-md-12">
          <!-- Carousel Section -->
          <h2 class="text-center mt-5 mb-1">Our Music Data</h2>
          <p class="text-center mb-2">Take a look at some of the Tracks on our platform.</p>
          <div class="horizontal-scroll">
            <div class="col-6 col-md-3 col-xl-2 mx-2" v-for="track in tracks" :key="track.id">
                <TrackCard :track="track"></TrackCard>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Features Section -->
    <div class="container-fluid feature mt-3 landing-page px-5 pb-5" id="features">

      <div class="row row-cols-1 row-cols-md-3 g-3 py-3">
        <h2 class="fw-medium fs-1 pt-2 w-100">Why Use Our Website?</h2>
        <div class="col py-1">
          <div class="card rounded-4 h-100 shadow">
            <div class="card-body">
              <h2 class="card-title">Reliable Recommendation</h2>
              <p class="card-text">Based on advanced algorithms and rich data, make sure you find the music you want every time you recommend it.</p>
            </div>
          </div>
        </div>
        <div class="col py-1">
          <div class="card rounded-4 h-100 shadow">
            <div class="card-body">
              <h2 class="card-title">Listen History Analysis</h2>
              <p class="card-text">Statistics and analysis of users listening to give you a clearer understanding of your own music behavior.</p>
            </div>
          </div>
        </div>
        <div class="col py-1">
          <div class="card rounded-4 h-100 shadow">
            <div class="card-body">
              <h2 class="card-title">Easy and User Friendly</h2>
              <p class="card-text">The design is simple and easy to operate, so that you can easily enjoy the wonderful experience of music.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {getRandomTrack} from "@/api/tracks"
import TrackCard from "@/components/TrackCard.vue";
export default {
    components: {TrackCard},
    data() {
        return {
          tracks: []
        };
    },
    methods: {
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.tracks = response.data.data;
                } else {
                    console.error('Error fetching tracks:', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching tracks:', err.message);
            }
        }
    },
    created() {
        this.fetchRandomTracks();
    }
}
</script>

<style>
.posters-background {
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url('../assets/images/posters.png');  /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.posters-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  background-repeat: inherit;
  filter: blur(10px);  /* 添加模糊滤镜 */
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);  /* 添加半透明背景以提高可读性 */
  color: white;  /* 设置文本颜色为白色，确保在深色背景上可见 */
  border-radius: 10px;
}
</style>