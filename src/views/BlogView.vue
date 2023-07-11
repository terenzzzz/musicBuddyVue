<template>
    <div>
        <div class="row d-flex justify-content-center my-3">
            <div class="col-10 col-lg-8 col-xl-6">
                <form action="/">
                    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" 
                        @search="onSearch"
                    />
                </form>
            </div>
        </div>


        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <a href="">
                    <SingleBlog :tags="tag1">
                        <template v-slot:img>
                            <img src="../assets/openwrt.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 3: Openwrt路由</template>
                        <template v-slot:content>All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，
                        使一台主机可以扮演不同的角色来到达用户不同的需求。这篇博客记录了使用零刻 EQ12 Pro小主机，选择PVE虚拟机做底层系统，部署软路由
                        /黑群晖/Windows/ubuntuServer多合一系统.</template>
                    </SingleBlog>
                </a>

                <a href="">
                    <SingleBlog :tags="tag1">
                        <template v-slot:img>
                            <img src="../assets/pveBlog/pve.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 2: PVE</template>
                        <template v-slot:content>All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，
                        使一台主机可以扮演不同的角色来到达用户不同的需求。这篇博客记录了使用零刻 EQ12 Pro小主机，选择PVE虚拟机做底层系统，部署软路由
                        /黑群晖/Windows/ubuntuServer多合一系统.</template>
                    </SingleBlog>
                </a>
                <a href="">
                    <SingleBlog :tags="tag1">
                        <template v-slot:img>
                            <img src="../assets/pveBlog/device.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 1: 简介</template>
                        <template v-slot:content>All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，
                        使一台主机可以扮演不同的角色来到达用户不同的需求。这篇博客记录了使用零刻 EQ12 Pro小主机，选择PVE虚拟机做底层系统，部署软路由
                        /黑群晖/Windows/ubuntuServer多合一系统.</template>
                    </SingleBlog>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import SingleBlog from '@/components/SingleBlog';

export default {
    components: {
        SingleBlog
    },
    data() {
        return {
            tag1: [
                { id: 1, text: 'PVE' },
                { id: 2, text: 'Linux' },
            ]
        };
    },
    methods: {
        onSearch(){

        }
    },
}
</script>

<style lang="scss" scoped>

</style>

