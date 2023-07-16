<template>
    <div class="mt-3">
       <WorkHeader title="BirdWatching 观鸟论坛渐进式网页应用" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/birdWatching/birdWatching.png" class="img-fluid w-100">
                </div>
                
                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>前端</td>
                        <td>HTML、CSS、JavaScript、EJS、Bootstrap、ServiceWorker</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>后端</td>
                        <td>Node.js、Express.js、Socket.IO</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>API测试平台</td>
                        <td>Postman</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>数据库</td>
                        <td>MongoDB、IndexedDB</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>源代码编辑器</td>
                        <td>Webstorm</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>API库</td>
                        <td>Google API、Axios</td>
                    </tr>
                </table>

                <p class="mt-3">这个项目的目标是设计和开发一个“观鸟”渐进式web应用程序，为用户记录和观察鸟类，并帮助辨认。使用本网站，用户可以添加新的目击事件，查看目击事件，还可以对识别进行评论并连接知识图谱以提供官方资讯。</p>
               
                <div class="w-100">
                    <li>该系统允许记录观鸟日期和时间、位置(即地理位置)、目击事件的(简短)描述、识别(可能是未知或不确定的)、照片</li>
                    <li>该系统允许用户进行实时聊天并链接到每个目击事件</li>
                    <li>支持在线和离线交互和同步</li>
                    <li>用户之间的实时通信(Chat)</li>
                    <li>链接到DBPedia的知识图</li>
                    <li>创建/视图目击</li>
                    <li>数据持久性</li>
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