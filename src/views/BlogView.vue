<template>
    <div>
        <TopHeader></TopHeader>
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
    }
}
</script>

<style lang="scss" scoped>

</style>