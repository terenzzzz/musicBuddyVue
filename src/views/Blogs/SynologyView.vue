<template>
    <div class="mt-3">
       <WorkHeader title="All In One 搭建记录 5: 黑群晖" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/Synology/nas.png" class="img-fluid w-100">
                </div>

                <p class="mt-3">NAS（Network Attached Storage：网络附属存储）按字面简单说就是连接在网络上，具备资料存储功能的装置，因此也称为“网络存储器”。它是一种专用数据存储服务器。纵观NAS市场，系统层面几乎是被群晖和威联通所垄断，所以只要能够玩转这两个系统就基本上通吃市面所有的NAS了。由于群晖官方对破解系统的态度，使群晖系统大量应用在DIY NAS领域，所以这里就选择以群晖系统为例进行部署。</p>
                <p>而群晖系统也被分为黑群晖NAS和白群晖NAS：</p>
                <li>白群晖 Nas：官方授权的硬件与群晖Nas软件 （白群 或 白裙 ）</li>
                <li>黑群晖 Nas：非官方的硬件与非官方的群晖Nas软件，使用自己的PC电脑或一些矿渣 或自己搭配的电脑零件组装的Nas硬件。使用的群晖Nas软件 是经第三方人员修改后用非官方的方式安装，并未经群晖官方支持（黑群 或 黑裙 ）</li>
                
                <p class="mt-3">简单来说就是官方和非官方的区别，白群晖是官方的产品，相对安全可靠和稳定，一键安装傻瓜式操作。</p>
                <p>黑群晖是非官方的产品，所搭载的操作系统是经第三方人员修改后用非官方的方式安装，并未经群晖官方支持。黑群晖虽然在形式上实现了和群晖类似的功能，但是由于硬件是自己搭建，系统由未知来源的第三方提供，隐藏着较大隐患。有些存在木马或缺陷。</p>
                <p>但是黑群晖也有优点，由于自己组装硬件或使用淘汰的矿渣作为Nas主机，价格优惠很多，可以使用第三方改装的固件及插件，可以在不断折腾的过程中，研究更多的Synology群晖系统以及Linux系统的技术，提高学习与动手能力，并且有很大的成就感。可以充分利用废旧或闲置的硬件。物尽所用。</p>
                
                <p class="fw-bold mt-3">黑群晖安装准备</p>
                <li>下载黑群晖系统镜像</li>
                <li>将镜像上传到PVE上</li>

                <p class="fw-bold mt-3">虚拟机创建</p>
                <li>点击创建虚拟机，填写虚拟机名称</li>
                <li>操作系统选择不使用任何介质</li>
                <li>硬盘随便选，待会要删除</li>
                <li>CPU内存按需分配</li>
                <li>完成创建</li>
                <li>删除默认磁盘</li>
                <li>选中机器，选择q35</li>
                <li>添加镜像引导盘（qm importdisk 100 DS918_7.0.1.img local-lvm）</li>
                <li>编辑引导顺序</li>
                <li>启动虚拟机进行安装</li>

                <p class="fw-bold mt-3">访问群晖后台</p>
                <li>浏览器打开（http://find.synology.com/）开始搜索局域网内的群晖设备</li>
                <li>连接并开始安装</li>






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