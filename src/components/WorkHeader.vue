<template>
    <div id="WorkHeader" class="row d-flex justify-content-center">
        <div class="col-10 d-flex flex-column align-items-center">
            <h2>{{title}}</h2>
            <p>{{date}}</p>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        title:String,
        date:String
    }
};
</script>

<style lang="css" scoped>
#WorkHeader h2{
    font-weight: bold;
}
</style>