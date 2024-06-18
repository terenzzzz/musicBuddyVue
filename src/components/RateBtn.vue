<template>
    <div class="RateBtn">
        <i v-for="star in 5" :key="star"
           class="fa-star text-warning"
           :class="[
                (hoverRating > 0 ? hoverRating >= star : rating >= star) ? 'fa-solid' : 'fa-regular',
                { 'hovered': hoverRating >= star }
            ]"
           @click="handleClick(star)"
           @mouseenter="handleMouseEnter(star)"
           @mouseleave="handleMouseLeave"
        ></i>
    </div>
</template>

<script>

export default {
    props:{
        rating: {
          type: Number,
          required: true
        },
        onRate: {
            type: Function,
            required: true
        },
        itemType: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            hoverRating: 0
        };
    },
    methods: {
        handleClick(rating) {
            this.onRate(this.itemType,rating);
        },
        handleMouseEnter(star) {
            this.hoverRating = star;
        },
        handleMouseLeave() {
            this.hoverRating = 0;
        }
    },
}
</script>

<style scoped>
.fa-star {
    cursor: pointer;
    transition: color 0.2s;
}
.hovered {
    color: #ffc107 !important; /* 使用 !important 确保覆盖其他样式 */
}
</style>