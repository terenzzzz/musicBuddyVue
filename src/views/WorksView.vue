<template>
    <div>
        <TopHeader></TopHeader>
        
        <div id="swipe-container">
            <van-swipe :autoplay="3000" indicator-color="#FF6666">
                <van-swipe-item class="img-container"><img src="../assets/birdwatching.png" alt=""></van-swipe-item>
                <van-swipe-item class="img-container"><img src="../assets/avatar.png" alt=""></van-swipe-item>
                <van-swipe-item class="img-container"><img src="../assets/PVE.png" alt=""></van-swipe-item>
                <van-swipe-item class="img-container"><img src="../assets/PVE.png" alt=""></van-swipe-item>
            </van-swipe>
        </div>
        
        
        <SingleBlog></SingleBlog>
        <SingleBlog></SingleBlog>
        <SingleBlog></SingleBlog>
        <BottomFooter></BottomFooter>
    </div>
</template>

<script>
import TopHeader from '@/components/TopHeader';
import BottomFooter from '@/components/BottomFooter';
import SingleBlog from '@/components/SingleBlog';

export default {
    components: {
        TopHeader,
        BottomFooter,
        SingleBlog
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