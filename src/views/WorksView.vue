<template>
    <div>
        <TopHeader></TopHeader>
        
        <div id="swipe-container">
            <van-swipe :autoplay="3000" indicator-color="skyblue">
                <van-swipe-item><img src="../assets/birdwatching.png" alt=""></van-swipe-item>
                <van-swipe-item><img src="../assets/avatar.png" alt=""></van-swipe-item>
                <van-swipe-item><img src="../assets/PVE.png" alt=""></van-swipe-item>
                <van-swipe-item><img src="../assets/PVE.png" alt=""></van-swipe-item>
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
    height: 500px;
    display: flex;
    justify-content: center;
}

#swipe-container img{
    width: 100%;
    height: auto;

}
</style>