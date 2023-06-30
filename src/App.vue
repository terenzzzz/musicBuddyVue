<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app{
  padding-block: 50px;
  padding-inline: 100px;
  box-sizing: border-box;
}

#app a{
  text-decoration: none;
  color: inherit;
}
</style>
