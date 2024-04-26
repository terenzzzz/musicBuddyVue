<template>
    <div id="Bottom-Footer">
        <div class="line_container"><div class="line my-5"></div></div>

        <div id="contact">
            <div class="row">
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-wechat me-1"></i><span>Terenz_</span></div>
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-whatsapp me-1"></i><span>+44 07529928070</span></div>
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-github me-1"></i><span><a href="https://github.com/terenzzzz">https://github.com/terenzzzz</a></span></div>
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-envelope me-1"></i><span>terence592592@gmail.com</span></div>
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-instagram me-1"></i><span>terenzzzz_</span></div>
                <div class="col-12 ps-3 col-sm-6 ps-m-0"><i class="bi bi-browser-chrome me-1"></i><span><a href="https://www.terenzzzz.cn">https://www.terenzzzz.cn</a></span></div>
            </div>
        </div>

        <div id="bottom"><a href="https://beian.miit.gov.cn/">粤ICP备2023082055号-1</a></div>
    </div>

    
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            
        }
    }
</script>

<style lang="css" scoped>
#Bottom-Footer{
    width: 100%;
    margin-top: 50px;
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
    margin-block: 50px;
}

#contact{
    width: 80%;
    margin: 0 auto;
}

#bottom{
    margin-top: 30px;
    color: gray;
    font-size: 12px;
    display: flex;
    justify-content: center;
} 
</style>