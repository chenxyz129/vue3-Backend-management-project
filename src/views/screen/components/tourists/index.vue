<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
const people = ref(['1', '2', '3', '4', '5', '人'])
const chart = ref()
onMounted(() => {
    const liquidfill = echarts.init(chart.value)
    liquidfill.setOption({
        title: {
            text: '水球图',
        },
        series: [{
            type: 'liquidFill',
            data: [0.5, 0.4, {
                value: 0.3,
                itemStyle: {
                    color: 'skyblue',
                    opacity: 0.6
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.9
                    }
                }
            }],
            radius: '90%',
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 4,
                    borderColor: '#156ACF',
                    shadowBlur: 20,
                    shadowColor: 'rgba(255, 0, 0, 1)'
                }
            }
        }],
    })
})


</script>

<template>
    <div class="box">
        <div class="top">
            <h2>实时游客统计</h2>
            <img src="../../images/dataScreen-title.png" alt="">
            <span>可预约总量99999人</span>
        </div>
        <div class="number"><span v-for="(item, index) in people" :key="index">{{ item }}</span></div>
        <div class="charts" ref="chart"></div>
    </div>
</template>

<style scoped lang="scss">
.box {
    background: url(../../images/dataScreen-main-lt.png) no-repeat;
    background-size: 100% 100%;

    .top {
        h2 {
            margin-left: 10px;
            font-size: 20px;
            color: white;
        }

        img {
            margin-left: 10px;
        }

        span {
            float: right;
            color: white;
            margin-bottom: 5px;
        }
    }

    .number {
        margin: 0 auto;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;

        span {
            float: left;
            width: 17%;
            height: 40px;
            color: white;
            font-size: 18px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png);
        }
    }

    .charts {
        width: 100%;
        height: 220px;
    }
}
</style>