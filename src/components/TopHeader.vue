<template>
  <div>
    <div id="header">
      <a href="/"><img src="../assets/name.png" alt=""></a>
      <div id="right">
        <a href="/" class="item">项目</a>
        <a href="/" class="item">博客</a>
        <a href="/" class="item">联系</a>
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
  padding: 20px;
  height: 43px;
  line-height: 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.item{
  font-size: 20px;
  margin-inline: 14px;
}
</style>