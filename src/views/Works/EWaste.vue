<template>
    <div id="HealthyExpertView" class="mt-3">
       <WorkHeader title="E-Waste 设备回收系统" date="2024/05/27"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                
                <div class="d-flex justify-content-center">
                    <img src="@/assets/works/ewaste.png" class="img-fluid w-100">
                </div>
                

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>图形界面</td>
                        <td>ejs; bootstrap</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>后端</td>
                        <td>node.js; express.js</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>源代码编辑器</td>
                        <td>WebStorm</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>版本控制</td>
                        <td>GitLab</td>
                    </tr>
                </table>
                
                

                <p class="mt-5">该项目旨在提供一个中心，可以根据设备的年限和需求识别设备，并为所有者提供支付数据检索费用的选项。如果设备可能被转售，例如新的智能手机等，那么中心应该确定所有者可能出售其设备的第三方，第三方为成功转售支付推荐费。卖家仍然可以选择取回数据并清除他们的设备(需要付费)。</p>
                

                <div class="d-flex justify-content-center my-2">
                    <img src="@/assets/worksDetail/ewaste/ewasteMoSCow.png" class="img-fluid">
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

#HealthyExpertView img{
    max-height: 500px;
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

li{
    margin-bottom: 30px;
}
</style>