<template>
    <div id="TourVisitView" class="mt-3">
       <WorkHeader title="TourVisit 安卓应用" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8 d-flex flex-column align-items-center">
                <img src="@/assets/worksDetail/tourVisit/tourVisit.png" class="img-fluid w-100">

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>前端</td>
                        <td>Kotlin</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>数据库</td>
                        <td>SQLite</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>源代码编辑器</td>
                        <td>Android Studio</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>API库</td>
                        <td>Google API、Room</td>
                    </tr>
                </table>

                <p class="mt-3">这个项目的目标是设计，构建和评估一个基于城市的个人照片管理应用程序，该应用程序由城市周围景点或兴趣场所的图像或照片组成。用户必须能够接收和编辑有关移动设备上的这些图像的相关信息，并组织他们沿地理位置的访问。</p>
               
                
                
                <div class="w-100">
                    <li>构建具有灵活复杂布局的应用程序</li>
                    <li>使用关注点分离(使用MVVM)</li>
                    <li>处理多媒体数据</li>
                    <li>用户之间的实时通信(Chat)</li>
                    <li>使用数据库的抽象在本地存储数据(Room)</li>
                    <li>使用手机的传感器(GPS，气压等)</li>
                    <li>使用后台服务</li>
                    <li>互动地图(需要可靠的互联网连接!)</li>
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

#TourVisitView img{
    /* max-height: 300px;
    object-fit: cover; */
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
    list-style-type: circle;
}

</style>