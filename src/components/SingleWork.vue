<template>
    <div id="SingleWork">
        <a href="/">
            <div class="card" >
                <img src="../assets/works/background1.jpg" class="card-img-top ">
                <div class="card-body">
                    <h5 class="card-title">HealthExpert</h5>
                    <p class="card-text">设计和开发一个协作的移动传感系统，连接移动或可穿戴设备，以支持普遍的健康应用</p>
                    <div class="link-text">
                        <p>查看细节</p>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        </a>
        
    </div>
</template>

<script>
export default {

};
</script>

<style lang="css" scoped>
#SingleWork{
    margin: 20px;
}
.card{
    border-radius: 30px;
}

.card img{
    border-radius: 30px 30px 0px 0px;
}

.link-text p{
    display: inline;
    font-weight: bold;
    border-bottom: 3px solid #FF6666; 
}
</style>