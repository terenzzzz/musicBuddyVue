<template>
    <div id="work-content" class="mt-3">
        <div class="row">
            <div class="col-3 col-sm-2 col-lg-3"><slot name="img"></slot></div>
            <div class="col-9 d-flex align-items-center justify-content-center"><h3 class="m-0"><slot name="title"></slot></h3></div>
        </div>
        
        <p class="mt-2"><slot name="content"></slot></p>
    </div>
</template>


<script>
    export default {
        
    }
</script>

<style lang="css" scoped>
#work-content{
    width: 100%;
    padding-inline: 10px;
}

#work-content h3{
    text-align: center;
    font-weight: bold;
    font-size: 24px;
}

#work-content p{
    text-align: center;
    color: #6e6d7a;
    font-size: 20px;
}
</style>