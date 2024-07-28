<template>
    <div class="VinylRecord position-relative w-100" :class="{ 'spinning': isSpin }">
        <img src="@/assets/images/cd.png" class="d-block w-100">
        <img :src="cover" class="position-absolute top-50 start-50 translate-middle cover rounded-circle">
    </div>
</template>

<script>
export default {
    props: {
        cover: {
            type: String,
            required: true,
            default: "https://placehold.co/600x600?text=No+Cover"
        },
        isSpin:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {},
}
</script>

<style scoped>
.VinylRecord img {
    max-width: 100%;
}

.VinylRecord .cover {
    width: 60%; /* Adjust this value as needed */
    height: auto;
}

.VinylRecord {
    transition: transform 0.5s ease;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinning {
    animation: spin 5s linear infinite;
}
</style>