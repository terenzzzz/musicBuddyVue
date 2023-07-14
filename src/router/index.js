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
import TourVisitView from '@/views/Works/TourVisitView'

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
    component: TourVisitView,
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
    // routes: routes
    routes //routes 时固定key(传入规则数组)
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