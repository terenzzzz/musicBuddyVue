<template>
    <div id="cal-heatmap"></div>
</template>

<script>
import CalHeatmap from 'cal-heatmap';
// Optionally import the CSS
import 'cal-heatmap/cal-heatmap.css';
export default {
    name: 'HeatMap',
    mounted() {
        const cal = new CalHeatmap();
        cal.paint({});
    },

};
</script>

<style scoped>

</style>
