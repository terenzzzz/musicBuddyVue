<template>
  <div id="app">
    <TopHeader></TopHeader>
    <!-- <div id="particles"></div> -->
    <router-view></router-view>
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader';
import BottomFooter from '@/components/BottomFooter';
import particlesJson from '../particles.json'

export default {
  name: 'App',
  components: {
    TopHeader,
    BottomFooter,
  },
  mounted() {
    require('particles.js')
    // eslint-disable-next-line no-undef
    particlesJS('particles', particlesJson)
  }

}


</script>

<style>
#app{
  box-sizing: border-box;
}

#app a{
  text-decoration: none;
  color: inherit;
}

#particles{
  position: absolute;
  width: 100%;
  height: 100%;

  /* z-index: -1; */
}



</style>
