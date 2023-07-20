<template>
    <div id="Bottom-Footer">
        <div class="line_container">
            <div class="line"></div>
        </div>

        <div id="top" class="row m-0">
            <div class="col-2 ">
                <a href="/" @click="toggleWechat" ><img src="../assets/logo/Wechat.png" width="30" height="30"></a>
            </div>
            <div class="col-2">
                <a href="/" @click="toggleWhatsapp" ><img src="../assets/logo/whatsapp.png" width="30" height="30"></a>
            </div>
            <div class="col-2">
                <a href="https://github.com/terenzzzz" target="_blank"><img src="../assets/logo/Github.png" width="30" height="30"></a>
            </div>
            <div class="col-2">
                <a href="/" @click="toggleGmail"><img src="../assets/logo/gmail.png" width="30" height="30"></a>
            </div>
            <div class="col-2">
                <a href="/" @click="toggleInsta"><img src="../assets/logo/insta.png" width="30" height="30"></a>
            </div>
            <div class="col-2">
                <a href="https://www.linkedin.com/in/zhicong-jiang-074537281/" target="_blank"><img src="../assets/logo/Linkedin.png" width="30" height="30"></a>
            </div>
            
        </div>
        <div id="bottom"><a href="https://beian.miit.gov.cn/">粤ICP备2023082055号-1</a></div>


        <van-dialog v-model="wechatIsShow" title="微信二维码" class="dialog">
            <div class="info-container ">
                <img src="../assets/logo/wechat_qr.jpg" class="img-fluid"/>
            </div>
        </van-dialog>

        <van-dialog v-model="whatsappIsShow" title="Whatsapp二维码" class="dialog">
            <div class="info-container">
                <img src="../assets/logo/whatsapp_qr.jpg" class="img-fluid"/>
            </div>
        </van-dialog>

        <van-dialog v-model="gmailIsShow" title="邮箱地址" class="dialog">
            <div class="info-container">
                <p>terence592592@gmail.com</p>
            </div>
        </van-dialog>

        <van-dialog v-model="instaIsShow" title="Instagram二维码" class="dialog">
            <div class="info-container">
                <img src="../assets/logo/insta_qr.jpg" class="img-fluid"/>
            </div>
        </van-dialog>
    </div>

    
</template>

<script>
    export default {
        data() {
            return {
                wechatIsShow: false,
                whatsappIsShow: false,
                gmailIsShow: false,
                instaIsShow: false,
            };
        },
        methods: {
            toggleWechat(e) {
                e.preventDefault()
                this.wechatIsShow = true
            },
            toggleWhatsapp(e) {
                e.preventDefault()
                this.whatsappIsShow = true
            },
            toggleGmail(e) {
                e.preventDefault()
                this.gmailIsShow = true
            },
            toggleInsta(e) {
                e.preventDefault()
                this.instaIsShow = true
            }
        }
    }
</script>

<style lang="css" scoped>
#Bottom-Footer{
    box-sizing: border-box;
    width: 100%;
    margin-block: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


#Bottom-Footer #top img{
    margin-inline: 20px;
}

.dialog{
    width: 60%;
}

.info-container{
    display: flex;
    justify-content: center;
}

#Bottom-Footer .line_container{
    width: 100%;
    display: flex;
    justify-content: center;
}

#Bottom-Footer .line_container .line{
    width: 80%;
    height: 1px;
    background-color: #e0e0e0;
    margin-bottom: 50px;
    
}

#bottom{
    margin-top: 30px;
    color: gray;
    font-size: 12px;
}
</style>