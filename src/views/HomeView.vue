<template>
    <div id="HomeView">
        <TopHeader></TopHeader>
        <div id="intro">
            <div id="intro-text">
                <h1>嗨，我是Terenzzzz，一位充满激情的软件工程学生</h1>
                <p>本科就读于英国谢菲尔德大学主修软件工程,目前正专注于攻读高级计算机科学硕士学位，以深入研究计算机科学的前沿领域，致力于在软件开发和计算机工程领域不断学习和成长。</p>
                <van-button color="#FF6464">下载简历</van-button>
            </div>
            <img src="../assets/avatar.png" width="250" height="250">
        </div>


        <h1>专注领域</h1>
        <div id="works-contents">
            <WorkContent>
                <template v-slot:img>
                    <img src="../assets/web.png" width="55" height="55">
                </template>
                <template v-slot:title>
                    <h3>网站开发</h3>
                </template>
                <template v-slot:content>
                    <p>熟悉各种编程语言、前端和后端技术、数据库系统、网络协议和安全措施、以创建高性能、安全可靠的网站</p>
                </template>
            </WorkContent>
            <WorkContent>
                <template v-slot:img>
                    <img src="../assets/mobile.png" width="55" height="55">
                </template>
                <template v-slot:title>
                    <h3>移动应用程序开发</h3>
                </template>
                <template v-slot:content>
                    <p>安卓和iOS移动软件开发是我的专长领域之一。具备开发跨平台应用和原生应用的能力，能够满足不同平台的需求。</p>
                </template>
            </WorkContent>
            <WorkContent>
                <template v-slot:img>
                    <img src="../assets/ai.png" width="55" height="55">
                </template>
                <template v-slot:title>
                    <h3>人工智能与机器学习</h3>
                </template>
                <template v-slot:content>
                    <p>专注于开发智能系统和算法，使用数据和算法来构建和训练模型，以实现语音识别、图像处理、自然语言处理等应用。</p>
                </template>
            </WorkContent>
            <WorkContent>
                <template v-slot:img>
                    <img src="../assets/mobile.png" width="55" height="55">
                </template>
                <template v-slot:title>
                    <h3>软件测试与质量保证</h3>
                </template>
                <template v-slot:content>
                    <p>便携测试计划和测试用例，执行功能测试、性能测试和安全测试，以验证软件的正确性和性能。</p>
                </template>
            </WorkContent>
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
        }
    }
</script>

<style lang="css" scoped>
.HomeView{
    margin-inline: 20;
}

#intro{
    width: 100%;
    margin-top: 158px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
}

#intro-text{
    width: 40%;
    margin-right: 150px;
}

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
}


</style>