<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref()
onMounted(() => {
    const sexChart = echarts.init(chart.value)
    sexChart.setOption({
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                type: 'bar',
                data: [60],
                barWidth:"20px",
                z:10,
                itemStyle:{
                    color:'skyblue',
                    borderRadius:10
                }
            },
            {
                type: 'bar',
                data: [ 100],
                barWidth:"20px",
                barGap:'-100%',
                itemStyle:{
                    color:'pink',
                    borderRadius:10
                }
            }
        ],
        grid: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }
    })
})
</script>

<template>
    <div class="box">
        <h2>男女比例</h2>
        <img src="../../images/dataScreen-title.png" alt="" class="title">
        <div class="sex">
            <div class="man"><img src="../../images/man.png" alt=""></div>
            <div class="woman"><img src="../../images/woman.png" alt=""></div>
        </div>
        <div class="rate">
            <div class="title"><span>男60%</span><span>女40%</span></div>
            <div class="chart" ref="chart"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    margin: 10px 0;
    background: url(../../images/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;

    h2 {
        font-size: 20px;
        color: white;
        margin-left: 10px;
    }

    .title {
        margin-left: 10px;
    }

    .sex {
        display: flex;
        margin: 0 auto;
        margin-top: 25px;
        justify-content: center;

        .man {
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;

        }

        .woman {
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;

        }
    }

    .rate {
        width: 100%;

        .title {
            margin: 0 auto;
            color: white;
            display: flex;
            justify-content: space-between;

            span {
                font-size: 20px;
            }
        }

        .chart {
            width: 100%;
            height: 80px;
        }
    }
}
</style>