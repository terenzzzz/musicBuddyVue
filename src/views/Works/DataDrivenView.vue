<template>
    <div class="mt-3">
       <WorkHeader title="基于数据驱动的棋盘图分类器" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/dataDriven/dataDriven.png" class="img-fluid w-100">
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
                        <td>Python</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>源代码编辑器</td>
                        <td>VScode</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <h3 class="fw-bold">开发一个棋盘图分类器</h3>
                <p>构建并评估一个系统，该系统可以采用打印的棋盘图并报告每个方格上的棋子。系统的输入是一组jpeg格式的图像。输出是一个代表棋子的标签序列，例如' k ' = King， ' q ' = Queen，等等。您将获得用于培训和评估的标记数据集，以及帮助您入门的一些模板代码。</p>
                <p>使用您已经获得的经验来构建一个系统，用于转换棋盘图(取自书籍)并将其转换为棋盘状态的表示。这包括把整个棋盘的图切成64个单独的方块，然后计算出每个方块上有什么。方块可以是空的，也可以包含一个棋子。棋子可以是白兵或黑兵、象、马、车、国王或王后。</p>
                <p>这项任务并不像您想象的那么简单，因为在出版时使用的机械印刷过程产生的图像具有很大的可变性。请注意，存在很多缺陷。但是，您可以获得一组手工标记的训练数据，还会得到一个数据集，其中的图像已经损坏，即，通过添加人工噪声。如果您使用适当的分类/降维技术，您应该能够构建一个非常健壮的分类器。</p>
                
                <p>需要两个版本的分类器：</p>
                <li>独立方形分类。在这个版本中，分类器必须仅使用该正方形的图像而不使用其他信息来对每个正方形做出决策，即系统不知道该正方形在棋盘中的位置，也不知道棋盘上其他正方形的外观。</li>
                <li>全包分类。在这个版本中，系统可以访问额外的上下文:它知道棋盘中正方形的位置以及组成棋盘的所有64个正方形的外观。</li>

                <p class="fw-bold mt-3">无噪音数据结果:</p>   
                <li>Square mode: 98.1%</li>
                <li>Board mode: 98.3%</li>

                <p class="fw-bold mt-3">有噪音数据结果:</p>   
                <li>Square mode: 94.2%</li>
                <li>Board mode: 95.0%</li>

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
</style>