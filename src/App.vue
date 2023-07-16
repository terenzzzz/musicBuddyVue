<template>
  <div id="app">
    <TopHeader></TopHeader>
    <router-view></router-view>
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader';
import BottomFooter from '@/components/BottomFooter';

export default {
  name: 'App',
  components: {
    TopHeader,
    BottomFooter,
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
</style>
