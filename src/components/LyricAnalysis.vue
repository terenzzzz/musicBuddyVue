<template>
    <div class="p-3 my-3" :class="isCard? 'card shadow':''" v-if="(chartLabels.length>0 || lyricTopWords.length>0)">
        <div class="row" >
            <div class="col-12 col-xl-6" v-if="chartLabels.length>0">
                <RadarChart class="mx-auto" :chart-data="chartData" :chart-labels="chartLabels" :chart-label-explain="chartLabelExplain" labels="Topic Probability Distribution"></RadarChart>
            </div>
            <div class="col-12 col-xl-6">
                <div class="row d-flex flex-row align-items-center" v-if="lyricTopWords.length>0">
                    <strong>Keyword:</strong>
                    <div class="col-auto" v-for="word in lyricTopWords" :key="word.id" >
                        <button class="rounded-3 btn btn-secondary my-1">{{ word.word }}</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import RadarChart from "@/components/RadarChart.vue";

export default {
    components: {RadarChart},
    props:{
        labels: {
            type: String,
            required: true
        },
        chartLabels:{
            type: Array,
            required: true
        },
        chartData:{
            type: Array,
            required: true
        },
        lyricTopWords:{
            type: Array,
            required: true
        },
        isCard:{
            type: Boolean,
            required: false,
            default: true
        },
        chartLabelExplain: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    methods: {},
}
</script>