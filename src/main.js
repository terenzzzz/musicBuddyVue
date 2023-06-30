import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

import {
  Button, Field, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Search,
  Card,Tab, Tabs,SwipeCell,NavBar,Cell,CellGroup,Col,Row,Dialog,Tag } from 'vant'
import 'vant/lib/index.css'
Vue.use(Button)
Vue.use(Field)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Search)
Vue.use(Card)
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(SwipeCell);
Vue.use(NavBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(Tag);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')