<template>
    <div id="SingleWork">
        <div class="card" >
            <slot name="img" class="card-img-top img-fluid"></slot>
            
            <div class="card-body">
                <h5 class="card-title fw-bold"><slot name="title" ></slot></h5>
                <p class="card-text content"><slot name="text" ></slot></p>
                <router-link :to="toURL">
                    <div class="link-text">
                        <p>查看细节</p>
                        <div class="line"></div>
                    </div>
                </router-link>
            </div>
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
}
.card{
    border-radius: 30px;
}
/* .card .img-container{
    width: 100%;
} */

.card img{
    border-radius: 30px 30px 0px 0px;
    height: 200px;
    max-height: 200px;
    object-fit: cover;
}

.link-text p{
    display: inline;
    font-weight: bold;
    border-bottom: 3px solid #FF6666; 
}

.content{
    height: 70px;
    max-height: 70px;
}


</style>