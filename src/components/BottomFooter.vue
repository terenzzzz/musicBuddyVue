<template>
    <div id="Bottom-Footer">
        <div id="top">
            <a href="/"><img src="../assets/Wechat.png" width="30" height="30"></a>
            <a href="/"><img src="../assets/whatsapp.png" width="30" height="30"></a>
            <a href="/"><img src="../assets/Github.png" width="30" height="30"></a>
            <a href="/"><img src="../assets/gmail.png" width="30" height="30"></a>
            <a href="/"><img src="../assets/insta.png" width="30" height="30"></a>
            <a href="/"><img src="../assets/Linkedin.png" width="30" height="30"></a>
        </div>
        <div id="bottom"><p>Copyright @2023 All rights reserved</p></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="css" scoped>
#Bottom-Footer{
    width: 100%;
    margin-block: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


#Bottom-Footer #top img{
    margin-inline: 20px;
}
</style>