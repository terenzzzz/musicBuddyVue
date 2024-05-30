<template>
  <div id="app">
    <NavBar></NavBar>
    <!-- <div id="particles"></div> -->
    <router-view></router-view>
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>

import BottomFooter from "@/components/BottomFooter.vue";
import NavBar from "@/components/NavBar.vue";


export default {
  name: 'App',
  components: {
    NavBar,
    BottomFooter,
  },
  mounted() {
    // require('particles.js')
    // // eslint-disable-next-line no-undef
    // particlesJS('particles', particlesJson)
  }

}


</script>

<style>
#app{
  box-sizing: border-box;
  width: 100%;
  margin: 0;
}

#app a{
  text-decoration: none;
  color: inherit;
}

.page-container {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.red-text {
  color: #FF6666;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
}

.horizontal-scroll::-webkit-scrollbar {
    height: 8px; /* 调整滚动条高度 */
}

.horizontal-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* 滚动条的颜色 */
    border-radius: 10px; /* 滚动条圆角 */
}

.horizontal-scroll::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1); /* 滚动条轨道的颜色 */
    border-radius: 10px; /* 滚动条轨道圆角 */
}


</style>
