<template>
    <div id="SingleWork">
        <div class="card h-100" >
            <slot name="img" class="card-img-top img-fluid"></slot>
            
            <div class="card-body">
                <h5 class="card-title fw-bold"><slot name="title" ></slot></h5>
                <span class="card-text content"><slot name="text" ></slot></span>
            </div>
            <router-link :to="toURL">
                    <div class="ps-3">
                        <p><span class="under_line">查看细节</span></p>
                        <div class="line"></div>
                    </div>
                </router-link>
        </div>


    </div>
</template>

<script>
export default {
    props: {
        toURL:String,
    },
    methods: {
        // flushCom(){
        //     this.$router.go(0)
        // }
    }
};
</script>

<style lang="css" scoped>
#SingleWork{
    margin: 20px;
    height: 90%;
}
.card{
    border-radius: 30px;
    height: 100%;
}
/* .card .img-container{
    width: 100%;
} */

.content{
    background: linear-gradient(to right, #bebcbc,#bebcbc) no-repeat left bottom;
    background-size: 0px 2px;
    transition: 0.5s;
}

.card:hover .content{
    background-size: 100% 2px;
}

.card img{
    border-radius: 30px 30px 0px 0px;
    height: 200px;
    max-height: 200px;
    object-fit: cover;
}


.under_line{
    display: inline; 
    font-weight: bold;
    border-bottom: 3px solid #FF6666;
}

.link-text{
    margin-top: 10px;
}





</style>