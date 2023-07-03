<template>
    <div>
        <TopHeader></TopHeader>
        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <SingleBlog></SingleBlog>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <SingleBlog></SingleBlog>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <SingleBlog></SingleBlog>
            </div>
        </div>

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
    }
}
</script>

<style lang="scss" scoped>

</style>