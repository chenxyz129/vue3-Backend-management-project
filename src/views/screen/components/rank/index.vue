<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const chart = ref()
onMounted(() => {
    const bar = echarts.init(chart.value)
    const option = {
        xAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                itemStyle:{
                    borderRadius: [10, 10, 0, 0]
                }
            }
        ]
    };
    bar.setOption(option)
})
</script>

<template>
    <div class="rank">
        <h2>热门景区排行</h2>
        <img src="../../images/dataScreen-title.png" alt="" class="title">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<style scoped lang="scss">
.rank {
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
        height: 300px;
    }
}
</style>