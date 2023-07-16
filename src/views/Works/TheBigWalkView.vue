<template>
    <div class="mt-3">
       <WorkHeader title="TheBigWalk 马拉松活动跟踪系统" date="2023/07/15"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                <div class="d-flex justify-content-center">
                    <img src="@/assets/worksDetail/theBigWalk/theBigWalk.png" class="img-fluid w-100">
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
                        <td>Ruby</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>前端框架</td>
                        <td>Ruby On Rails</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>数据库</td>
                        <td>PostgreSQL</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>源代码编辑器</td>
                        <td>VScode</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <h1 class="mt-3">项目介绍</h1>
                <p>“TheBigWalk”是由谢菲尔德大学校友会及校友会合办的筹款挑战活动，每年6月举行。到2022年，将有多达400名员工、校友(以前的学生)和公众人士乘坐地铁前往山顶区30公里或50公里的小道为大学的遗传疾病研究筹集资金。</p>
                <p>为了确保他们的安全，每个参与者都需要在路线的不同阶段被跟踪。目前的系统是给每个参与者分配一个戴在腕带上的号码。在每个检查站，一名法警在他们通过时标记他们的号码。如果有参与者没有通过，首席元帅会收到警报，他将联系可能迷路或受伤的参与者。</p>
                <p class="fw-bold">目前的系统耗时长，容易出现人为错误，并且在编警之间的沟通中存在困难。</p>
                <p>对于未来的Big Walk活动，主办方希望:</p>
                <li>一种有效的跟踪参与者的方法，通过标记任何潜在的伤害或“迷路”的步行者/跑步者，提高参与者的安全和健康</li>
                <li>一种跟踪谁开始了活动，谁退出了该活动，谁可能会迷路，谁已经完成了活动的方法</li>
                <li>为参赛者提供路线指导，告诉他们是领先、落后还是达到了预期速度，以及“终点时间”。</li>
                <li>一个数据中心，存储每个参与者的进度数据，“实时”更新，可供所有元帅和活动组织者查看</li>
                
                <h1 class="mt-3">项目成果</h1>
                <p>根据和客户的沟通，该系统主要分为三种不同的角色（参赛者、法警、主办方），每种角色对应不同的业务逻辑与需求。</p>
                
                <p class="fw-bold mt-3">主办方</p>
                <li>主办方可以创建/修改/终止活动</li>
                <li>主办方可以赋予其他用户权限</li>
                <li>主办方可以查看所有账号以及信息</li>
                <li>主办方可以接受并处理参赛者申请的帮助请求</li>
                <li>...</li>

                <p class="fw-bold mt-3">法警</p>
                <li>法警可以选择所在的检查点</li>
                <li>法警可以切换所在的检查点</li>
                <li>法警可以查看准备到达所在检查点的参赛者</li>
                <li>法警可以手动帮参赛者签到</li>
                <li>法警可以终止/暂停/恢复工作状态</li>
                <li>...</li>

                <p class="fw-bold mt-3">参赛者</p>
                <li>参赛者可以注册登录以登记参赛信息</li>
                <li>参赛者可以选择需要参加的活动以及路线</li>
                <li>参赛者可以点击开始按钮开始记录活动过程</li>
                <li>参赛者经过检查点时点击签到按钮，系统会根据目前定位判断参赛者是否到达检查点</li>
                <li>参赛者可查看到达下一个检查点的路线</li>
                <li>参赛者可查看当前的排名</li>
                <li>参赛者可选择是否加入排行榜</li>
                <li>参赛者可查看进度和时间</li>
                <li>参赛者可发起帮助请求</li>
                <li>...</li>



                
                <h1 class="mt-3">客户评价</h1>
                <p>一个非常好的系统，很容易导航，视觉上很吸引人。显然，在编程、系统美学、消息和使用的语言方面都花了很多心思。当有人想要退出时，添加的信息是很棒的，真正抓住了筹款的乐趣和关怀精神。这个系统看起来与现有的应用程序非常相似，所以我觉得步行者可以轻松使用这个应用程序。系统事件有一个排行榜，玩家可以选择加入，这是一个“很好的选择”</p>


                
               
                
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