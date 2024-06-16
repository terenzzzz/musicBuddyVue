<template>
    <div class="RateBtn">
        <i class="fa-star text-warning" :class="rating>0?'fa-solid':'fa-regular'" @click="handleClick(1)"></i>
        <i class="fa-star text-warning" :class="rating>1?'fa-solid':'fa-regular'" @click="handleClick(2)"></i>
        <i class="fa-star text-warning" :class="rating>2?'fa-solid':'fa-regular'" @click="handleClick(3)"></i>
        <i class="fa-star text-warning" :class="rating>3?'fa-solid':'fa-regular'" @click="handleClick(4)"></i>
        <i class="fa-star text-warning" :class="rating>4?'fa-solid':'fa-regular'" @click="handleClick(5)"></i>
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
        return {};
    },
    methods: {
        handleClick(rating) {
            this.onRate(this.itemType,rating);
        }
    },
}
</script>