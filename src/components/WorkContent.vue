<template>
    <div id="work-content">
        <slot name="img"></slot>
        <slot name="title"></slot>
        <slot name="content"></slot>
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