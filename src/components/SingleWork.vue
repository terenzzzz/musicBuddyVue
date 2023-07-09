<template>
    <div id="SingleWork">
        <a href="/">
            <div class="card" >
                <!-- <div class="img-container">
                    <slot name="img" class="card-img-top img-fluid"></slot>
                </div> -->
                <slot name="img" class="card-img-top img-fluid"></slot>
                
                
                <div class="card-body">
                    <h5 class="card-title fw-bold"><slot name="title" ></slot></h5>
                    <p class="card-text"><slot name="text" ></slot></p>
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


</style>