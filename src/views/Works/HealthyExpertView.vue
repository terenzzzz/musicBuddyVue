<template>
    <div id="HealthyExpertView" class="mt-3">
       <WorkHeader title="HealthyExpert 安卓普适健康应用程序" date="2023/07/14"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8 d-flex flex-column align-items-center">
                <img src="@/assets/worksDetail/healthyExpert/healthyExpertPromo.png" class="img-fluid w-100">

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>前端</td>
                        <td>kotlin、Jetpack、XML</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>后端</td>
                        <td>Node.js、Express.js</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>API测试平台</td>
                        <td>Postman</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>数据库</td>
                        <td>MySQL</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>服务器</td>
                        <td>Linux Ubuntu</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>架构</td>
                        <td>MVVM</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>源代码编辑器</td>
                        <td>Android Studio</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>API库</td>
                        <td>Okhttp,MPAndroidChart,Gson...</td>
                    </tr>
                </table>



                <p>随着世界人口的增加，老龄化趋势逐渐加剧，患有长期慢性健康问题的人数不断增加。卫生系统正在出现劳动力短缺的问题。此外，最近医疗保健的价格不断上涨，低收入者可能难以负担医疗费用导致无法获得同样的医疗资源。不仅如此，城市和农村的医疗服务也存在着巨大的差异，这意味着生活在农村地区的人必须花费更多的时间和精力来获得他们应得的医疗保健服务。医疗保健系统不仅面临这三个突出的挑战，还面临其他问题，为了减轻它们的负面影响，全民健康的概念正受到越来越多的关注。</p>
                <p>近年来互联网被使用广泛，移动应用增多，移动设备功能的不断增强，移动设备已经发展成为人们生活中必不可少的物品。因此，利用移动设备监测和跟踪健康数据的概念应运而生。移动设备上的各种传感器用于收集、分析、存储和使用个人健康数据，以准确监测人体或周围环境的生命体征。手机被改造成智能计算设备，为用户提供个性化服务。</p>
                <p>基于上述背景，本项目的主要目的是尝试设计和开发一个协作移动传感系统，以支持普适健康应用。通过在移动设备上下载该应用程序，提供一个实时监测和跟踪各种健康数据的平台，为广大民众提供更方便、高效、优质的健康服务。</p>
                
                <img src="@/assets/worksDetail/healthyExpert/dataFlow.png" class="img-fluid">

                <p class="mt-3">根据资料收集和调查结果，表明市场上的健康监测应用在监测能力方面差别不大。这类围绕普适保健的应用程序可分为三个部分。首先是通过传感器和用户输入主动和被动手机尽可能准确有效的数据。二是对数据进行处理，利用采集到的数据，通过不同的算法进行分析，合适的分析算法可以提高应用的实用性。第三是数据的可视化，仅仅对数据进行分析是远远不够的，用户选择使用这类应用的动机是为了清晰简洁地了解自己的身体状况，因此数据的可视化非常关键。</p>
                <p>最终根据用户需求总结出以下功能模块: 步数监测、训练模式、卡路里监测、睡眠监测、心率检测、饮水监测提醒、药物提醒、身体指标监测、目标设定、经期预测、健康咨询、历史记录、健康建议等。</p>
            
                <img src="@/assets/worksDetail/healthyExpert/authorization.png" class="img-fluid">
                <li>用户可以输入邮箱和密码进行登录操作，也可以点击注册按钮跳转到注册页面进行注册。</li>


                <img src="@/assets/worksDetail/healthyExpert/home.png" class="img-fluid">
                <li>主页展示了不同健康数据模块并将数据清晰展示给用户。用户可以随时随地查看自己过去的健康数据，并在不健康时与医生共享数据以供参考，个人主页记录和监测用户的基本身体指标</li>


                <img src="@/assets/worksDetail/healthyExpert/calories.png" class="img-fluid">
                <li>卡路里监测允许用户输入自己的卡路里摄入和消耗记录，同时可以被用户删除或修改，同时该功能会自动汇总其他部分如步骤和训练中消耗的卡路里。通过比较预先设定的目标，它可以帮助用户了解他们每天的能量摄入和消耗，以避免过度消耗可能导致肥胖，或消耗不足可能导致营养不良。</li>


                <img src="@/assets/worksDetail/healthyExpert/steps.png" class="img-fluid">
                <li>步数监测可以在后台持续跟踪步数和时间，并计算距离、消耗的卡路里和行为习惯。通过这个功能，用户可以了解自己每天的运动量是否达标以及自己的活动情况等，提高人们的活动积极性。</li>


                <img src="@/assets/worksDetail/healthyExpert/training.png" class="img-fluid">
                <li>训练监测允许用户跟踪不同活动的数据，如步行，跑步，骑自行车等。使用不同的算法处理数据并通过GPS记录运动轨迹。它还允许用户查看每日锻炼是否达到了目标。</li>


                <img src="@/assets/worksDetail/healthyExpert/water.png" class="img-fluid">
                <li>收集用户提供的饮水记录，通过推送通知提醒用户喝水。与预设目标相比，它可以帮助用户更好地管理日常饮用水，随时保持身体水分。</li>


                <img src="@/assets/worksDetail/healthyExpert/medication.png" class="img-fluid">
                <li>允许用户手动添加药物和设置服药提醒，并根据设定的时间推送通知提醒用户服药，这对于需要长期服药的人来说更加人性化，更容易管理和跟踪服药情况。</li>


                <img src="@/assets/worksDetail/healthyExpert/sleep.png" class="img-fluid">
                <li>监测睡眠时长和睡眠环境，生成睡眠报告以响应用户，让他们知道他们需要如何改进以获得更好的睡眠，帮助实现睡眠目标并改善整体健康状况。</li>

                <img src="@/assets/worksDetail/healthyExpert/heartRate.png" class="img-fluid">
                <li>允许用户监测和记录他们当前的心率，可以让人们了解他们的健康水平、心脏健康和情绪状况，然后使用这些信息做出改变、设置优先级，并朝着更健康的生活迈进</li>


                <img src="@/assets/worksDetail/healthyExpert/period.png" class="img-fluid">
                <li>跟踪你的月经周期和每月的变化可以帮助计划生育，预防怀孕。</li>

                <p class="mt-5">在实际的开发中，由于时间的限制，无法实现所有预先分析的功能需求，但所有必要的功能和部分值得选择的功能已经实现。对于测试部分，性能测试分数很好，CPU使用率很低，内存使用率和能耗也很低。总的来说，用户对应用软件还是比较满意的，但是还是存在一些bug。此外，用户也对改进提出了宝贵的建议。这个软件可以满足用户的基本需求，帮助用户监测和了解自己的健康状况，从而做出相应的对策。但是，为了更好地满足每个用户的需求，提供更好的用户体验，还有很大的改进空间。</p>
                <p>普及医疗保健计划是解决当前医疗保健系统面临的一系列危机和挑战的方案之一。它可以定义为通过消除位置、时间和其他限制，同时提高覆盖范围和质量，随时随地向任何人提供医疗保健。相比之下，移动健康是使用手机或其他无线设备与软件相结合来支持医疗保健，这可以帮助改善疾病预防和自我管理，提高医疗保健的质量和效率，降低医疗保健成本和增加</p>
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
    max-height: 300px;
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