<template>
    <div class="Text container d-flex align-items-center w-100">
        <div class="card w-100 p-5">
            <h3 class="mb-3">{{labels}}</h3>
            <bar-chart :chart-data="chartData" :chart-labels="chartLabels" :labels="labels" :show-legend="false"/>
        </div>

    </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
    components: {BarChart},
    data() {
        return {
            chartData: [4.54, 4.72, 4.54, 4.54],
            chartLabels: ["Tags Filtering", "Search Filtering", "Metadata Visualization", "Statistics and Report"],
            labels: "Average Score for Music Exploration"
        };
    },
    methods: {},
}
</script>