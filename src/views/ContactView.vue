<template>
    <div>
        <div id="container" class="mt-5">
            <!-- <div class="btn btn-primary">芜湖</div> -->
            <div class="title">
                <h1>准备好聊天了吗?</h1>
                <div class="line"></div>
            </div>
            
            <div id="form" class="row d-flex flex-column align-items-center">
                <div class="col-8 col-sm-10 col-md-8 col-lg-6">
                    <div class="item">
                        <label for="exampleFormControlInput1" class="form-label">姓名</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="item">
                        <label for="exampleFormControlInput1" class="form-label">邮箱号</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" >
                    </div>
                    <div class="item">
                        <label for="exampleFormControlInput1" class="form-label">标题</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="item">
                        <label for="exampleFormControlTextarea1" class="form-label">消息</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                    <van-button color="#FF6464" class="submit-btn">发送</van-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>


export default {
    components: {

    }
}
</script>

<style lang="css" scoped>
/* #container{
    margin-block: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
} */

/* #container #form{
    margin-top: 30px;
    width: 40%;
} */

.title{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title .line{
    width: 50%;
    height: 5px;
    background-color: #FF6666;
    margin-bottom: 50px;
    
}

.item{
    margin-block: 20px;
}

.item label{
    font-weight: bold;
}

.submit-btn{
    width: 100%;
}
</style>