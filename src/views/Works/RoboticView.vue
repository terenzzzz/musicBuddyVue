<template>
    <div class="mt-3">
       <WorkHeader title="Robotic ROS机器人项目" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8 d-flex flex-column align-items-center">
                <img src="@/assets/worksDetail/robotic/turtlebot3.png" class="img-fluid w-100">

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程语言</td>
                        <td>Python</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>操作系统</td>
                        <td>Robot Operating System（ROS）</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>源代码编辑器</td>
                        <td>VScode</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <h1 class="mt-3">本项目使用ROS在TurtleBot3华夫饼上开发一系列机器人行为，以满足多项任务。</h1>
               
                <p class="subTitle mt-5">TASK 1：开发一个ROS包并成功部署到TurtleBot3华夫饼机器人上，创建一个ROS节点(或多个节点)，使您的机器人在机器人竞技场地板上遵循8字形模式。同时打印关键信息到终端。</p>
                <img src="@/assets/worksDetail/robotic/task1.png" class="img-fluid w-100">
                
                <p class="subTitle mt-5">TASK 2：开发ROS节点，使TurtleBot3华夫饼机器人能够自主探索包含各种障碍物的模拟环境。机器人必须在90秒内探索尽可能多的环境，不能撞到任何东西! </p>
                <img src="@/assets/worksDetail/robotic/task2.png" class="img-fluid w-100">

                <p class="subTitle mt-5">TASK <i class="fa fa-hourglass-3" aria-hidden="true"></i>：开发ROS节点，使模拟的TurtleBot3华夫饼机器人在150秒或更短的时间内通过迷宫，而不会撞到任何东西。</p>
                <img src="@/assets/worksDetail/robotic/task3.png" class="img-fluid w-100">

                <p class="subTitle mt-5">TASK 4：开发ROS节点，使您的机器人能够搜索环境，检测彩色物体和指向它的信标，在接近时停止而不会撞到它!</p>
                <img src="@/assets/worksDetail/robotic/task4.png" class="img-fluid w-100">

                <p class="subTitle mt-5">TASK 5：开发ROS节点，使真正的TurtleBot3华夫饼能够自主探索场景，尽可能快地导航通过一系列房间，并(可选地)用信标照片和环境地图记录其探索!</p>
                <img src="@/assets/worksDetail/robotic/task5.png" class="img-fluid w-100">
                
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

.subTitle{
    font-weight: bold;
}
</style>