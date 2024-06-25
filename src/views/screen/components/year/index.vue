<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from "echarts"
const year = ref()
onMounted(() => {
    const scatter = echarts.init(year.value)
    const option = {
        xAxis: {},
        yAxis: {},
        series: [
            {
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter'
            }
        ]
    };
    scatter.setOption(option)
})
</script>

<template>
    <div class="box">
        <h2>年度游客对比</h2>
        <img src="../../images/dataScreen-title.png" alt="">
        <div ref="year" class="year"></div>

    </div>
</template>

<style scoped>
.box {
    background: url(../../images/dataScreen-main-rc.png) no-repeat;
    background-size: 100% 100%;
    margin: 10px 0;
    
    h2 {
        margin-left: 10px;
        font-size: 20px;
        color: white;
    }

    img {
        margin-left: 10px;
    }
    .year{
        height: calc(100% - 30px);
    }
}
</style>