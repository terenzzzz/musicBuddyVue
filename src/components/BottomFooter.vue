<template>
    <div id="Bottom-Footer">
        <div class="line_container"><div class="line my-5"></div></div>

            <div class="row justify-content-center text-center ">
            <div class="col-12 col-sm-6 col-md-3">
                <i class="bi bi-wechat"></i>
                <p>Terenz_</p>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <i class="bi bi-github"></i>
                <p><a href="https://github.com/terenzzzz">https://github.com/terenzzzz</a></p>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <i class="bi bi-envelope"></i>
                <p><a href="mailto:terence592592@gmail.com">terence592592@gmail.com</a></p>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <i class="bi bi-instagram"></i>
                <p>terenzzzz_</p>
            </div>
        </div>
        <div class="row justify-content-center text-center mt-3">
            <div class="col-12">
                <p>粤ICP备2023082055号-1</p>
            </div>
        </div>
    </div>

    <!-- <i class="bi bi-wechat me-1"></i>
    <div class="col-10 col-md-5 row d-flex justify-content-center mx-0">
                <div class="col-4 mb-1"><img src="../assets/logo/tuoslogo.png" class="img-fluid"></div>
                <h3>The University of Sheffield</h3>
                <p><i class="bi bi-star-fill mx-1"></i>BEng Software Engineering (2020 - 2023)</p>
                <p><i class="bi bi-star-fill mx-1"></i>Class One Honours</p>
            </div> -->
    
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
    width: 90%;
    height: 1px;
    background-color: #e0e0e0;
    margin-block: 50px;
}

#contact{
    width: 90%;
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