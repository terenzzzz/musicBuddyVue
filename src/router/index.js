import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 引入页面
import HomeView from '@/views/HomeView'
import WorksView from '@/views/WorksView'
import BlogView from '@/views/BlogView'
import ContactView from '@/views/ContactView'

import OpenGL from '@/views/Works/OpenGL'
import NGrams from '@/views/Works/NGrams'
import HealthyExpert from '@/views/Works/HealthyExpertView'
import BirdWatching from '@/views/Works/BirdWatchingView'
import TourVisit from '@/views/Works/TourVisitView'
import Robotic from '@/views/Works/RoboticView'
import TheBigWalk from '@/views/Works/TheBigWalkView'
import TextProcessing from '@/views/Works/TextProcessingView'
import DataDriven from '@/views/Works/DataDrivenView'
import RentSystem from '@/views/Works/RentSystemView'
import EightOff from '@/views/Works/EightOffView'
import NeteaseMusic from '@/views/Works/NeteaseMusicView'
import Eleme from '@/views/Works/ElemeView'

import AIO from '@/views/Blogs/AIOView'
import PVE from '@/views/Blogs/PVEView'
import OpenWrt from '@/views/Blogs/OpenWrtView'
import Linux from '@/views/Blogs/LinuxView'
import Synology from '@/views/Blogs/SynologyView'

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
    path: '/works/nGrams',
    component: NGrams,
  },
  {
    path: '/works/OpenGL',
    component: OpenGL,
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
  {
    path: '/works/TheBigWalk',
    component: TheBigWalk,
  },
  {
    path: '/works/TextProcessing',
    component: TextProcessing,
  },
  {
    path: '/works/DataDriven',
    component: DataDriven,
  },
  {
    path: '/works/RentSystem',
    component: RentSystem,
  },
  {
    path: '/works/EightOff',
    component: EightOff,
  },
  {
    path: '/works/NeteaseMusic',
    component: NeteaseMusic,
  },
  {
    path: '/works/Eleme',
    component: Eleme,
  },


  //博客路由
  {
    path: "/blogs",
    component: BlogView
  },
  {
    path: '/blogs/AIO',
    component: AIO,
  },
  {
    path: '/blogs/PVE',
    component: PVE,
  },
  {
    path: '/blogs/OpenWrt',
    component: OpenWrt,
  },
  {
    path: '/blogs/Linux',
    component: Linux,
  },
  {
    path: '/blogs/Synology',
    component: Synology,
  },


  {
    path: "/contact",
    component: ContactView
  },

]


//生成路由对象
const router = new VueRouter({
  // mode: 'history',
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