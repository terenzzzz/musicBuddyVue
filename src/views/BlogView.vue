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

                    <SingleBlog :tags="tag1" toURL='/blogs/AIO'>
                        <template v-slot:img>
                            <img src="../assets/blog/nas.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 5: 黑群晖</template>
                        <template v-slot:content>NAS（Network Attached Storage：网络附属存储）按字面简单说就是连接在网络上，具备资料存储功能的装置，因此也称为“网络存储器”。它是一种专用数据存储服务器。</template>
                    </SingleBlog>

                    <SingleBlog :tags="tag1" toURL='/blogs/AIO'>
                        <template v-slot:img>
                            <img src="../assets/blog/linux.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 4: Linux服务器</template>
                        <template v-slot:content>本文准备从0开始，一步步搭建一套属于自己的Linux系统环境，这将是后续学Linux、用Linux、Linux环境编程、应用和项目部署、工具实验等一系列学习和实践的基石.</template>
                    </SingleBlog>

                    <SingleBlog :tags="tag1" toURL='/blogs/AIO'>
                        <template v-slot:img>
                            <img src="../assets/blog/openwrt.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 3: Openwrt路由</template>
                        <template v-slot:content>OpenWrt 是一个基于 Linux 的、针对嵌入式网络设备的开源操作系统。它主要用于替代各种家用路由器上的原始固件。
                            OpenWrt 具备一个好的路由器应该具备的所有有用功能。</template>
                    </SingleBlog>

                    <SingleBlog :tags="tag1" toURL='/blogs/PVE'>
                        <template v-slot:img>
                            <img src="@/assets/blog/PVE/pve.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 2: PVE</template>
                        <template v-slot:content>Proxmox全称Proxmox Virtual Environment简称PVE是基于Debian的虚拟机平台。利用它安装任何
                            想要的系统，如：Win系统、linux系统（黑群晖、centos、ubuntu等）、软路由（LEDE、OpenWRT、ROS、高恪、爱快、等），
                            而且是开源永久免费，要求硬件配置低，系统运行稳定等特点。
                        </template>
                    </SingleBlog>

                    <SingleBlog :tags="tag1" toURL='/blogs/AIO'>
                        <template v-slot:img>
                            <img src="@/assets/blog/AIOIntro/device.png" class="img-fluid">
                        </template>
                        <template v-slot:title>All in One搭建记录 1: 简介</template>
                        <template v-slot:content>All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，
                        使一台主机可以扮演不同的角色来到达用户不同的需求。这篇博客记录了使用零刻 EQ12 Pro小主机，选择PVE虚拟机做底层系统，部署软路由
                        /黑群晖/Windows/ubuntuServer多合一系统.</template>
                    </SingleBlog>
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

