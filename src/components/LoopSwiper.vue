<template>
    <swiper class="swiper pb-4" :options="swiperOption">
        <template v-if="tracks && tracks.length > 0">
            <swiper-slide v-for="track in tracks" :key="track.id">
                <TrackCard :track="track.track || track.item || track" :similarity="track.similarity" :rating="track.rate"></TrackCard>
            </swiper-slide>
        </template>

        <template v-else-if="artists && artists.length > 0">
            <swiper-slide v-for="artist in artists" :key="artist.id">
                <ArtistCard :artist="artist.item || artist.artist || artist"  :similarity="artist.similarity" :rating="artist.rate"></ArtistCard>
            </swiper-slide>
        </template>


        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import TrackCard from "@/components/TrackCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import playlistTypes from "@/enum/playlistTypes";

export default {
    components: {
        ArtistCard,
        TrackCard,
        Swiper,
        SwiperSlide
    },
    computed: {
        artist() {
            return playlistTypes
        },
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