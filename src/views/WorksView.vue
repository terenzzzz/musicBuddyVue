<template>
    <div>
        <TopHeader></TopHeader>
        
        <div id="swipe-container">
            <van-swipe :autoplay="1500" indicator-color="#FF6666" >
                <van-swipe-item class="img-container"><img src="../assets/dissertation.png" alt=""></van-swipe-item>
                <van-swipe-item class="img-container"><img src="../assets/birdwatching.png" alt=""></van-swipe-item>
                <van-swipe-item class="img-container"><img src="../assets/android.png" alt=""></van-swipe-item>
            </van-swipe>
        </div>

        <h1>项目列表</h1>
        
        <div class="row">
            <div class="col-4">
                <SingleWork></SingleWork>
            </div>
            <div class="col-4">
                <SingleWork></SingleWork>
            </div>
            <div class="col-4">
                <SingleWork></SingleWork>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <SingleWork></SingleWork>
            </div>
            <div class="col-4">
                <SingleWork></SingleWork>
            </div>
            <div class="col-4">
                <SingleWork></SingleWork>
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
#swipe-container{
    height: 400px;
    display: flex;
    justify-content: center;
    margin-block: 50px;
}


#swipe-container .img-container{
    display: flex;
    justify-content: center;
}

</style>