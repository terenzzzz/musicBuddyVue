<template>
    <div class="row">
        <swiper class="swiper d-flex justify-content-center align-items-center"
                :options="swiperOption"
                ref="mySwiper"
                @slideChange="onSlideChange">
            <swiper-slide v-for="track in randomTracks" :key="track.id"
                          class=" d-flex align-items-center justify-content-center">
                <div class="container container-padding">
                    <div class="card shadow p-3 h-100 w-100" :style="backgroundStyle(track.cover)">
                        <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2">
                            <div class="row">
                                <div class="col-12 d-flex flex-column justify-content-center">
                                    <div>
                                        <strong class="fs-2">{{ track.name }}</strong>
                                        <p class="fs-5">{{ track.artist.name }}</p>
                                    </div>
                                    <div class="row d-flex flex-row" v-if="track.tags">
                                        <div class="col-auto" v-for="tag in track.tags" :key="tag.id">
                                            <TagButton :tag="tag.tag"></TagButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>


        <div class="row d-flex justify-content-center align-items-center" v-if="randomTracks.length > 0">
            <div class="card col-6 mx-auto d-flex align-items-center rounded-5 p-2">
                <RateBtn :rating="trackRating" :on-rate="updateRate" :item-type="itemTypes.TRACK" class="fs-4"></RateBtn>
                <div class="row mt-2">
                    <div class="col-12">
                        <router-link :to="`/track/${currentTrack._id}`" class="me-2 ">
                            <button class="btn btn-primary d-inline-flex align-items-center h-100">
                                <img src="@/assets/images/musicBuddyVueLogo.png" class="img-fluid ratio-1x1 me-2" style="width: 30px; height: 30px;">
                                <span>More In MusicBuddy</span>
                            </button>
                        </router-link>
                        <button class="btn btn-success d-inline-flex align-items-center h-100" @click="openWindow(spotifyArtistUrl)">
                            <i class="fa-brands fa-spotify me-2"></i>
                            <span>More In Spotify</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { getRandomTrack } from "@/api/tracks";
import TagButton from "@/components/TagButton.vue";
import RateBtn from "@/components/RateBtn.vue";
import { addRating, deleteRating, getRating, itemTypes } from "@/api/ratings";

export default {
    computed: {
        itemTypes() {
            return itemTypes;
        },
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
        currentTrack(){
            return this.randomTracks[this.currentIndex]
        }
    },
    components: {
        RateBtn,
        Swiper,
        SwiperSlide,
        TagButton
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            },
            randomTracks: [],
            trackRating: 0,
            currentIndex: 0
        };
    },

    methods: {
        openWindow: function(url) {
            window.open(url, '_blank');
        },
        async onSlideChange() {
            this.currentIndex = this.swiper.realIndex;
            console.log(this.currentIndex)
            await this.fetchRating()
        },
        async updateRate(itemType, rating) {
            let response = null;
            if (rating === this.trackRating) {
                response = await deleteRating(this.currentTrack._id, itemType);
            } else {
                response = await addRating(this.currentTrack._id, itemType, rating);
            }
            if (response.status === 200) {
                this.trackRating = rating === this.trackRating ? 0 : response.data.rate;
            } else {
                alert("Rate Track Failed");
            }
        },
        async fetchRating() {
            try {
                const response = await getRating(this.currentTrack._id, itemTypes.TRACK);
                if (response.status === 200 && response.data?.data) {
                    this.trackRating = response.data.data.rate ?? 0;
                }else{
                    this.trackRating = 0
                }
            } catch (err) {
                this.trackRating = 0
                console.error('Error fetching ratings:', err.message);
            }
        },
        backgroundStyle(cover) {
            return {
                backgroundImage: `url(${cover})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        },
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                this.randomTracks = response.data.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        }
    },
    async created() {
        await this.fetchRandomTracks();
        await this.fetchRating();
    }
};
</script>

<style scoped>
.container {
    aspect-ratio: 1/1;
}

@media (min-width: 768px) {
    .container-padding {
        padding-inline: 50px;
        aspect-ratio: 1/0.8;
    }
}

@media (min-width: 992px) {
    .container-padding {
        padding-inline: 150px;
        aspect-ratio: 1/0.5;
    }
}

@media (min-width: 1400px) {
    .container-padding {
        padding-inline: 250px;
        aspect-ratio: 1/0.4;
    }
}
</style>
