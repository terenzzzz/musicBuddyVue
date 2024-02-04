<template>
    <div id="HealthyExpertView" class="mt-3">
       <WorkHeader title="n-grams 语言模型" date="2024/02/04"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/ngrams/ngrams.png" class="img-fluid w-100">
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
                        <td>源代码编辑器</td>
                        <td>IntelliJ IDEA</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <p>核心任务从实现您自己的链接对象结构(任务1)开始，可以将其连接以构建链表、自己的散列函数(任务2)和基于链表和散列函数实现的自己的散列表(任务3)。您应该使用散列表的实现来创建词汇表列表(任务4)和“所谓的”n-gram Language Models</p>
                
                <p><strong>Vocabulary List: </strong> 词汇表显示n-gram和频率表。此外，可以通过单击标题将词汇表设置为按单词(字母顺序)或计数(数值)按升序或降序排列。</p>
                <p><strong>Statistic: </strong>Statistic Panel计算哈希表中每个槽中linkedlist的长度，并将其以条形图的形式可视化给用户。条形图左边的数字表示linkedList的长度，右边的数字表示该长度在哈希表中出现的次数。另外，Statistic会计算出linkedlist的平均长度和标准差。</p>
                <p><strong>Document Review: </strong>该面板显示用户输入的.txt文件的内容，以便用户可以根据初始数据读取处理后的数据。</p>
                <p><strong>HashTable Structure: </strong>哈希表结构模块详细展示了初始数据如何存储在哈希表中。</p>
                <p><strong>Functions: </strong>函数模块是程序中可使用函数的集合，其中“新建文件”允许用户输入需要分析的。txt文件;N-grams允许用户设置使用哪个模型来处理文本;“去!将提取输入字段中的用户输入，并通过当前选择的模型预测接下来的20个术语，并显示在输出字段中。</p>
                <p><strong>Input Field: </strong>用户输入字段。</p>
                <p><strong>Output Field: </strong>预测输出字段。</p>


                


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