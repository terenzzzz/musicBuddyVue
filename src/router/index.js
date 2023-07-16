import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 引入页面
import HomeView from '@/views/HomeView'
import WorksView from '@/views/WorksView'
import BlogView from '@/views/BlogView'
import ContactView from '@/views/ContactView'

import HealthyExpert from '@/views/Works/HealthyExpertView'
import BirdWatching from '@/views/Works/BirdWatchingView'
import TourVisit from '@/views/Works/TourVisitView'
import Robotic from '@/views/Works/RoboticView'

// 规则数组
const routes = [
  {
    path: "/",
    component: HomeView,
  },

  // 项目路由
  {
    path: "/works",
    component: WorksView,
  },
  {
    path: '/works/HealthyExpert',
    component: HealthyExpert,
  },
  {
    path: '/works/BirdWatching',
    component: BirdWatching,
  },
  {
    path: '/works/TourVisitView',
    component: TourVisit,
  },
  {
    path: '/works/Robotic',
    component: Robotic,
  },


  //博客路由
  {
    path: "/blog",
    component: BlogView
  },
  {
    path: "/contact",
    component: ContactView
  },

//   {
//     path: '/layout',
//     component: Layout,
//     redirect:'/layout/home',
//     children: [
//       {
//         path: 'home',
//         component: Home,
//         meta: {
//           title: "首页",
//           name:'home'
//         }
//       },
//       {
//         path: 'mission',
//         component: Mission,
//         meta: {
//             title:"任务",
//             name:'mission'
//         }
//       },
//     ]
//   },

]


//生成路由对象
const router = new VueRouter({
  mode: 'history',
    // routes: routes
    // scrollBehavior: () => ({y: 0}),
    routes, //routes 时固定key(传入规则数组)
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        // 恢复滚动位置
        return savedPosition
      } else {
        // 滚动到页面顶部
        return { selector: 'body', behavior: 'smooth' };
      }
    }
})


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