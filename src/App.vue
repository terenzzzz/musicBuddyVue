<template>
    <div id="app" >
        <NavBar></NavBar>

        <!-- 缓存需要的多个路由 -->
        <keep-alive>
            <router-view
                v-if="cachedRoutes.includes($route.name)"
                style="min-height: 100vh;"
            ></router-view>
        </keep-alive>

        <!-- 不缓存的路由 -->
        <router-view v-if="!cachedRoutes.includes($route.name)"></router-view>

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
    },

    data() {
        return {
            // 需要缓存的路由名称列表
            cachedRoutes: ['dashboard', 'search', 'tags', 'tuneswipe', 'profile']
        };
    }

}


</script>

<style>
#app{
  box-sizing: border-box;
  width: 100%;
  margin: 0;
    background-color: #f1f4f9;
}

#app a{
  text-decoration: none;
  color: inherit;
}

#app p{
    margin: 0;
}

.red-text{
    color: #0d6efd;
}

.red-bottom{
    width: fit-content;
    border-bottom: 3px solid #0d6efd;
}

.page-container {
    width: 90%;
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

.footer-bottom {
    position: relative; /* Make footer relative to the parent container */
    left: 0;
    bottom: 0;
}
</style>
