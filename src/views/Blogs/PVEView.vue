<template>
    <div class="mt-3">
       <WorkHeader title="All In One 搭建记录 2: PVE" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/PVE/pve.png" class="img-fluid w-100">
                </div>

                <p class="mt-3">Proxmox全称Proxmox Virtual Environment简称PVE是基于Debian的Linux系统，虚拟机内核为KVM。硬件兼容性优秀。界面功能不强，很多操作要靠命令行，但扩展能力几乎是无限的。利用它安装任何想要的系统，如：Win系统、linux系统（黑群晖、centos、ubuntu等）、软路由（LEDE、OpenWRT、ROS、高恪、爱快、等），而且是开源永久免费，要求硬件配置低，系统运行稳定等特点。</p>
                
                <p class="fw-bold">准备工作</p>
                <li>U盘 - 制作启动盘用</li>
                <li>rufus写盘工具（官网地址：https://rufus.ie/zh/）</li>
                <li>PVE镜像（官网地址：www.proxmox.com）</li>

                <p class="fw-bold mt-3">PVE安装</p>
                <li>用写盘工具将PVE镜像写入U盘</li>
                <li>通过U盘启动</li>
                <li>根据提示安装PVE</li>
                <li>安装完毕重启后记得拔掉U盘</li>



                <p class="fw-bold mt-3">PVE后台</p>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/PVE/PVEHome.png" class="img-fluid w-100">
                </div>
                <p>通过在路由器输入安装PVE时设置的ip地址进入PVE虚拟系统管理后台，即可创建和管理虚拟机。</p>
             
                
            </div>
        </div>
    </div>
       
</template>

<script>
import WorkHeader from '@/components/WorkHeader';

export default {
    components: {
        WorkHeader,
    },

};
</script>

<style lang="css" scoped>
img{
    max-height: 400px;
    object-fit: cover;
}

table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}
th {
    background-color: #f2f2f2;
}


</style>