<template>
    <swiper class="swiper pb-4" :options="swiperOption">
        <template v-if="tracks && tracks.length > 0">
            <swiper-slide v-for="track in tracks" :key="track.id">
                <TrackCard :track="track.track" :similarity="track.similarity"></TrackCard>
            </swiper-slide>
        </template>

        <template v-else-if="artists && artists.length > 0">
            <swiper-slide v-for="artist in artists" :key="artist.id">
                <ArtistCard :artist="artist.artist" :similarity="artist.similarity"></ArtistCard>
            </swiper-slide>
        </template>


        <div class="swiper-pagination" slot="pagination"></div>
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";

export default {
    components: {
        ArtistCard,
        TrackCard,
        Swiper,
        SwiperSlide
    },
    props: {
        tracks: {
            type: Array,
            required: false
        },
        artists: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 15,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    992: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    }
                }
            }
        };
    }
};
</script>