import Vue from 'vue'
import App from './App.vue'
import router from "@/router"

import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.bundle.min.js' //引用bootstrap的js
import 'bootstrap-icons/font/bootstrap-icons.css'


Vue.config.productionTip = false

const script = document.createElement('script');
script.src = 'https://open.spotify.com/embed/iframe-api/v1';
script.async = true;
document.body.appendChild(script);

script.onload = () => {
  window.spotifyApiReady = true;
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')