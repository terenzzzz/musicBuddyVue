<template>
    <canvas ref="radarChart"></canvas>
</template>

<script>
import { Chart } from "chart.js";

export default {
    props: {
        labels: {
            type: String,
            required: true
        },
        chartLabels: {
            type: Array,
            required: true
        },
        chartData: {
            type: Array,
            required: true
        },
        dataSize: {
            type: Number,
            required: false,
            default: 5
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        labels() {
            this.updateChart();
        },
        chartLabels() {
            this.updateChart();
        },
        chartData() {
            this.updateChart();
        },
    },
    methods: {
        createChart() {
            const ctx = this.$refs.radarChart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: this.chartLabels.slice(0,this.dataSize),
                    datasets: [{
                        label: this.labels,
                        data: this.chartData.slice(0,this.dataSize),
                        fill: true,
                        backgroundColor: 'rgba(13, 110, 253, 0.2)',
                        borderColor: 'rgb(13, 110, 253)',
                        pointBackgroundColor: 'rgb(13, 110, 253)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(11, 94, 215)'
                    }]
                },
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    }
                }
            });
        },
        updateChart() {
            if (this.chart) {
                this.chart.data.labels = this.chartLabels.slice(0,this.dataSize);
                this.chart.data.datasets[0].label = this.labels;
                this.chart.data.datasets[0].data = this.chartData.slice(0,this.dataSize);
                this.chart.update();
            }
        }
    },
    mounted() {
        this.createChart();
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
};
</script>