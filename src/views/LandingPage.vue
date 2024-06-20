<template>
    <div class="container-fluid p-0 my-0">
        <div class="posters-background">
            <div class="col-lg-6 content-wrapper">
                <div class="mb-3">
                    <div>
                        <h2 class="fw-bold display-5">Explore Your Musical Taste</h2>
                    </div>
                </div>
                <div class="mb-3 fs-5 fw-medium">
                    <div>
                        <p>Helping you listen to the music in your own way.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row bg-light pb-3 d-flex justify-content-center px-1 px-sm-3 px-md-5">
            <div class="col-12">
                <h2 class="text-center mt-5 mb-1">Our Music Data</h2>
                <p class="text-center mb-2">Take a look at some of the Tracks on our platform.</p>
                <div class="horizontal-scroll">
                    <div class="col-3 col-md-2 mx-2" v-for="track in tracks" :key="track.id">
                        <TrackCard :track="track"></TrackCard>
                    </div>
                </div>
            </div>
        </div>

        <div class="row bg-light pb-3 d-flex justify-content-center px-1 px-sm-3 px-md-5">
            <div class="col-12">
                <h2 class="text-center mt-5 mb-1">Our Model</h2>
                <div v-if="model.embedding && model.words">
                    <svg ref="chart" :width="chartWidth" :height="chartHeight"></svg>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>

        <div class="row mx-4 mt-5 px-5">
            <h2 class="fw-medium fs-1 pt-2 w-100">Why Use Our Website?</h2>
            <div class="col-12 col-md-6 col-xl-3">
                <div class="mt-3 row">
                    <div class="col-3 mx-auto"><img src="../assets/images/musicBuddyVueLogo.png" class="img-fluid" ></div>
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <h3 class="m-0">Reliable Recommendation</h3>
                    </div>
                    <p class="mt-2">Based on advanced algorithms and rich data, make sure you find the music you want every time you recommend it.</p>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
                <div class="mt-3 row">
                    <div class="col-3 mx-auto"><img src="../assets/images/musicBuddyVueLogo.png" class="img-fluid" ></div>
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <h3 class="m-0">Analysis Report</h3>
                    </div>

                    <p class="mt-2">Statistics and analysis of users listening to give you a clearer understanding of your own music behavior</p>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
                <div class="mt-3">
                    <div class="mt-3 row">
                        <div class="col-3 mx-auto"><img src="../assets/images/musicBuddyVueLogo.png" class="img-fluid" ></div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <h3 class="m-0">Large Library and Playback</h3>
                        </div>
                    </div>

                    <p class="mt-2">Up to 50,000 songs from 2008 to 2010 and offers demo features</p>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
                <div class="mt-3 row">
                    <div class="col-3 mx-auto"><img src="../assets/images/musicBuddyVueLogo.png" class="img-fluid" ></div>
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <h3 class="m-0">Easy and User Friendly</h3>
                    </div>

                    <p class="mt-2">The design is simple and easy to operate, so that you can easily enjoy the wonderful experience of music.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getRandomTrack } from "@/api/tracks";
import TrackCard from "@/components/TrackCard.vue";
import { get2dModel } from "@/api/recommend";
import * as d3 from "d3";

export default {
    components: { TrackCard },
    data() {
        return {
            tracks: [],
            model: [],
            chartWidth: 800,
            chartHeight: 600
        };
    },
    methods: {
        async fetch2dModel() {
            try {
                const response = await get2dModel();
                if (response.data.status === 200) {
                    this.model = response.data.data;
                    this.$nextTick(this.drawChart);
                } else {
                    console.error("Error fetching tracks:", response.data.message);
                }
            } catch (err) {
                console.error("Error fetching tracks:", err.message);
            }
        },
        async fetchRandomTracks() {
            try {
                const response = await getRandomTrack();
                if (response.data.status === 200) {
                    this.tracks = response.data.data;
                } else {
                    console.error("Error fetching tracks:", response.data.message);
                }
            } catch (err) {
                console.error("Error fetching tracks:", err.message);
            }
        },
        drawChart() {
            const data = this.model.embedding.map((d, i) => ({
                x: d[0],
                y: d[1],
                word: this.model.words[i]
            }));

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = this.chartWidth - margin.left - margin.right;
            const height = this.chartHeight - margin.top - margin.bottom;

            const svg = d3.select(this.$refs.chart);
            svg.selectAll("*").remove(); // Clear previous content

            const chart = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear().domain(d3.extent(data, d => d.x)).range([0, width]);
            const y = d3.scaleLinear().domain(d3.extent(data, d => d.y)).range([height, 0]);

            chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
            chart.append("g").call(d3.axisLeft(y));

            chart
                .selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", 3)
                .attr("fill", "blue");

            chart
                .selectAll(".label")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", d => x(d.x) + 5)
                .attr("y", d => y(d.y))
                .text(d => d.word)
                .attr("font-size", "10px")
                .attr("fill", "black");
        }
    },
    created() {
        this.fetchRandomTracks();
        this.fetch2dModel();
    }
};
</script>

<style scoped>
.posters-background {
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url('../assets/images/posters.png');  /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.posters-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  background-repeat: inherit;
  filter: blur(10px);  /* 添加模糊滤镜 */
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);  /* 添加半透明背景以提高可读性 */
  color: white;  /* 设置文本颜色为白色，确保在深色背景上可见 */
  border-radius: 10px;
}
</style>