<template>
    <div id="SingleBlog" class="my-3">
        <div id="container" class="row">
            <div class="col-12 col-lg-4 col-xl-3">
                <img src="../assets/PVE.png" class="img-fluid">
            </div>
            <div id="right" class="col-12 col-lg-8 col-xl-9" >
                <h1>All in One搭建记录</h1>
                <div id="tags">
                    <van-tag round color="#ff6666" size="large" class="tag"><span class="tag-text">Kotlin</span></van-tag>
                    <van-tag round color="#ff6666" size="large" class="tag"><span class="tag-text">Android</span></van-tag>
                    <van-tag round color="#ff6666" size="large" class="tag"><span class="tag-text">MySql</span></van-tag>
                </div>
                <!-- <p class="date">2023/06/30</p> -->
                <p>All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，
                    使一台主机可以扮演不同的角色来到达用户不同的需求。这篇博客记录了使用零刻 EQ12 Pro小主机，选择PVE虚拟机做底层系统，部署软路由
                    /黑群晖/Windows/ubuntuServer多合一系统.</p>
            </div>
        </div>
        <div class="line_container">
            <div class="line"></div>
        </div>
    </div>
    
</template>

<script>
export default {

};
</script>

<style lang="css" scoped>

#right{
    display: flex;
    flex-direction: column;
    padding-block: 10px;
}

#right #tags{
    margin-block: 10px;
}

#right .tag{
    margin-inline: 5px;
}

#right .tag-text{
    padding: 3px;
    font-size: 15px;
}

#SingleBlog .line_container{
    width: 100%;
    display: flex;
    justify-content: center;
}

#SingleBlog .line_container .line{
    width: 90%;
    height: 1px;
    background-color: #e0e0e0;
}
</style>