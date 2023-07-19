<template>
    <div id="SingleBlog" class="my-3">
        <router-link :to="toURL">
            <div id="container" class="row">
                <div class="col-12 col-md-5 col-lg-4 col-xl-3">
                        <slot name="img" ></slot>
                </div>
                <div id="right" class="col-12 col-md-7 col-lg-8 col-xl-9" >
                    <h3><slot name="title"></slot></h3>
                    <div id="tags" >
                        <van-tag round color="#ff6666" size="large" class="tag" 
                            v-for="tag in tags" :key="tag.id"><span class="tag-text">
                                {{ tag.text }}</span>
                        </van-tag>
                    </div>
                    <p><slot name="content"></slot></p>
                </div>
            </div>
        </router-link>
        <div class="line_container">
            <div class="line"></div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
    tags: {
      type: Array,
      required: true
    },
    toURL:String
  }
};
</script>

<style lang="css" scoped>
#SingleBlog img{
    height: 200px;
    max-height: 200px;
    object-fit: cover;
}

#right{
    display: flex;
    flex-direction: column;
    padding-block: 10px;
}

#right h3{
    font-weight: bold;
}

#right #tags{
    margin-block: 10px;
}

#right .tag{
    margin-inline: 5px;
}

#right .tag-text{
    padding: 3px;
    font-size: 15px;
}

#SingleBlog .line_container{
    width: 100%;
    display: flex;
    justify-content: center;
}

#SingleBlog .line_container .line{
    width: 90%;
    height: 1px;
    background-color: #e0e0e0;
}
</style>