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
                <SingleWork></SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork></SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <SingleWork></SingleWork>
            </div>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
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
    display: flex;
    justify-content: center;
    margin-block: 50px;
}


#swipe-container .img-container{
    display: flex;
    justify-content: center;
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