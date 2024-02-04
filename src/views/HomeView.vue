<template>
    
    <div id="HomeView">
        <div id="intro" class="row d-flex justify-content-center mt-5">
            <div class="col-7 col-sm-5 col-md-4 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center">
                <img src="../assets/logo/avatar1.png" class="img-fluid">
            </div>
            <div class="col-10 col-xl-5 d-flex flex-column justify-content-center mt-4">
                <div id="intro-text" class="text-start">
                    <h1>嗨，我是Terenzzzz，一位充满激情的软件工程学生。</h1>
                    <p>本科就读于英国谢菲尔德大学主修软件工程,目前正专注于攻读高级计算机科学硕士学位，以深入研究计算机科学的前沿领域，致力于在软件开发和计算机工程领域不断学习和成长。</p>
                    <!-- <van-button color="#FF6464" class="dl-btn float-end" @click="downloadPDF" >下载简历</van-button> -->
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
                        <img src="../assets/logo/web.png" class="img-fluid" >
                    </template>
                    <template v-slot:title>网站开发</template>
                    <template v-slot:content>熟悉各种编程语言、前端和后端技术、数据库系统、网络协议和安全措施、以创建高性能、安全可靠的网站</template>
                </WorkContent>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/logo/mobile.png" class="img-fluid">
                    </template>
                    <template v-slot:title>移动应用程序开发</template>
                    <template v-slot:content>安卓和iOS移动软件开发是我的专长领域之一。具备开发跨平台应用和原生应用的能力，能够满足不同平台的需求。</template>
                </WorkContent>  
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/logo/ai.png" class="img-fluid">
                    </template>
                    <template v-slot:title>人工智能与机器学习</template>
                    <template v-slot:content>专注于开发智能系统和算法，使用数据和算法来构建和训练模型，以实现语音识别、图像处理、自然语言处理等应用。</template>
                </WorkContent>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-xl-3">
                <WorkContent>
                    <template v-slot:img>
                        <img src="../assets/logo/repair.png" class="img-fluid">
                    </template>
                    <template v-slot:title>软件测试与质量保证</template>
                    <template v-slot:content>便携测试计划和测试用例，执行功能测试、性能测试和安全测试，以验证软件的正确性和性能。</template>
                </WorkContent>
            </div>
        </div>

        <div class="title mt-5">
            <h1 class="px-5 mt-5 my-3">技术栈</h1>
        </div>
        <div id="stack-contents" class="row px-4 mt-3 gy-2 gx-3">
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/git.png')" 
                    stackName="Git" bgc="#f05032"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/android.png')" 
                    stackName="ANDROID" bgc="#3ddc84"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/linux.png')" 
                    stackName="LINUX" bgc="#fcc624"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/python.png')" 
                    stackName="PYTHON" bgc="#3776ab"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/html.png')" 
                    stackName="HTML" bgc="#239120"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/css.png')" 
                    stackName="CSS" bgc="#239120"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2 ">
                <SingleStack :imgSrc="require('@/assets/stackLogo/java-script.png')" 
                    stackName="JAVASCRIPT" bgc="#f7df1e"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/node-js.png')" 
                    stackName="NODE.JS" bgc="#43853d"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2 ">
                <SingleStack :imgSrc="require('@/assets/stackLogo/java.png')" 
                    stackName="JAVA" bgc="#ed8b00"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/kotlin.png')" 
                    stackName="KOTLIN" bgc="#0095d5"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/ruby.png')" 
                    stackName="RUBY" bgc="#cc342d"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/vue.png')" 
                    stackName="VUE.JS" bgc="#35495e"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/bootstrap.png')" 
                    stackName="BOOTSTRAP" bgc="#563d7c"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/mysql.png')" 
                    stackName="MYSQL" bgc="#00000f"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/postgresql.png')" 
                    stackName="POSTGRESQL" bgc="#316192"></SingleStack>
            </div>
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/mongoDb.png')" 
                    stackName="MONGODB" bgc="#499D4A"></SingleStack>
            </div>  
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/nginx.png')" 
                    stackName="NGINX" bgc="#009639"></SingleStack>
            </div>  
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/haskell.png')" 
                    stackName="HASKELL" bgc="#8F4E8B"></SingleStack>
            </div>  
            <div class="col-6 col-sm-3 col-md-2">
                <SingleStack :imgSrc="require('@/assets/stackLogo/opengl.png')" 
                    stackName="OpenGL" bgc="#4a7ca9"></SingleStack>
            </div> 
        </div>
    </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJtnXvWVd_aeGOUN3Ei6k1q3_iOv142TE&libraries=geometry,places" async defer></script>
<script>
    import WorkContent from '@/components/WorkContent';
    import SingleStack from '@/components/SingleStack';
    const today = require('../utils/today')
    import { postVisitorAPI,pushVisitorAPI } from '@/api';

    export default {
        components: {
            WorkContent,
            SingleStack
        },
        async mounted() {
            // 等待Google Maps API加载完成
            await this.loadGoogleMapsAPI();
            var latitude = 0
            var longitude = 0
            // 创建一个新的地理编码器实例
            const geocoder = new google.maps.Geocoder();
            // 检查浏览器是否支持Geolocation API
            if ("geolocation" in navigator) {
                // 支持Geolocation
                navigator.geolocation.getCurrentPosition(async function(position) {
                    // 获取经度和纬度
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    // 创建一个 LatLng 对象
                    const latLng = new google.maps.LatLng(latitude, longitude);
                    // 执行逆地理编码
                    geocoder.geocode({ location: latLng }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                        // 获取第一个结果的地理位置信息
                        const locationInfo = results[0].formatted_address;
                        postVisitor(latitude,longitude,locationInfo)
                        console.log("地理位置信息：", locationInfo);
                        } else {
                        console.error("未找到结果");
                        }
                    } else {
                        console.error("逆地理编码失败：" + status);
                        postVisitor(latitude,longitude,"未知地址")
                    }
                    });
                    console.log("纬度：" + latitude);
                    console.log("经度：" + longitude);
                }, function(error) {
                    postVisitor(latitude,longitude)
                    console.log(error)
                });
            } else {
                // 不支持Geolocation
                postVisitor(latitude,longitude,"未知地址")
                console.error("浏览器不支持Geolocation API");
            }

            async function postVisitor(latitude,longitude,location){
                const params = new URLSearchParams();
                params.append('Latitude', latitude);
                params.append('Longitude', longitude);
                params.append('Location', location);
                const res = await postVisitorAPI(params)
            }

            // async function pushVisitor(title,body){
            //     const params = new URLSearchParams();
            //     params.append('title', title);
            //     params.append('body', body);
            //     params.append('icon', "https://static.tvtropes.org/pmwiki/pub/images/beluga.jpg");
            //     params.append('url', "http://terenzzzz.cn");
            //     params.append('sound', "calypso");
            //     const res = await pushVisitorAPI(params)
            //     console.log(res);
            // }

        },
        methods: {
            downloadPDF() {
                const fileUrl = '/Zhicong_CV_zh.pdf'; // 替换为你的静态 PDF 文件路径
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = '蒋志聪_中文简历.pdf'; // 设置下载文件的名称
                link.click();
            },
            async loadGoogleMapsAPI() {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAEWKP6g2pWXqE4kKDnM_sUsw6qmI3_tCc&libraries=geometry,places`;
                    script.async = true;
                    script.defer = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

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