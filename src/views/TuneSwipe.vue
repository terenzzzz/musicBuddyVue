<template>
        <swiper class="swiper d-flex justify-content-center align-items-center" :options="swiperOption">
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
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {getRandomTrack} from "@/api/tracks";
import TagButton from "@/components/TagButton.vue";

export default {
    components: {
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
                }
            },
            randomTracks:[]
        }
    },
    methods:{
        backgroundStyle(cover) {
            return {
                backgroundImage: `url(${cover})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', // Ensures the background image covers the entire area
                backgroundPosition: 'center' // Centers the background image
            };
        },
        async fetchRandomTracks(){
            try {
                const response = await getRandomTrack();
                this.randomTracks = response.data.data;
            } catch (error) {
                console.error('Failed to fetch recently played tracks:', error);
            }
        }
    },
    created() {
        this.fetchRandomTracks()
    }
}
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
