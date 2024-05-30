<template>
    <div class="card rounded-4 h-100 shadow-sm">
      <div class="position-relative">
        <img :src="track.cover"  class="img-fluid d-block mx-auto rounded-top-4" style="height: 200px;">
        <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 rounded-bottom-4">
          <h5 class="card-title modelName mb-0">{{track.name}}}</h5>
          <p class="m-0 p-0 deviceType"><small>{{track.artist.name}}}</small></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      track: {
        type: Object,
        required: true
      }
    },
    methods: {
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