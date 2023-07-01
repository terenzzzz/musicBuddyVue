<template>
    <div id="work-content">
        <slot name="img"></slot>
        <h3><slot name="title"></slot></h3>
        <p><slot name="content"></slot></p>
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