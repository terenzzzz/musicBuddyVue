<template>
  <div>
    <div id="header">
      <a href="/"><img src="../assets/name.png" height="100"></a>
      <div id="right">
        <router-link to="/works" class="item">项目</router-link>
        <router-link to="/blog" class="item">博客</router-link>
        <router-link to="/contact" class="item">联系</router-link>
        <a href="/" class="item">语言</a>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    
  }
</script>

<style lang="css" scoped>
#header{
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  line-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.item{
  font-size: 20px;
  margin-inline: 14px;
}
</style>