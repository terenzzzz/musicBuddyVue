<template>
    <div class="LineChart">
<!--        <p type="button" class="position-absolute" data-bs-toggle="modal"-->
<!--                data-bs-target="#LineChartModel" style="top: 15px; right: 15px;">Zoom</p>-->

        <canvas ref="LineChart" @click="openModal"></canvas>
        <!-- Modal for displaying the chart -->
        <div class="modal fade" id="LineChartModel" tabindex="-1" aria-labelledby="LineChartModel" >
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content p-2">
                    <i class="fa-solid fa-x p-4" data-bs-dismiss="modal" aria-label="Close"></i>
                    <h3 class="text-center">{{title}}</h3>
                    <div class="modal-body">
                        <canvas ref="modalChart"></canvas>
                    </div>
                    <small class="text-muted ">* Only 50 recently played are processed</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Chart from 'chart.js/auto';


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
        openModal() {
            const modalElement = document.getElementById('LineChartModel');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement); // 创建模态框实例
                modal.show(); // 显示模态框
            }
        },
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

                    this.modalChart = new Chart(ctx, this.generateChart());
                } else {
                    console.error('Modal canvas context is not available.');
                }
            } else {
                console.error('Modal canvas element is not available.');
            }
        },

        generateChart() {
            return {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: this.title,
                            data: this.data,
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
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false // 隐藏 x 轴网格线
                            },
                            ticks: {
                                callback: function(value, index, values) {
                                    const date = new Date(this.getLabelForValue(value));
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const year = date.getFullYear();

                                    // 获取轴的宽度
                                    const axisWidth = this.width;

                                    // 估算可用空间
                                    const availableWidth = axisWidth / values.length;

                                    // 如果有足够空间，显示年份
                                    if (availableWidth > 70) { // 你可以调整这个阈值
                                        return `${year}-${month}-${day}`;
                                    } else {
                                        return `${month}-${day}`;
                                    }
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
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
