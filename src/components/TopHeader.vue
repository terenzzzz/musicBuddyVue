<template>
  <div>
	<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="row w-50">
      <div class="col-6 col-sm-5 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
        <a href="/" class="navbar-brand"><img src="../assets/logo/logo2.png" alt="Terenzzzz" class="img-fluid" ></a>
      </div>

    </div>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse flex-row-reverse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item ">
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
    mounted() {
        // 获取所有的 nav-item 元素
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => item.classList.remove('selected'));

      const routes = ["/", "/works", "/blog", "/contact"];
      const currentRouteIndex = routes.indexOf(this.$route.path);

      if (currentRouteIndex >= 0) {
        navItems[currentRouteIndex].classList.add('selected');
      }

      // 为每个 nav-item 添加点击事件监听器
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          // 先移除所有 nav-item 的 selected 类
          navItems.forEach(item => item.classList.remove('selected'));
          
          // 为当前点击的 nav-item 添加 selected 类
          this.classList.add('selected');
        });
      });
    }
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

.selected{
  border-bottom: 3px solid #FF6666;
}

</style>