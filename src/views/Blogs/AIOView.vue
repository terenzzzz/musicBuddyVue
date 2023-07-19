<template>
    <div class="mt-3">
       <WorkHeader title="All In One 搭建记录 1: 简介" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/blog/AIOIntro/device.png" class="img-fluid w-100">
                </div>

                <p class="mt-3">All in one系统从字面上理解就是“多合一”系统。All In One 主机是指在底层虚拟机平台上创建软路由、NAS主机、Windows主机等虚拟主机，使一台主机可以扮演不同的角色来到达用户不同的需求。这个系列的博客将记录使用零刻 EQ12 Pro迷你主机，选择PVE虚拟机做底层系统，部署OpenWrt软路由/黑群晖/Window10/ubuntuServer等系统.</p>
                
                <p class="fw-bold">硬件参数</p>
                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>型号</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>品牌</td>
                        <td>零刻Eq12 pro</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>CPU</td>
                        <td>i3-N305</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>显卡</td>
                        <td>英特尔UHD显卡</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>内存</td>
                        <td>SO-DIMM DDR5 4800Hz 16G*1</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>硬盘</td>
                        <td>M.2 2280 PCIe 3.0 500g*1, 
                            SATA 2T (2.5英寸 7mm)*1
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>网络</td>
                        <td>WiFi6 (802.11ax) 蓝牙5.2(AX101)</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>电源</td>
                        <td>输入200-240V AC, 50/60Hz, 输出 12V 3A</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>接口</td>
                        <td>电源插孔*1
                            USB3.2 Gen2(10Gbps)*3
                            英特尔i225-V 2.5Gbps*2
                            3.5mm音频插孔*1
                            4k 60Hz HDMI 2.0*2
                            Type-C(10Gbps,4k 60Hz*1)
                        </td>
                    </tr>
                </table>

                <p></p>

                
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