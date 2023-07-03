<template>
    <div id="HomeView">
        <TopHeader></TopHeader>

        <div id="intro" class="row d-flex justify-content-center mt-5">
            <div class="col-7 col-sm-5 col-md-4 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center">
                <img src="../assets/avatar.png" class="img-fluid">
            </div>
            <div class="col-10 col-xl-5 d-flex flex-column justify-content-center mt-4">
                <div id="intro-text" class="text-start">
                    <h1>嗨，我是Terenzzzz，一位充满激情的软件工程学生。</h1>
                    <p>本科就读于英国谢菲尔德大学主修软件工程,目前正专注于攻读高级计算机科学硕士学位，以深入研究计算机科学的前沿领域，致力于在软件开发和计算机工程领域不断学习和成长。</p>
                    <van-button color="#FF6464" class="dl-btn float-end">下载简历</van-button>
                </div>
            </div>
            
        </div>

        <div class="title mt-5">
            <h1 class="px-5 mt-5 my-3">专注领域</h1>
        </div>
        
        <div id="works-contents" class="row px-4 mt-5">
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/web.png" class="img-fluid" >
                    </template>
                    <template v-slot:title>网站开发</template>
                    <template v-slot:content>熟悉各种编程语言、前端和后端技术、数据库系统、网络协议和安全措施、以创建高性能、安全可靠的网站</template>
                </WorkContent>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/mobile.png" class="img-fluid">
                    </template>
                    <template v-slot:title>移动应用程序开发</template>
                    <template v-slot:content>安卓和iOS移动软件开发是我的专长领域之一。具备开发跨平台应用和原生应用的能力，能够满足不同平台的需求。</template>
                </WorkContent>  
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/ai.png" class="img-fluid">
                    </template>
                    <template v-slot:title>人工智能与机器学习</template>
                    <template v-slot:content>专注于开发智能系统和算法，使用数据和算法来构建和训练模型，以实现语音识别、图像处理、自然语言处理等应用。</template>
                </WorkContent>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/repair.png" class="img-fluid">
                    </template>
                    <template v-slot:title>软件测试与质量保证</template>
                    <template v-slot:content>便携测试计划和测试用例，执行功能测试、性能测试和安全测试，以验证软件的正确性和性能。</template>
                </WorkContent>
            </div>
        </div>

        <BottomFooter></BottomFooter>
        
    </div>
</template>

<script>
    import TopHeader from '@/components/TopHeader';
    import WorkContent from '@/components/WorkContent';
    import BottomFooter from '@/components/BottomFooter';

    export default {
        components: {
            TopHeader,
            WorkContent,
            BottomFooter
        },
        data() {
            return {
                tag1: [
                    { id: 1, text: 'PVE' },
                    { id: 2, text: 'Linux' },
                ]
            };
        }
    }
</script>

<style lang="css" scoped>

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
/* 

#intro-text h1{
    font-size: 38px;
}

#intro-text p{
    font-size: 16px;
    color: #6e6d7a;
}

#works-contents{
    margin-block: 40px;
    display: flex;
    flex-direction: row;
} */


</style>