<template>
    <div class="pieChart">
        <canvas id="pieChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册插件
Chart.register(ChartDataLabels);

export default {
    props: {
        labels: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
    },
    mounted() {
        this.$nextTick(() => {
            // Initialize the main chart
            this.initChart();
        })
    },
    data() {
        return {
            chartInstance: null // 存储图表实例
        };
    },
    watch: {
        labels: {
            handler(newLabels) {
                if (this.chartInstance) {
                    this.chartInstance.data.labels = newLabels;
                    this.chartInstance.update();
                }
            },
            deep: true
        },
        data: {
            handler(newData) {
                if (this.chartInstance) {
                    this.chartInstance.data.datasets[0].data = newData;
                    this.chartInstance.update();
                }
            },
            deep: true
        }
    },
    methods: {
        initChart() {
            const ctx = document.getElementById('pieChart').getContext('2d');
            this.chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.labels,
                    datasets: [{
                        data: this.data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        },
                        datalabels: {
                            color: '#fff',
                            font: {
                                weight: 'bold',
                                size: 14
                            },
                            formatter: (value, context) => {
                                const label = context.chart.data.labels[context.dataIndex];
                                const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / sum) * 100).toFixed(0) + '%';
                                return `${label}\n${percentage}`;
                            }
                        }
                    }
                }
            });
        },
    },
};
</script>
