<template>
  <div>
	<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="row w-50">
      <div class="col-6 col-sm-5 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
        <a href="/" class="navbar-brand"><img src="../assets/logo2.png" alt="Terenzzzz" class="img-fluid" ></a>
      </div>

    </div>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse flex-row-reverse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="item">主页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/works" class="item">项目</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/blog" class="item">博客</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="item">联系</router-link>
        </li>
        <li class="nav-item">
          <a href="/" class="item"><img src="../assets/counrty/cn.png"></a>
        </li>
      </ul>
    </div>
  </div>
</nav>


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

.navbar-nav .nav-item{
	padding: 10px;
}

</style>