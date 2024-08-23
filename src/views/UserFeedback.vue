<template>
    <div class="Text container d-flex flex-column align-items-center w-75">
        <h1 class="text-primary mt-5">User Feedback Report</h1>
        <p class="text-muted">Last Update 20/08/2024</p>

        <div class="card w-100 p-3 mt-3 rounded-3">
            <h4 class="mb-5">Average Score and Limitation for Music Exploration</h4>
            <bar-chart
                :chart-data="[4.40, 4.53, 4.47, 4.40]"
                :chart-labels="['Tags Filtering', 'Search Filtering', 'Metadata Visualization', 'Statistics and Report']"
                :labels="'Average Score for Music Exploration'"
                :show-legend="false"/>

            <div class="row mt-3">
                <ul class="col-6 ps-5">
                    <li>Searching is not efficient</li>
                    <li>Provide more types of reports</li>
                    <li>Audio sources are not diverse enough</li>
                </ul>
                <ul class="col-6 ps-5">
                    <li>Metadata and audio source information are not comprehensive enough</li>
                    <li>Music library size of the system is insufficient</li>
                    <li>Need more filters and sorting options in search and tags functions</li>
                </ul>
            </div>


        </div>

        <div class="card w-100 p-3 mt-3 rounded-3">
            <h4 class="mb-5">Average Score and Limitation for Music Recommendation</h4>
            <bar-chart
                :chart-data="[3.46, 3.20, 3.20, 3.66, 4.33, 4.53, 3.40]"
                :chart-labels="['Keyword Mode', 'Semantic mode', 'Topic mode', 'Weighted mode','Adjustment options', 'Random recommendation', 'Overall Recommendation']"
                :labels="'Average Score for Music Exploration'"
                :show-legend="false"/>

            <div class="row mt-3">
                <ul class="col-6 ps-5">
                    <li>Recommendation is not efficient and accurate</li>
                    <li>Insufficiently diversified input data</li>
                    <li>Lack of personalized recommendations (e.g., mood or scene-based or genre)</li>
                </ul>
                <ul class="col-6 ps-5">
                    <li>No feedback mechanism for improving future recommendations</li>
                    <li>Repetitive content in recommendations</li>
                </ul>
            </div>

        </div>

        <div class="card w-100 p-3 mt-3 rounded-3">
            <h4 class="mb-5">Average Score and Limitation for Application</h4>
            <bar-chart
                :chart-data="[4.73, 4.00]"
                :chart-labels="['System interface', 'Overall assessment of the system']"
                :labels="'Average Score for Music Exploration'"
                :show-legend="false"/>

            <div class="row mt-3">
                <ul class="col-6 ps-5">
                    <li>Lack of diversification in third-party connections</li>
                    <li>User experience is not smooth enough</li>
                </ul>
                <ul class="col-6 ps-5">
                    <li>Need for better user interaction (e.g., track comments, guidance information)</li>
                </ul>
            </div>
        </div>

        <div class="card w-100 p-3 mt-3 rounded-3">
            <h4 class="mb-5">Average Score for Three Main Part of the System</h4>
            <bar-chart
                :chart-data="[4.45, 3.68, 4.37]"
                :chart-labels="['Music Exploration', 'Music Recommendation', 'Overall System']"
                :labels="'Average Score for Three Main Part of the System'"
                :show-legend="false"/>

        </div>

    </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
    components: {BarChart}
}
</script>

<style scoped>
ul li {
    list-style-type: square; /* 使用方块作为列表符号 */
}
</style>