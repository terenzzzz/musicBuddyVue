<template>

        <van-circle
            v-model="init"
            :rate="computedRate"
            speed="50"
            :text="currentCount.toString()"
            size="30px"
            :stroke-width="100"/>

</template>

<script>
import { Circle } from 'vant';

export default {
    components: {
        'van-circle': Circle
    },
    data(){
        return{
            init:0
        }
    },
    props: {
        currentCount: {
            type: Number,
            required: true
        },
        totalCount: {
            type: Number,
            required: true
        }
    },
    computed: {
        computedRate() {
            // 计算 rate

            return this.totalCount > 0 ? (this.currentCount / this.totalCount) * 100 : 0;
        }
    }
};
</script>
