<template>

        <swiper class="swiper d-flex justify-content-center align-items-center" :options="swiperOption">
            <swiper-slide v-for="track in randomTracks" :key="track.id">
                <div class="card shadow rounded-bottom-0 p-3">
                    <div class="row" >
                        <div class="col-6 col-md-3 col-xl-2 m-auto">
                            <img :src="track.cover || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid cover">
                        </div>
                        <div class="col-12 col-md-8 col-xl-10 d-flex flex-column justify-content-center">
                            <div>
                                <strong class="fs-2">{{ track.name }}</strong>
                                <p class="fs-5">{{ track.artist.name }}</p>
                            </div>
                            <div class="row d-flex flex-row" v-if="track.tags">
                                <div class="col-auto" v-for="tag in track.tags" :key="tag.id" >
                                    <TagButton :tag="tag.tag"></TagButton>
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
.swiper {
    width: 100%; /* 或者指定具体的宽度，如 600px */
    height: 100%; /* 或者指定具体的高度，如 400px */
    overflow: visible; /* 确保内容不被裁剪 */
}

.swiper-slide {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    overflow: visible; /* 确保内容不被裁剪 */
}

.card {
    max-width: 100%; /* 确保卡片不超出滑块 */
    box-sizing: border-box; /* 包含边框和内边距 */
}
.cover {
    transform: translateY(-50%);
}
</style>
