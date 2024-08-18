import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 引入页面
import DashBoard from "@/views/DashBoard.vue";
import LandingPage from "@/views/LandingPage.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SearchPage from "@/views/SearchPage.vue";
import TagsPage from "@/views/TagsPage.vue";
import TrackDetail from "@/views/TrackDetail.vue";
import axios from "axios";
import ArtistDetail from "@/views/ArtistDetail.vue";
import PlayList from "@/views/PlayList.vue";
import {API_URL} from "@/utils/connection";
import TuneSwipe from "@/views/TuneSwipe.vue";
import TestPage from "@/views/TestPage.vue";
import NotFound from "@/views/NotFound.vue";

// 规则数组
const routes = [
    {
      path: "/",
      component: LandingPage,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashBoard,
    },
    {
        path: "/search",
        name: "search",
        component: SearchPage,
    },
    {
        path: "/tags",
        name: "tags",
        component: TagsPage,
    },
    {
        path: "/tuneswipe",
        name: "tuneswipe",
        component: TuneSwipe,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
    },
    {
        path: "/login",
        name: "login",
        component: LogIn,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
    {
        path: '/track/:id',
        name: "track",
        component: TrackDetail
    },
    {
        path: '/artist/:id',
        name: "artist",
        component: ArtistDetail
    },
    {
        path: '/playlist/:type',
        name: 'playlist',
        component: PlayList,
    },
    {
        path: "/test",
        name: 'test',
        component: TestPage,
    },
    {
        path: '*',
        name: '404',
        component: NotFound,
    }
]


//生成路由对象
const router = new VueRouter({
  // mode: 'history',
    routes, //routes 时固定key(传入规则数组)
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
})

router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path); // 添加日志

    // 解码路径
    const decodedPath = decodeURIComponent(to.path);
    if (decodedPath === '/profile' && to.query.code) {
        // 将code发送到服务器的spotifyCallback
        const code = to.query.code;
        console.log('Authorization code:', code); // 添加日志

        // 将授权码发送到后端
        axios.post(`${API_URL}/api/spotifyCallback`, { code }) // 修正URL
            .then(response => {
                // 在这里处理后端返回的数据，例如存储访问令牌
                console.log('Token exchange response:', response.data); // 添加日志
                next();
            })
            .catch(error => {
                console.error('Error during token exchange:', error);
                next(false);
            });
    }else if (to.path !== '/' && to.path !== '/login' && to.path !== '/signup' && !localStorage.getItem('access_token')) {
        if (router.currentRoute.path !== '/') {
            console.log('Redirecting to / due to missing access token'); // 添加日志
            return router.push({
                path: '/'
            });
        } else {
            next(false);
        }
    }else {
        next();
    }
});


// // //路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path != '/' && !sessionStorage.getItem('id')) {
//     return router.push({
//       path:'/'
//     })
//   } else {
//     next()
//   }
// })
  
export default router