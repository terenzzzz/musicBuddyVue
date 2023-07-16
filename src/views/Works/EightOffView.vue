<template>
    <div class="mt-3">
       <WorkHeader title="使用Haskell语言编写蜘蛛纸牌和8-Off纸牌游戏" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/eightOff/eightOff.png" class="img-fluid w-100">
                </div>
                
                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程语言</td>
                        <td>Haskell</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>源代码编辑器</td>
                        <td>VScode</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <p class="fw-bold">使用Haskell语言编写蜘蛛纸牌和8-Off纸牌游戏</p>
             
            </div>
        </div>
    </div>
       
</template>

<script>
import WorkHeader from '@/components/WorkHeader';

export default {
    components: {
        WorkHeader,
    },

};
</script>

<style lang="css" scoped>

table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}
th {
    background-color: #f2f2f2;
}

li{
    list-style-type: circle;
}

.subTitle{
    font-weight: bold;
}

img{
    max-height: 500px;
    object-fit: cover;
}
</style>