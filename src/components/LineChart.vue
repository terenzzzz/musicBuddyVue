<template>
    <div class="LineChart">
        <p type="button" class="position-absolute" data-bs-toggle="modal"
                data-bs-target="#LineChartModel" style="top: 15px; right: 15px;">Zoom</p>

        <canvas ref="LineChart"></canvas>
        <!-- Modal for displaying the chart -->
        <div class="modal fade" id="LineChartModel" tabindex="-1" aria-labelledby="LineChartModel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <i class="fa-solid fa-x p-4" data-bs-dismiss="modal" aria-label="Close"></i>
                    <h3 class="text-center">{{title}}</h3>
                    <div class="modal-body">
                        <!-- Canvas for Chart -->
                        <canvas ref="modalChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
    data() {
        return {
            chart: null, // For the chart in the main view
            modalChart: null // For the chart in the modal
        };
    },
    props: {
        title: {
            type: String,
            required: true
        },
        labels: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            // Initialize the main chart
            this.initChart();

            // Setup the modal chart initialization
            const modalElement = document.getElementById('LineChartModel');
            modalElement.addEventListener('shown.bs.modal', () => {
                this.$nextTick(() => {
                    this.initModalChart();
                });
            });
        });
    },
    watch: {
        title() {
            this.updateChart();
        },
        labels() {
            this.updateChart();
        },
        data() {
            this.updateChart();
        }
    },
    methods: {
        initChart() {
            const canvas = this.$refs.LineChart;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    this.chart = new Chart(ctx, this.generateChart(4));
                } else {
                    console.error('Canvas context is not available.');
                }
            } else {
                console.error('Canvas element is not available.');
            }
        },

        initModalChart() {
            const canvas = this.$refs.modalChart;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    if (this.modalChart) {
                        this.modalChart.destroy(); // Destroy any previous instance of the chart
                    }

                    this.modalChart = new Chart(ctx, new Chart(ctx, this.generateChart()));
                } else {
                    console.error('Modal canvas context is not available.');
                }
            } else {
                console.error('Modal canvas element is not available.');
            }
        },

        generateChart(amount) {
            const numLabels = Math.min(amount, this.labels.length);

            // Slice the labels and data arrays to get the last `numLabels` items
            const labelsToUse = this.labels.slice(-numLabels);
            const dataToUse = this.data.slice(-numLabels);

            return {
                type: 'line',
                data: {
                    labels: labelsToUse,
                    datasets: [
                        {
                            label: this.title,
                            data: dataToUse,
                            borderColor: 'rgb(13, 110, 253)',
                            backgroundColor: 'rgba(13, 110, 253, 0.2)',
                            borderWidth: 1,
                            fill: true,
                            pointBackgroundColor: 'rgb(13, 110, 253)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(11, 94, 215)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                callback: function(value) {
                                    // 假设 value 是 'YYYY-MM-DD' 格式的字符串
                                    if (amount>3){
                                        const date = new Date(value);
                                        const month = date.getMonth() + 1; // 月份从 0 开始
                                        const day = date.getDate();
                                        return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                    }
                                    return value

                                }
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            };
        },

        updateChart() {
            if (this.chart) {
                this.chart.data.labels = this.labels;
                this.chart.data.datasets[0].data = this.data;
                this.chart.update();
            }
        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
        if (this.modalChart) {
            this.modalChart.destroy();
        }
    }
};
</script>
