<!--
 * @Description: 自定义Echarts图
 * @Autor: Alfred
 * @Date: 2022-06-17 14:18:59
 * @FilePath: /main-project/src/views/echarts-page/custom-demo/index copy.vue
-->
<template>
  <div class="custom-demo">
    <div class="first-charts border-2">
      <h2>自定义custom series</h2>
      <div ref="container" class="container"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import cloneDeep from 'lodash/cloneDeep'

const container = ref(null)
const initEcharts = () => {
  if (container) {
    const chartDom = document.getElementById('main')
  }
  const myChart = echarts.init(container.value)

  const categoryData = []
  const errorData = []
  const barData = []
  const dataCount = 10
  for (let i = 0; i < dataCount; i++) {
    const val = Math.random() * 1000
    categoryData.push('category' + i)
    errorData.push([
      i,
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80)
    ])
    barData.push(echarts.number.round(val, 2))
  }
  const groupLen = 5
  console.log('errorData', errorData)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: 'Error bar chart'
    },
    legend: {
      data: ['bar', 'error']
    },
    xAxis: {
      data: categoryData
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        name: 'bar',
        data: barData,
        itemStyle: {
          color: '#77bef7'
        }
      },
      {
        type: 'custom',
        name: 'error',
        itemStyle: {
          borderWidth: 1.5
        },
        renderItem: function (params, api) {
          // 每个柱子的宽度
          const halfWidth = api.size([1, 0])[0]
          // 每个柱子对应x轴的坐标，一般柱子宽度中间的x轴对应的数值
          const xValue = api.value(0)
          const groupList = []
          for (let i = 1; i < groupLen * 2 + 1; i += 2) {
            const highPoint = api.coord([xValue, api.value(i)])
            const lowPoint = api.coord([xValue, api.value(i + 1)])
            const obj = {
              x: highPoint[0],
              highY: highPoint[1],
              cy: (highPoint[1] + lowPoint[1]) / 2,
              lowY: lowPoint[1]
            }
            groupList.push(obj)
          }
          console.log('groupList', groupList)
          // 设置样式
          const style = api.style({
            stroke: api.visual('color'),
            fill: undefined
          })
          const group = createShape(groupList, halfWidth * 0.5, style)
          return group
        },
        encode: {
          x: 0,
          y: [1, 2]
        },
        data: errorData,
        z: 100
      }
    ]
  }

  option && myChart.setOption(option)
}
/**
 * @description: 生成 Echarts series 中所有的length
 * @param {*} heightYList 最上面线的高度集合
 * @param {*} lowYList 最下面线的高度集合
 * @param {*} barWidth x轴单列的宽度
 * @param {*} groupLength 显示几个
 * @param {*} style 样式
 * @return {*}
 */

const createShape = (groupList, barWidth, style) => {
  // 最下面的横线
  const downLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 },
    style: style
  }
  // 目标点
  const circle = {
    type: 'circle',
    transition: ['shape'],
    shape: { cx: 0, cy: 0, r: 2 }
  }
  // 中间的竖线
  const verticalLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 },
    style: style
  }
  // 最上面的横线
  const upLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 },
    style: style
  }
  if (groupList.length === 0) {
    return
  } else if (groupList.length === 1) {
    const targetVal = groupList[0]
    const downObj = {
      x1: targetVal.x - barWidth / 4,
      y1: targetVal.lowY,
      x2: targetVal.x + barWidth / 4,
      y2: targetVal.lowY
    }
    Object.assign(downLine.shape, downObj)
    const upObj = {
      x1: targetVal.x - barWidth / 4,
      y1: targetVal.highY,
      x2: targetVal.x + barWidth / 4,
      y2: targetVal.highY
    }
    Object.assign(upLine.shape, upObj)
    const cObj = {
      cx: targetVal.x,
      cy: targetVal.cy,
      r: 2
    }
    Object.assign(circle.shape, cObj)
    const verticalObj = {
      x1: targetVal.x,
      y1: targetVal.lowY,
      x2: targetVal.x,
      y2: targetVal.highY
    }
    Object.assign(verticalLine.shape, verticalObj)
    const group = {
      type: 'group',
      children: [downLine, circle, verticalLine, upLine]
    }
    console.log('返回的group', group)
    return group
  }
  console.log(barWidth, 'barWidth')
  const sinleWidth = parseInt((barWidth - 5 * groupList.length) / groupList.length)
  const marginLen = (barWidth - groupList.length * sinleWidth) / groupList.length
  // console.log('sinleWidth', sinleWidth, 'marginLen', marginLen)
  const typeChildList = []
  for (let i = 0; i < groupList.length; i++) {
    const tmpVal = groupList[i]
    const leftX = tmpVal.x - barWidth / 2 + marginLen / 2
    const len = (sinleWidth + marginLen) * i
    const tarX = leftX + len + sinleWidth / 2

    const cObj = {
      cx: tarX,
      cy: tmpVal.cy,
      r: 2
    }
    const circleClone = cloneDeep(circle)
    Object.assign(circleClone.shape, cObj)

    const verticalObj = {
      x1: tarX,
      y1: tmpVal.lowY,
      x2: tarX,
      y2: tmpVal.highY
    }
    const verticalClone = cloneDeep(verticalLine)
    Object.assign(verticalClone.shape, verticalObj)

    const downObj = {
      x1: tarX - sinleWidth / 2,
      y1: tmpVal.lowY,
      x2: tarX + sinleWidth / 2,
      y2: tmpVal.lowY
    }
    const downClone = cloneDeep(downLine)
    Object.assign(downClone.shape, downObj)

    const upObj = {
      x1: tarX - sinleWidth / 2,
      y1: tmpVal.highY,
      x2: tarX + sinleWidth / 2,
      y2: tmpVal.highY
    }
    const upClone = cloneDeep(upLine)
    Object.assign(upClone.shape, upObj)

    typeChildList.push(upClone)
    typeChildList.push(downClone)
    typeChildList.push(circleClone)
    typeChildList.push(verticalClone)
  }
  console.log(typeChildList)
  return {
    type: 'group',
    children: typeChildList
  }
  //
  //
  // if (groupLen % 2 === 1) {
  //   console.log('奇数')
  // } else {
  //   console.log('偶数')
  //   for (let i = 0; i < groupList; i++) {}
  // }

  // console.log('aaa')
}
onMounted(() => {
  initEcharts()
})
</script>

<style scoped lang="scss">
.custom-demo {
  width: 100%;
  height: 100%;
  .first-charts {
    width: 100%;
    height: 450px;
    .container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
