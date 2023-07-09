<template>
    <div>
        <TopHeader></TopHeader>
        
        <!-- <div id="swipe-container" class="row d-flex justify-content-center">
            <div class="col-10 col-md-6 col-lg-5">
                    <van-swipe :autoplay="1500" indicator-color="#FF6666">
                        <van-swipe-item class="img-container"><img src="../assets/dissertation.png" class="img-fluid"></van-swipe-item>
                        <van-swipe-item class="img-container"><img src="../assets/birdwatching.png" class="img-fluid"></van-swipe-item>
                        <van-swipe-item class="img-container"><img src="../assets/android.png" class="img-fluid"></van-swipe-item>
                    </van-swipe>
            </div>
           
        </div> -->

        <div class="title mt-3">
            <h1 class="px-5 mt-5 my-3">项目列表</h1>
        </div>
        
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                            <img src="../assets/works/background1.png"/>
                    </template>
                    <template v-slot:title>
                        HealthyExpert
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/birdWatching.png"/>
                    </template>
                    <template v-slot:title>
                        BirdWatching System
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/tourVisit.png"/>
                    </template>
                    <template v-slot:title>
                        TourVisit System
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/robotic.png"/>
                    </template>
                    <template v-slot:title>
                        Robotic
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/theBigWalk.png"/>
                    </template>
                    <template v-slot:title>
                        The Big Walk
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/textProcessing.png"/>
                    </template>
                    <template v-slot:title>
                        Text Processing
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <!-- <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/background1.png"/>
                    </template>
                    <template v-slot:title>
                        OscarBar Order System
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div> -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/wyy.jpg"/>
                    </template>
                    <template v-slot:title>
                        仿网易云音乐
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork>
                    <template v-slot:img>
                        <img src="../assets/works/eleme.png"/>
                    </template>
                    <template v-slot:title>
                        仿饿了么
                    </template>
                    <template v-slot:text>
                        设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用
                    </template>
                </SingleWork>
            </div>
        </div>


        
        <BottomFooter></BottomFooter>
    </div>
</template>

<script>
import TopHeader from '@/components/TopHeader';
import BottomFooter from '@/components/BottomFooter';
import SingleWork from '@/components/SingleWork';

export default {
    components: {
        TopHeader,
        BottomFooter,
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

.img-container{
    width: 100%;
}

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