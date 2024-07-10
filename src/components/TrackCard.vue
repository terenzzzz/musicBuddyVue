<template>
    <router-link :to="`/track/${track._id}`" class="TrackCard" >
        <div class="my-1">
            <div class="card rounded-4 shadow-sm overflow-hidden" @mousemove="onMove" @mouseleave="onLeave">
                <div class="position-relative">
                    <div class="ratio ratio-1x1">
                        <img :src="track.cover || 'https://placehold.co/600x600?text=No+Cover'"
                             class="img-fluid d-block mx-auto rounded-4 object-fit-cover" >

                    </div>

                    <!-- 左上角的logo -->
                    <div class="position-absolute top-0 start-0 bg-body bg-opacity-50 text-white p-1 rounded-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <img v-if="providedByMusicBuddy" src="@/assets/images/musicBuddyVueLogo.png" class="img-fluid" style="width: 30px; height: 30px;">
                        <div v-else class="d-flex align-items-center justify-content-center" style="width: 30px; height: 30px;">
                            <i class="fa-brands fa-spotify"></i>
                        </div>
                    </div>

                    <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 rounded-bottom-4">
                        <p class="card-title modelName mb-0 text-truncate ">{{track.name}}</p>
                        <span class="m-0 p-0 text-truncate d-block"><small>{{track.artist.name}}</small></span>
                    </div>
                </div>
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
      }
    },
    data() {
        return {
            providedByMusicBuddy: !!isValidMongoId(this.track._id),
        }
    },
    methods: {
        onMove(e) {
            const img = e.currentTarget.querySelector('img');
            img.style.transform = 'scale(1.3)'; // 改变img的scale
        },
        onLeave(e) {
            const img = e.currentTarget.querySelector('img');
            img.style.transform = 'scale(1)'; // 恢复img的scale
        }
    },
};
</script>

<style scoped>
.card img{
 transition: 0.3s;
}
</style>
