<template>
    <div>
        <!-- <div id="swipe-container" class="row d-flex justify-content-center">
            <div class="col-10" style="width: 300px;" >
                    <van-swipe :autoplay="1500" indicator-color="#FF6666">
                        <van-swipe-item class="img-container"><img src="../assets/works/healthyExpertPromo.png" class="img-fluid"></van-swipe-item>
                        <van-swipe-item class="img-container"><img src="../assets/birdwatching.png" class="img-fluid"></van-swipe-item>
                        <van-swipe-item class="img-container"><img src="../assets/android.png" class="img-fluid"></van-swipe-item>
                    </van-swipe>
            </div>
           
        </div> -->
        <router-view></router-view>

        <div class="title mt-3">
            <h1 class="px-5 my-3">项目列表</h1>
        </div>
        
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/HealthyExpert'>
                    <template v-slot:img>
                            <img src="../assets/works/healthyExpertPromo.png"/>
                    </template>
                    <template v-slot:title>
                        健康监测安卓APP
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/BirdWatching'>
                    <template v-slot:img>
                        <img src="../assets/works/birdWatching.png"/>
                    </template>
                    <template v-slot:title>
                        观鸟论坛PWA
                    </template>
                    <template v-slot:text>
                        一个“观鸟”渐进式web应用程序，为用户记录和观察鸟类，并帮助辨认。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/TourVisitView'>
                    <template v-slot:img>
                        <img src="../assets/works/tourVisit.png"/>
                    </template>
                    <template v-slot:title>
                        TourVisit System
                    </template>
                    <template v-slot:text>
                        设计、构建和评估一个基于城市的个人照片管理应用程序，使用户能够接收，访问和编辑相关信息。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/Robotic'>
                    <template v-slot:img>
                        <img src="../assets/works/robotic.png"/>
                    </template>
                    <template v-slot:title>
                        ROS机器人
                    </template>
                    <template v-slot:text>
                        使用ROS在TurtleBot3华夫饼上开发一系列机器人行为，以满足多项任务如自主避障，迷宫导航，自主检测搜索等。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/TheBigWalk'>
                    <template v-slot:img>
                        <img src="../assets/works/theBigWalk.png"/>
                    </template>
                    <template v-slot:title>
                        马拉松管理系统
                    </template>
                    <template v-slot:text>
                        为马拉松活动设计一个系统，从而有效的跟踪参与者提高参与者的安全和福祉，确保活动顺利进行。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/TextProcessing'>
                    <template v-slot:img>
                        <img src="../assets/works/textProcessing.png"/>
                    </template>
                    <template v-slot:title>
                        文本分析
                    </template>
                    <template v-slot:text>
                        利用机器学习构建一个文本分析系统，对文本进行信息提取，信息检索以及文本情感语义分析
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/DataDriven'>
                    <template v-slot:img>
                        <img src="../assets/works/dataDriven.png"/>
                    </template>
                    <template v-slot:title>
                        棋盘图分类器
                    </template>
                    <template v-slot:text>
                        构建并评估一个系统，通过数据驱动等方法分析具有噪音的的棋盘图并报告每个方格上的棋子。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/RentSystem'>
                    <template v-slot:img>
                        <img src="../assets/works/java.png"/>
                    </template>
                    <template v-slot:title>
                        基于Swing的租房系统
                    </template>
                    <template v-slot:text>
                        该系统管理一系列短期小物业，不同角色可访问不同的资料并将管理酒店的预订和评论。
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/EightOff'>
                    <template v-slot:img>
                        <img src="../assets/works/haskell.png"/>
                    </template>
                    <template v-slot:title>
                        基于Haskell编写的纸牌游戏
                    </template>
                    <template v-slot:text>
                        使用Haskell语言编写8-off纸牌游戏和蜘蛛纸牌游戏的代码，并分析其性能
                    </template>
                </SingleWork>
            </div>

            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/NeteaseMusic'>
                    <template v-slot:img>
                        <img src="../assets/works/wyy.png"/>
                    </template>
                    <template v-slot:title>
                        仿网易云音乐
                    </template>
                    <template v-slot:text>
                        利用网易云音乐官方API搭建的一个仿网易云音乐网页端应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork toURL='/works/Eleme'>
                    <template v-slot:img>
                        <img src="../assets/works/eleme.png"/>
                    </template>
                    <template v-slot:title>
                        仿饿了么
                    </template>
                    <template v-slot:text>
                        仿饿了么外卖APP网页端应用
                    </template>
                </SingleWork>
            </div>
        </div>
    </div>
</template>

<script>
import SingleWork from '@/components/SingleWork';

export default {
    components: {
        SingleWork
    },
}
</script>

<style lang="css" scoped>
/* #swipe-container{
    display: flex;
    justify-content: center;
    margin-block: 50px;
} */


/* #swipe-container .img-container{
    display: flex;
    justify-content: center;
} */

/* .img-container{
    width: 100%;
} */

.title{
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title h1{
    border-bottom: 3px solid #FF6666;
}

</style>