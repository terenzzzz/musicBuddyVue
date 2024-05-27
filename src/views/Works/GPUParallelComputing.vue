<template>
    <div id="HealthyExpertView" class="mt-3">
       <WorkHeader title="使用OpenMp和Cuda对算法进行并行优化" date="2024/05/27"/>
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-8">
                
                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>技术栈</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程语言</td>
                        <td>C</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>API 库</td>
                        <td>CUDA; OpenMP</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>源代码编辑器</td>
                        <td>Visual Studio</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>版本控制</td>
                        <td>GitHub</td>
                    </tr>
                </table>

                <table class="my-5">
                    <tr>
                        <th>#</th>
                        <th>类型</th>
                        <th>型号</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>CPU</td>
                        <td>Intel(R) Core(TM) i7-8700</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>GPU</td>
                        <td>NVIDIA GeForce GTX 1050</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Memory</td>
                        <td>16384MB RAM</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Cuda Environment</td>
                        <td>Cuda Toolkit 11.7.1 with NSight</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Device Version</td>
                        <td>compute_61, sm_61</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Profiler</td>
                        <td>Visual Studio Profiler & NVIDIA Visual Profiler</td>
                    </tr>
                </table>


                <h3>Standard Deviation (Population)</h3>
                <div class="d-flex justify-content-center my-2">
                    <img src="@/assets/worksDetail/gpuParallel/standardDeviation.png" class="img-fluid">
                </div>

                <h3>Standard Deviation (Population)</h3>
                <div class="d-flex justify-content-center my-2">
                    <img src="@/assets/worksDetail/gpuParallel/convolution.png" class="img-fluid">
                </div>
                
                <h3>Standard Deviation (Population)</h3>
                <div class="d-flex justify-content-center my-2">
                    <img src="@/assets/worksDetail/gpuParallel/dataStructure.png" class="img-fluid">
                </div>
                


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