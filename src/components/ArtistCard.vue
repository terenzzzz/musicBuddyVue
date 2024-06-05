<template>
    <router-link :to="`/artist/${artist._id}`" >
        <div class="card rounded-4 h-100  border-0" style="background-color: #f1f4f9;">
            <div class="position-relative">
                <img :src="artist.avatar || 'https://placehold.co/600x600?text=No+Cover'" class="img-fluid d-block mx-auto rounded-circle" >
                <h5 class="card-title text-center">{{ artist.name }}</h5>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        artist: {
            type: Object,
            required: true
        }
    },
    methods: {
    }
};
</script>

<style>
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