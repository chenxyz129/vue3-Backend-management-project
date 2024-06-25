<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from "echarts"
const chart = ref()
onMounted(() => {
    const radar = echarts.init(chart.value)
    const option = {
        title: {
            text: ''
        },
        legend: {
            data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '出行', max: 6500 },
                { name: '上网', max: 16000 },
                { name: '旅游', max: 30000 },
                { name: '美食', max: 38000 },
                { name: '健身', max: 52000 },
                { name: '购物', max: 25000 }
            ]
        },
        series: [
            {
                name: '消费统计',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '消费统计'
                    }                   
                ]
            }
        ]
    };
    radar.setOption(option)
})
</script>

<template>
    <div class="box">
        <h2>数据统计</h2>
        <img src="../../images/dataScreen-title.png" alt="">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<style scoped lang="scss">
.box {
    background: url(../../images/dataScreen-main-rt.png) no-repeat;
    background-size: 100% 100%;
    h2 {
        margin-left: 10px;
        font-size: 20px;
        color: white;
    }

    img {
        margin-left: 10px;
    }

    .chart {
        width: 100%;
        height: calc(100% - 30px);
    }
}
</style>