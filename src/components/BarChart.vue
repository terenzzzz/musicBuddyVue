<template>
    <div>
        <canvas ref="barChart" @click="openModal"></canvas>
        <!-- Modal for displaying the chart -->
        <div class="modal fade" id="barChartModel" tabindex="-1" aria-labelledby="barChartModel" >
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content p-2">
                    <i class="fa-solid fa-x p-4" data-bs-dismiss="modal" aria-label="Close"></i>
                    <h3 class="text-center">{{labels}}</h3>
                    <div class="modal-body">
                        <canvas ref="modalChart"></canvas>
                    </div>
                    <small class="text-muted" v-if="note">{{ note }}</small>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Chart from 'chart.js/auto';



export default {
    name: 'BarChart',
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
        note: {
            type: String,
            required: false,
            default: ""
        },
        showLegend:{
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            chartInstance: null // 存储图表实例
        };
    },
    watch: {
        chartLabels: {
            handler(newLabels) {
                if (this.chartInstance) {
                    this.chartInstance.data.labels = newLabels;
                    this.chartInstance.update();
                }
            },
            deep: true
        },
        chartData: {
            handler(newData) {
                if (this.chartInstance) {
                    this.chartInstance.data.datasets[0].data = newData;
                    this.chartInstance.update();
                }
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            // Initialize the main chart
            this.renderChart();

            // Setup the modal chart initialization
            const modalElement = document.getElementById('barChartModel');
            modalElement.addEventListener('shown.bs.modal', () => {
                this.$nextTick(() => {
                    this.renderModalChart();
                });
            });
        });
    },
    beforeDestroy() {
        if (this.chartInstance) {
            this.chartInstance.destroy(); // 销毁图表实例
        }
    },
    methods: {
        openModal() {
            const modalElement = document.getElementById('barChartModel');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement); // 创建模态框实例
                modal.show(); // 显示模态框
            }
        },
        renderChart() {
            const ctx = this.$refs.barChart.getContext('2d');
            this.chartInstance = new Chart(ctx, this.generateChart());
        },
        renderModalChart() {
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


        generateChart(){
            return {
                type: 'bar',
                    data: {
                labels: this.chartLabels,
                    datasets: [
                    {
                        label: this.labels,
                        backgroundColor: 'rgba(13, 110, 253, 0.2)',
                        borderColor: 'rgb(13, 110, 253)',
                        borderWidth: 1.5,
                        data: this.chartData
                    }
                ]
            },
                options: { // options 应放在 data 的同级，而不是 data 内部
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false // Hide x-axis grid lines
                            },
                            ticks: {
                                autoSkip: false // Show all ticks
                            }
                        },
                        y: {
                            grid: {
                                display: true // Show y-axis grid lines
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: this.showLegend // 这里禁用了图例显示
                        }
                    }
                }
            }
        }

    }
};
</script>