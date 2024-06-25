<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
import china  from "./china.json"
const map = ref()
echarts.registerMap('china', china as any)
onMounted(() => {
    const myMap = echarts.init(map.value)
    myMap.setOption({
        geo: [{
            map: 'china',
            roam: true,
            label: {
                show: true,
                color: "white"
            },
            itemStyle: {
                color: "skyblue",
                opacity: .8

            }
        }],
        series: [{
            type: 'lines',
            data: [
                {
                    coords: [[113.280637, 23.125178], [116.405285, 39.904989]],
                    lineStyle: {
                        width: 10,
                        color: 'orange'

                    }
                },
                {
                    coords: [[91.132212, 29.660361], [103.823557, 36.058039]],
                    lineStyle: {
                        width: 10,
                        color: 'orange'
                    }
                },
                {
                    coords: [[119.306239, 26.075302], [87.617733, 43.792818]],
                    lineStyle: {
                        width: 10,
                        color: 'orange',
                    }
                },
                {
                    coords: [[126.642464, 45.756967
                    ], [101.778916, 36.623178]],
                    lineStyle: {
                        width: 10,
                        color: 'orange',
                    }
                }
            ],

            effect: {
                show: true,
                symbolSize: 20,
                color: 'grey',
                symbol: 'arrow'
            }

        }]


    })
})
</script>

<template>
    <div ref="map">map</div>
</template>

<style scoped></style>