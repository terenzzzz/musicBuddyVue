<template>
    <div class="mt-2 w-100 PieSlider">
        <h4 class="red-bottom mt-2">Adjust Model Weights</h4>
        <div class="row">
            <div class="col-12">
                <canvas id="weightChart"></canvas>
            </div>
            <div class="col-12">
                <div class="model-weight" v-for="(model, index) in modelWeighting" :key="index">
                    <div class="d-flex justify-content-between align-items-center">
                        <label :for="model.name" class="font-weight-bold">{{ model.name }}</label>
                        <span class="badge badge-primary">{{ model.value }}%</span>
                    </div>
                    <input
                        :id="model.name"
                        type="range"
                        class="custom-range"
                        v-model.number="model.value"
                        min="0"
                        max="100"
                        @change="updateWeights"
                        :disabled="disabled"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册插件
Chart.register(ChartDataLabels);

export default {
    props: {
        modelWeighting: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            const ctx = document.getElementById('weightChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.modelWeighting.map(model => model.name),
                    datasets: [{
                        data: this.modelWeighting.map(model => model.value),
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
        updateWeights() {
            this.chart.data.datasets[0].data = this.modelWeighting.map(model => model.value);
            this.chart.update();
            this.$emit('update:models', this.modelWeighting);
        },
    },
};
</script>

<style scoped>
.PieSlider{
    transition: 0.2s;
}

.model-weight {
    margin-bottom: 1rem;
}

.custom-range {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #d3d3d3;
    opacity: 0.7;
    transition: opacity .2s;
}

.custom-range:hover {
    opacity: 1;
}


.badge-primary {
    background-color: #0d6efd;
    padding: 0.5em 0.75em;
    font-size: 0.9em;
}

h3 {
    color: #333;
    border-bottom: 2px solid #0d6efd;
    padding-bottom: 10px;
    width: fit-content;
}
</style>