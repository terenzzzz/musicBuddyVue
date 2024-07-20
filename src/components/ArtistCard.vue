<template>
    <router-link :to="`/artist/${artist._id}`">
        <div class="card rounded-4 border-0 bg-transparent" >
            <div class="position-relative">
                <div class="ratio ratio-1x1">
                    <img :src="artist.avatar || 'https://placehold.co/600x600?text=No+Cover'"
                         class="img-fluid d-block mx-auto rounded-circle object-fit-cover">
                </div>

                <h5 class="card-title text-center text-truncate">{{ artist.name }}</h5>
                <p v-if="similarity !== -1" :class="similarityColor" class="text-center">{{ (similarity * 100).toFixed(3) }}%</p>
            </div>
        </div>
    </router-link>
</template>

<script>
import isValidMongoId from "@/utils/isValidMongoId";

export default {
    props: {
        artist: {
            type: Object,
            required: true
        },
        similarity:{
            type: Number,
            required: false,
            default: -1
        }
    },
    data() {
        return {
            providedByMusicBuddy: !!isValidMongoId(this.track._id),
        }
    },
    computed: {
        similarityColor() {
            const similarity = this.similarity * 100
            if (similarity > 0 && similarity < 35) {
                return "text-light"; // 使用 Bootstrap 的类名
            } else if (similarity >= 35 && similarity < 70) {
                return "text-warning";
            } else if (similarity >= 70) {
                return "text-success";
            }
            return "text-light";
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
.img-container {
    position: relative;
    padding-bottom: 100%; /* 创建一个正方形容器 */
}

.img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>