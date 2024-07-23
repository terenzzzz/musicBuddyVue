<template>
    <div class="SingleStar">
        <i class="fa-star text-warning fa-solid fs-5"></i>
        <small class="rating-number small">{{ rating }}</small>
    </div>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            required: true
        },
    },
    methods: {},
}
</script>

<style scoped>
.SingleStar {
    position: relative;
    display: inline-block;
}

.rating-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #FFFFFF; /* Adjust color as needed */
}
</style>