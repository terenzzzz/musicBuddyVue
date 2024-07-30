<template>
    <router-link :to="`/track/${track._id}`" :class="isBorder? 'card':''">
        <div class="row">
            <div class="col-4 col-sm-3 mb-2">
                <div class="position-relative">
                    <img :src="track.cover || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid">
                    <!-- 左上角的logo -->
<!--                    <div class="position-absolute top-0 start-0 bg-body bg-opacity-50 text-white p-1-->
<!--                            d-flex align-items-center justify-content-center" style="width: 30px; height: 30px;">-->
<!--                        <img v-if="providedByMusicBuddy" src="@/assets/images/musicBuddyVueLogo.png" class="img-fluid"-->
<!--                             style="width: 20px; height: 20px;">-->
<!--                        <div v-else class="d-flex align-items-center justify-content-center"-->
<!--                                style="width: 20px; height: 20px;">-->
<!--                            <i class="fa-brands fa-spotify"></i>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="col-8 d-flex flex-column align-items-center justify-content-center">
                <p class="card-title modelName mb-0 text-truncate w-100 text-center fw-bold">{{track.name}}</p>
                <span class="fw-medium text-muted">{{ track.artist.name }} </span>
            </div>
        </div>
    </router-link>
</template>

<script>
import isValidMongoId from "@/utils/isValidMongoId";

export default {
    props: {
        track: {
            type: Object,
            required: true
        },
        isBorder: {
            type: Boolean,
            required: false,
            defaults: false
        },
    },
    methods: {
    },
    data(){
        return {
            providedByMusicBuddy: !!isValidMongoId(this.track._id),
        }
    }
};
</script>

