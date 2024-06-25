<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import Age from "@/views/screen/components/age/index.vue"
import Tourists from "@/views/screen/components/tourists/index.vue"
import Sex from "./components/sex/index.vue"
import Line from "./components/line/index.vue"
import Map from "./components/map/index.vue"
import Rank from "./components/rank/index.vue"
import Year from "./components/year/index.vue"
import Count from "./components/count/index.vue"
const time = ref()
const getScale = (vw = 1920, vh = 1080) => Math.min(window.innerWidth / vw, window.innerHeight / vh)
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()})  translate(-50%, -50%)`
}
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()})  translate(-50%, -50%)`
    setInterval(() => {
        time.value = dayjs().format('YYYY年M月D日H:m:s')
    }, 1000)
})
const screen = ref()
</script>

<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="header">
                <div class="left">
                    <RouterLink to="/Home">
                        <div class="ltb">首页</div>
                    </RouterLink>
                </div>
                <div class="center">
                    <div class="title">智慧旅游可视化大屏数据</div>
                </div>
                <div class="right">
                    <div class="rbt">统计报告</div>
                    <span class="time">当前时间:{{ time }}</span>
                </div>
            </div>
            <div class="main">
                <div class="left">
                    <Tourists class="Tourists"></Tourists>
                    <Sex class="Sex"></Sex>
                    <Age class="Age"></Age>

                </div>
                <div class="center"><Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                   <Rank class="rank"></Rank>
                   <Year class="year"></Year>
                   <Count class="count"></Count>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transform-origin: 0 0;

        .header {
            display: flex;
            width: 100%;
            height: 74px;

            .left {
                height: 42px;
                flex: 1;
                background: url(./images/dataScreen-header-left-bg.png) no-repeat;
                background-size: 100% 100%;

                .ltb {
                    float: right;
                    width: 100px;
                    height: 100%;
                    background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
                    background-size: 100% 100%;
                    text-align: center;
                    line-height: 42px;
                    color: #29fcff;
                }
            }

            .center {
                height: 100%;
                flex: 2;

                .title {
                    height: 74px;
                    width: 100%;
                    background: url(./images/dataScreen-header-center-bg.png) no-repeat;
                    background-size: 100% 100%;
                    text-align: center;
                    line-height: 74px;
                    font-size: 40px;
                    color: #29fcff;
                }
            }

            .right {
                height: 42px;
                flex: 1;
                background: url(./images/dataScreen-header-right-bg.png) no-repeat;
                background-size: 100% 100%;

                .rbt {
                    float: left;
                    text-align: center;
                    line-height: 42px;
                    height: 42px;
                    width: 100px;
                    background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
                    background-size: 100% 100%;
                    color: #29fcff;
                }

                .time {
                    float: right;
                    text-align: center;
                    line-height: 42px;
                    margin-right: 50px;
                    color: #29fcff;
                }
            }

        }

        .main {
            display: flex;
            height: calc(100% - 40px);
            // background: grey;

            .left {
                height: inherit;
                flex: 1;
                display: flex;
                flex-direction: column;

                .Tourists {
                    flex: 1;
                }

                .Sex {
                    flex: 1;
                }

                .Age {
                    flex: 1;
                }
            }

            .center {
                height: inherit;
                flex: 2;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 3.5;
                }

                .line {
                    flex: 1
                }
            }

            .right {
                height: inherit;
                flex: 1;
                display: flex;
                flex-direction: column;
                .rank{
                    flex:1;
                }
                .year{
                    flex:1;
                }
                .count{
                    flex:1;
                }
            }
        }
    }
}
</style>