<template>
    <div id="HealthyExpertView" class="mt-3">
       <WorkHeader title="使用现代OpenGL渲染场景" date="2024/02/04"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                

                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/openGL/openGL.png" class="img-fluid w-100">
                </div>
                

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>图形界面</td>
                        <td>Java Swing</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>接口</td>
                        <td>OpenGL</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>源代码编辑器</td>
                        <td>IntelliJ IDEA</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>



                <p>作业将涉及使用现代OpenGL渲染场景。在建模过程中需要场景图，在分层模型中需要动画控件。</p>
                <p>在模拟场景的编程任务中，确保外星人以层次模型的形式呈现，考虑到整体场景的绘制，包括添加背景和必要的安全灯。通过使用纹理映射技术，包括基本纹理、漫反射和高光纹理，实现外星人和背景的视觉效果。在场景中正确配置灯光，确保其行为符合预期，同时提供必要的界面控件以便用户进行交互。最后，为外星人添加摇滚的动画效果，并确保两个外星人的动画流畅且合理。</p>
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

#HealthyExpertView img{
    max-height: 500px;
    object-fit: cover;
}

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
    margin-bottom: 30px;
}
</style>