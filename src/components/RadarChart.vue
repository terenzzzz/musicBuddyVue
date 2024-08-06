<template>
    <canvas ref="radarChart" class="w-100"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

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
        },
        chartLabelExplain: {
            type: Array,
            required: false,
            default: () => []
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
                    labels: this.chartLabels.slice(0,this.dataSize), // 标签
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
                    scales: {
                        r: {
                            ticks: {
                                display: false
                            },
                        }
                    },
                    plugins: {
                        datalabels: {
                            display: false // 这会隐藏所有数据标签
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                const label = data.labels[tooltipItem.index];
                                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                                // 获取当前标签的解释，如果没有则使用默认值
                                const explanation = `${- this.chartLabelExplain[tooltipItem.index] || ''}`;

                                return `${label}: ${value} ${explanation}`;
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 3
                        },

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