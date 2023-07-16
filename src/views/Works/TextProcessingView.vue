<template>
    <div class="mt-3">
       <WorkHeader title="TextProcessing 文本分析" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8 ">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/textProcessing/textProcessing.png" class="img-fluid w-100">
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

                <p class="fw-bold">项目 1: 文档检索：一种在大量文档中查找和获取特定信息的过程，通常通过计算机系统和搜索引擎实现。 </p>
                <p>作业要求为整个IR系统开发一个Retrieve类。检索类基于向量空间模型，并使用二进制、术语频率和TFIDF术语加权方案。然后，系统将使用停止列表和词干的不同组合对术语进行预处理，以观察这些操作将如何影响结果。完成后，我们将对结果进行分析，以确定三种方案的优缺点，并从准确性和效率等几个方面进行比较。</p>
                
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/textProcessing/result1.png" class="img-fluid w-100">
                </div>
                <p class="mt-3">结果表明，stopplist和词干提取可以成功地提高三种术语加权方案的准确率。此外，使用stopplist明显减少了检索时间，因为它对文档和查询中的术语进行了预处理，从而忽略了在检索中可能没有帮助的最流行的单词，从而大大减少了倒排索引的大小。然而，使用词干提取会略微增加检索时间。因为在文档中匹配时会合并词法变体，这样索引就会增加。</p>
                <p>当我们将stopplist与词干提取进行比较时，使用stopplist可以比使用词干提取提高二进制格式和词频格式的准确性。对于TFIDF，词干处理比stopplist有相当大的改进。</p>
                <p>停止列表可以显著减少二进制和TF检索的处理时间，而词干提取的处理时间则稍微减少一些。但TFIDF的不同之处在于，当使用词干提取时，它有更好的改进。然而，检索时间不仅受术语操作和编码，我已经尽我最大的努力使它更好地工作。</p>
                
                <p>总之，虽然二进制格式是一种简单的检索系统设计方法，但它的性能很差。虽然Tf不如二进制有效，但它仍然可以产生更好的结果。TFIDF是三种技术中最有效的，检索时间最长。此外，停止列表和词干提取三种方案值得考虑，以改善结果。在许多情况下，我们可以选择带有停止列表和词干的tf，以获得可接受的结果和效率。</p>
            
                <p class="fw-bold">项目 2: 电影评论的情感分析 </p>
                <p>使用烂番茄电影评论数据集来实现基于语料库的朴素贝叶斯模型，用于情感分析任务。该模型通过对数据集中的句子进行预处理和特征提取来训练，然后检测每个句子的情感并形成预测。将标准结果与预期结果进行比较，并用宏观f1值评价模型的有效性。</p>
                
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/textProcessing/result2.png" class="img-fluid w-100">
                </div>
                <p class="mt-3">从训练模型在扩展集上的投影结果与标准响应对比来看，观察到的宏观f1值不高，说明分类器不够好。朴素贝叶斯分类器认为所有特征都是独立的，不考虑协方差，在我看来，这是最终准确率低，宏观f1值低的主要原因之一。不考虑文本语境来改变对情感的评估令牌的极性，影响预测的准确性。然而，在不同的文本语境信息中，每个特征往往具有不同的情感。</p>
                <p>而且，从以上结果不难看出，无论是3类还是5类，All words与feature extraction得到的结果相差不大，但是feature extraction的模型对3类和5类的性能都略有提高。在特征提取部分，我提取了预处理后的评论，用nltk的pos标签库对单词进行了标记，然后提取评论中的形容词、副词、名词作为特征，并对特征进行词干提取，用于模型训练。特征提取后，单词数减少到57,789个。特征的数量减少了，模型的性能甚至略有提高。因此，如果数据集足够大，就有必要采取特征提取来减少模型和后续训练的内存大小。情绪预测需要时间，但特征提取也需要一些时间。</p>
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