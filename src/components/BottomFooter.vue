<template>
    <div id="Bottom-Footer">
        <div class="line_container">
            <div class="line"></div>
        </div>

        <div id="top">
            <a href="/" @click="toggleWechat" ><img src="../assets/Wechat.png" width="30" height="30"></a>
            <a href="/" @click="toggleWhatsapp" ><img src="../assets/whatsapp.png" width="30" height="30"></a>
            <a href="https://github.com/terenzzzz" target="_blank"><img src="../assets/Github.png" width="30" height="30"></a>
            <a href="/" @click="toggleGmail"><img src="../assets/gmail.png" width="30" height="30"></a>
            <a href="/" @click="toggleInsta"><img src="../assets/insta.png" width="30" height="30"></a>
            <a href="https://www.linkedin.com/in/zhicong-jiang-074537281/" target="_blank"><img src="../assets/Linkedin.png" width="30" height="30"></a>
        </div>
        <div id="bottom"><p>Copyright @2023 All rights reserved</p></div>


        <van-dialog v-model="wechatIsShow" title="微信二维码" class="dialog">
            <div class="info-container">
                <img src="../assets/wechat_qr.jpg" width="300" height="300"/>
            </div>
        </van-dialog>

        <van-dialog v-model="whatsappIsShow" title="Whatsapp二维码" class="dialog">
            <div class="info-container">
                <img src="../assets/whatsapp_qr.jpg" width="300" height="300"/>
            </div>
        </van-dialog>

        <van-dialog v-model="gmailIsShow" title="邮箱地址" class="dialog">
            <div class="info-container">
                <p>terence592592@gmail.com</p>
            </div>
        </van-dialog>

        <van-dialog v-model="instaIsShow" title="Whatsapp二维码" class="dialog">
            <div class="info-container">
                <img src="../assets/insta_qr.jpg" width="300" height="300"/>
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

</style>