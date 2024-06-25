<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const chart = ref()
onMounted(() => {
    const pieChart = echarts.init(chart.value)
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 20,
            orient: 'vertical',
            textStyle: {
                color: "white", 
                fontSize: 14
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside'
                },
                
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '少儿' },
                    { value: 735, name: '综艺' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '游戏' },
                    { value: 300, name: '图书' }
                ]
            }
        ]
    };
    pieChart.setOption(option)
})
</script>

<template>
    <div class="box">
        <h2>年龄比例</h2>
        <img src="../../images/dataScreen-title.png" alt="" class="title">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<style scoped lang="scss">
.box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    h2 {
        color: white;
        margin-left: 10px;
        font-size: 20px;
    }

    img {
        margin-left: 10px;
    }

    .chart {
        width: 100%;
        height: 300px;
    }
}
</style>
