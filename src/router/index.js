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

// 规则数组
const routes = [
    {
      path: "/",
      component: LandingPage,
    },
    {
        path: "/dashboard",
        component: DashBoard,
    },
    {
        path: "/search",
        component: SearchPage,
    },
    {
        path: "/tags",
        component: TagsPage,
    },
    {
        path: "/profile",
        component: ProfilePage,
    },
    {
        path: "/login",
        component: LogIn,
    },
    {
        path: "/signup",
        component: SignUp,
    },
    {
        path: '/track/:id',
        component: TrackDetail
    },
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
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     // 恢复滚动位置
    //     return savedPosition
    //   } else {
    //     // 滚动到页面顶部
    //     return { selector: 'body', behavior: 'smooth' };
    //   }
    // }
})

router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path); // 添加日志

    // 解码路径
    const decodedPath = decodeURIComponent(to.path);
    if (decodedPath === '/profile' && to.query.code) {
        const code = to.query.code;
        console.log('Authorization code:', code); // 添加日志

        // 将授权码发送到后端
        axios.post('http://localhost:6906/api/spotifyCallback', { code }) // 修正URL
            .then(response => {
                // 在这里处理后端返回的数据，例如存储访问令牌
                console.log('Token exchange response:', response.data); // 添加日志
                next();
            })
            .catch(error => {
                console.error('Error during token exchange:', error);
                next(false);
            });
    } else {
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