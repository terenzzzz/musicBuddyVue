<template>
    <div class="mt-3">
       <WorkHeader title="All In One 搭建记录 4: Linux服务器" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/Linux/linux.png" class="img-fluid w-100">
                </div>

                <p class="mt-3">Linux 服务器是运行 Linux 开源操作系统某种衍生版本的服务器，专门用于能够处理需求最苛刻的业务应用，例如 Web 服务和数据库。IT 人员不必严重依赖于手动管理，并且能够控制和优化权限，从而提升安全性。Linux 服务器主要在命令行层面运行，因此更加轻巧，而且能够在物理服务器和云服务器上运行。此外，Linux 服务器还有助于充分提升总体系统性能，并简化存储库（如 Docker 和 MySQL 等）、存储和容器等方面的管理。</p>
                <p>Ubuntu是基于Debian，以桌面应用为主的Linux发行版。Ubuntu有三个正式版本，包括桌面版、服务器版及用于物联网设备和机器人的Core版。桌面版面向个人电脑使用者，可以进行文字处理、网页浏览、多媒体播放和玩游戏。本质上说，这是一个为普通用户所定制的多用途操作系统。另一方面，服务器版旨在充当web服务器，可用来托管文件、网页及相似内容。由于本次搭建的主要目的是充当Web服务器以部署项目，因此选择安装Ubuntu服务器版。</p>


                <p class="fw-bold">Ubuntu服务器版安装准备</p>
                <li>下载ubuntu服务器版镜像（官网地址: https://ubuntu.com/download/server）</li>
                <li>将下载好的镜像上传到pve</li>

                <p class="fw-bold mt-3">创建虚拟机</p>
                <li>pve首页点击创建虚拟机，填写虚拟机名字</li>
                <li>操作系统这里选择刚刚下载并上传到pve的ubuntu server22.04</li>
                <li>系统选择默认</li>
                <li>磁盘这里分配了200G，可根据自己需要做相应调整</li>
                <li>磁盘这里分配了8G，可根据自己需要做相应调整</li>
                <li>网络选择默认</li>
                <li>确定并完成</li>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/Linux/ubuntuSetting.png" class="img-fluid w-100">
                </div>

                <p class="fw-bold mt-3">安装Ubuntu Server</p>
                <li>选中我们创建好的这台虚拟机，然后点击启动，并打开控制台。</li>
                <li>选择第一个Try or Install Ubuntu Server然后回车</li>
                <li>语言这里选择英文，然后回车。</li>
                <li>然后根据提示进行下一步安装。</li>
                <li>选中安装ssh，也就是 install OpenSSH Server。</li>
                <li>最后通过回车键选中重启，也就是Reboot Now。</li>
                <li>输入命令sudo apt install net-tools，然后输入命令ifconfig 查看本机ip地址。</li>
                <li>通过获取的ip地址 ssh远程22端口连接登录后台。</li>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/Linux/ubuntuHome.png" class="img-fluid w-100">
                </div>






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