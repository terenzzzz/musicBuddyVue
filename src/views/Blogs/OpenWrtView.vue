<template>
    <div class="mt-3">
       <WorkHeader title="All In One 搭建记录 3: OpenWrt软路由" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/OpenWrt/openwrt.png" class="img-fluid w-100">
                </div>

                <p class="mt-3">OpenWrt项目是一个针对嵌入式设备的Linux操作系统。OpenWrt不是一个单一且不可更改的固件，而是提供了具有软件包管理功能的完全可写的文件系统。这使您可以从供应商提供的应用范围和配置中解脱出来，并且让您通过使用适配任何应用的软件包来定制设备。对于开发人员来说，OpenWrt是一个无需围绕它构建完整固件就能开发应用程序的框架; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。</p>
                
                <p class="fw-bold">Overlay扩容</p>
                <p>由于OpenWrt默认储存空间比较小，安装几个插件就满了，因此需要对系统的硬盘进行扩容，建议直接扩容镜像相对简单，详细参考: https://www.youtube.com/watch?v=Kap02m83W40</p>

                <p class="fw-bold mt-3">OpenWrt安装准备</p>
                <li>下载Openwrt/LEDE镜像（https://downloads.openwrt.org/releases/）</li>

                <p class="fw-bold mt-3">创建虚拟机</p>
                <li>登录PVE管理界面，创建虚拟机</li>
                <li>点击“创建虚拟机”，虚拟机名称（例如Openwrt）</li>
                <li>勾选“高级”，勾选“开机自启动</li>
                <li>CD/DVD选择“不适用任何介质”，操作系统和版本默认即可，点击“下一步”。</li>
                <li>系统选项卡全部默认，点击“下一步”。</li>
                <li>硬盘不用改，之后会删除，然后用刚刚下载的img镜像创建虚拟磁盘。</li>
                <li>CPU核心数量按需添加，一般双核足够了</li>
                <li>内存256MB以上都是够的，系统有富余就多加一点，一般不用超高2GB，点击“下一步”</li>
                <li>PVE虚拟机可选网卡模型，建议选用默认的VirtIO（半虚拟化），其性能和效率最高。</li>
                <li>最后确认下所有设置和参数，点击完成。</li>
                <li>分离不用的硬盘：选择刚刚创建的“Openwrt”虚拟机 >  硬件 > 硬盘(scsi0) > 点击“分离”。</li>
                <li>删除不用的硬盘和光驱：选中“未使用的磁盘0”，点击“删除”；再用同样的方法删除不用的光驱。</li>
                
                <p class="fw-bold mt-3">添加启动盘</p>
                <li>上传Openwrt镜像：选择“pve”节点 > local存储空间 > 内容 > 点击上传 > 选择“openwrt.img”镜像 > 点击“上传”</li>
                <li>复制镜像文件完整路径（target file: /var/lib/vz/template/iso/openwrt.img）</li>
                <li>把镜像转成虚拟磁盘并导入到虚拟机：选择“pve”节点 > shell > 输入以下命令（qm importdisk 101 /var/lib/vz/template/iso/openwrt.img local-lvm）并回车：</li>
                <li>导入成功后在‘Openwrt’虚拟机的“硬件”选项卡就能看到一个“未使用的磁盘0”，选中点击添加。</li>
                <li>切换到虚拟机的“选项”选项卡，双击“引导顺序”，勾选硬盘并拖动到第一顺序。</li>

                <p class="fw-bold mt-3">启动openwrt软路由虚拟机</p>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/OpenWrt/openwrtSetting.png" class="img-fluid w-100">
                </div>
                <li>确保配置正确</li>
                <li>正确配置网口并启动虚拟机</li>
                <li>根据分配的ip地址进入openwrt管理后台</li>
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/OpenWrt/openwrtHome.png" class="img-fluid w-100">
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