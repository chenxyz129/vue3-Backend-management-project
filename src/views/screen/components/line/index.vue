<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref()
onMounted(() => {
    const lineChart = echarts.init(chart.value)
    lineChart.setOption({
        series: {
            type: "line",
            data: [150, 230, 224, 218, 135, 147, 260],
            smooth:true,
            areaStyle:{
                color:"skyblue"
            }
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            boundaryGap:false,
            splitLine :{
                show:false
            },
            
        },
        yAxis: {
            type: 'value',
            splitLine :{
                show:false
            }
        },
        grid: {
            top: 20,
            bottom: 20,
            right: 20,
            left: 30
        }
    })
})
</script>

<template>
    <div class="line">
        <h2>未来七天游客趋势</h2>
        <img src="../../images/dataScreen-title.png" alt="" class="title">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<style scoped>
.line {
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;

    h2 {
        font-size: 20px;
        color: white;
        margin-left: 10px;
    }

    .title {
        margin-left: 10px;
    }
    .chart{
        width: 100%;
        height: 200px;
    }
}
</style>