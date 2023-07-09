<template>
    <div id="SingleStack" class="d-flex justify-content-center p-1 " 
    :style="`background-color: ${bgc};`">
      <img :src="imgSrc" class="img-fluid" width="20px" height="20px">
      <!-- <img src="../assets/stackLogo/git.png" class="img-fluid" width="20px" height="20px"> -->
        <div class="d-flex justify-content-center align-items-center">
            <h4  class="ps-2">{{stackName}}</h4>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        stackName:String,
        imgSrc:String,
        bgc:String
    }
};
</script>

<style lang="css" scoped>
#SingleStack h4{
    color: white; 
    margin: 0px;
    font-size: 16px;
    font-weight: bold;
}
</style>