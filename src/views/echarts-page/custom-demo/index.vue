<!--
 * @Description: 自定义Echarts图
 * @Autor: Alfred
 * @Date: 2022-06-17 14:18:59
 * @FilePath: /main-project/src/views/echarts-page/custom-demo/index.vue
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
  let errorData = []
  const barData = []
  const dataCount = 5
  for (let i = 0; i < dataCount; i++) {
    const val = Math.random() * 1000
    errorData.push([
      i,
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(val + Math.random() * 90),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(val + Math.random() * 90),
      echarts.number.round(Math.max(0, val - Math.random() * 100)),
      echarts.number.round(val + Math.random() * 80),
      echarts.number.round(val + Math.random() * 90)
    ])
    barData.push(echarts.number.round(val, 2))
  }
  errorData = [
    [
      0, 106, 86, 96, 95, 75, 85, 95, 75, 85, 95, 75, 85, 95, 75, 85, 95, 75, 85, 95, 75, 85, 110,
      90, 100, 110, 90, 100, 110, 90, 100, 99, 79, 89, 99, 79, 89, 99, 79, 89, 99, 79, 89, 98, 78,
      88, 97, 77, 87, 99, 79, 89, 99, 79, 89, 99, 79, 89, 98, 78, 88, 99, 79, 89, 99, 79, 89, 98,
      78, 88, 98, 78, 88
    ],
    [
      1, 56, 36, 46, 56, 36, 46, 56, 36, 46, 56, 36, 46, 57, 37, 47, 57, 37, 47, 57, 37, 47, 57, 37,
      47, 58, 38, 48, 58, 38, 48, 69, 49, 59, 69, 49, 59, 69, 49, 59, 69, 49, 59, 69, 49, 59, 69,
      49, 59, 75, 55, 65, 75, 55, 65, 75, 55, 65, 75, 55, 65, 75, 55, 65, 75, 55, 65, 74, 54, 64,
      74, 54, 64
    ],
    [
      2, 94, 74, 84, 94, 74, 84, 95, 75, 85, 94, 74, 84, 95, 75, 85, 94, 74, 84, 92, 72, 82, 91, 71,
      81, 118, 88, 103, 116, 86, 101, 125, 95, 110, 125, 95, 110, 126, 96, 111, 128, 98, 113, 128,
      98, 113, 129, 99, 114, 123, 93, 108, 125, 95, 110, 128, 98, 113, 129, 99, 114, 129, 99, 114,
      128, 98, 113, 131, 101, 116, 133, 103, 118
    ],
    [
      3, 118, 88, 103, 117, 87, 102, 123, 93, 108, 123, 93, 108, 123, 93, 108, 123, 93, 108, 122,
      92, 107, 122, 92, 107, 122, 92, 107, 121, 91, 106, 122, 92, 107, 122, 92, 107, 121, 91, 106,
      121, 91, 106, 121, 91, 106, 121, 91, 106, 122, 92, 107, 122, 92, 107, 123, 93, 108, 123, 93,
      108, 123, 93, 108, 125, 95, 110, 126, 96, 111, 125, 95, 110
    ],
    [
      4, 107, 87, 97, 107, 87, 97, 107, 87, 97, 94, 74, 84, 94, 74, 84, 93, 73, 83, 93, 73, 83, 93,
      73, 83, 103, 83, 93, 102, 82, 92, 106, 86, 96, 106, 86, 96, 106, 86, 96, 106, 86, 96, 106, 86,
      96, 107, 87, 97, 104, 84, 94, 105, 85, 95, 105, 85, 95, 105, 85, 95, 105, 85, 95, 106, 86, 96,
      105, 85, 95, 105, 85, 95
    ],
    [
      5, 60, 40, 50, 60, 40, 50, 60, 40, 50, 70, 50, 60, 70, 50, 60, 70, 50, 60, 67, 47, 57, 67, 47,
      57, 67, 47, 57, 67, 47, 57, 74, 54, 64, 74, 54, 64, 75, 55, 65, 75, 55, 65, 75, 55, 65, 75,
      55, 65, 80, 60, 70, 80, 60, 70, 80, 60, 70, 80, 60, 70, 78, 58, 68, 76, 56, 66, 76, 56, 66,
      77, 57, 67
    ],
    [
      6, 85, 65, 75, 85, 65, 75, 85, 65, 75, 117, 87, 102, 117, 87, 102, 117, 87, 102, 116, 86, 101,
      117, 87, 102, 117, 87, 102, 119, 89, 104, 118, 88, 103, 118, 88, 103, 117, 87, 102, 118, 88,
      103, 120, 90, 105, 120, 90, 105, 71, 51, 61, 73, 53, 63, 74, 54, 64, 75, 55, 65, 77, 57, 67,
      77, 57, 67, 80, 60, 70, -1, -1, -1
    ]
  ]
  const dimensionList = [
    '时间',
    `24h上限值`,
    `24h下限值`,
    `24h预测值`,
    `48h上限值`,
    `48h下限值`,
    `48h预测值`,
    `72h上限值`,
    `72h下限值`,
    `72h预测值`
  ]
  const groupLen = 24
  console.log('errorData', errorData)
  /* 自定义series的数据结构
   * 数据结构是一个二维数组，一组数据代表一根柱子，
   * 每个柱子详细值解释
   * 第一个值，用index, 表示这是第几个柱子
   * 第二个值，表示上面那个横线表示的Y值
   * 第三个值，表示下面那个横线表示的Y值
   * 第四个值，表示中间的点所表示的Y值，
   * 第五个值，表示上面那个横线表示的Y值
   * 第六个值，表示下面那个横线表示的Y值
   * 第七个值，表示中间的点所表示的Y值，
   * 三个为一组，以此类推，groupLen 表示总共有多少组
   */
  const colorArr = ['#2351BE', '#EA769E', '#D48265']
  const option = {
    title: {
      text: 'Error bar chart'
    },
    legend: {
      // data: ['CMQA-24h', 'CMQA-48h', 'CMQA-72h', '实测值']
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor: 'rgba(0,0,0,.6)',
      axisPointer: {
        type: 'shadow'
      },
      borderColor: '#4D505D',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff'
      },
      formatter: (params) => {
        let str = params[0].axisValue + '<br/>'
        params.forEach((item) => {
          if (item.componentSubType === 'bar') {
            str += item.marker
            const content = `<span>${item.seriesName}: ${item.value[1]}</span><br/>`
            str += content
          } else if (item.componentSubType === 'custom') {
            const dimensions = item.dimensionNames.filter((item) => !item.includes('value'))
            for (let i = 1, l = item.value.length, j = 0; i < l; i += 3) {
              if (item.value[i] === -1 || item.value[i + 1] === -1 || item.value[i + 2] === -1) {
                continue
              }
              const content = `<span>AQI${dimensions[j]}预报值: ${item.value[i + 2]}（${
                item.value[i]
              } - ${item.value[i + 1]}）</span><br/>`
              str += item.marker
              str += content
              j++
            }
          }
        })
        return str
      }
    },
    xAxis: {
      data: [
        '2022-06-23',
        '2022-06-24',
        '2022-06-25',
        '2022-06-26',
        '2022-06-27',
        '2022-06-28',
        '2022-06-29'
      ]
    },
    yAxis: {},
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 40
      }
    ],
    series: [
      {
        type: 'bar',
        name: '实测AQI',
        data: [
          ['2022-06-23', 96],
          ['2022-06-24', 46],
          ['2022-06-25', 84],
          ['2022-06-26', 103],
          ['2022-06-27', 97],
          ['2022-06-28', 50],
          ['2022-06-29', 75]
        ],
        barMinWidth: 64,
        itemStyle: {
          color: '#72C8F7'
        }
      },
      {
        type: 'custom',
        name: 'AQI',
        itemStyle: {
          borderWidth: 1.5
        },
        renderItem: function (params, api) {
          console.log(1, api.value[0], params)
          // 每个柱子的宽度
          const halfWidth = api.size([1, 0])[0]
          // 每个柱子对应x轴的坐标，一般柱子宽度中间的x轴对应的数值
          const xValue = api.value(0)
          const groupList = []
          for (let i = 1; i < groupLen * 3 + 1; i += 3) {
            const style = api.style({
              stroke: colorArr[groupList.length],
              fill: colorArr[groupList.length]
            })
            const highPoint = api.coord([xValue, api.value(i)])
            const lowPoint = api.coord([xValue, api.value(i + 1)])
            const centerPoint = api.coord([xValue, api.value(i + 2)])
            const obj = {
              x: highPoint[0],
              highY: highPoint[1],
              cy: (lowPoint[1] + highPoint[1]) / 2,
              lowY: lowPoint[1],
              style: style
            }
            groupList.push(obj)
          }
          console.log('groupList', groupList)
          // 设置样式
          const group = createShape(groupList, halfWidth * 0.5)
          return group
        },
        dimensions: dimensionList,
        encode: {
          tooltip: [
            `24h上限值`,
            `24h下限值`,
            `24h预测值`,
            `48h上限值`,
            `48h下限值`,
            `48h预测值`,
            `72h上限值`,
            `72h下限值`,
            `72h预测值`
          ],
          itemName: 3
        },
        data: errorData,
        z: 100
      }
    ]
  }
  console.log(option)
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

const createShape = (groupList, barWidth) => {
  // 最下面的横线
  const downLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 }
  }
  // 中间的竖线
  const verticalLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 }
  }
  // 最上面的横线
  const upLine = {
    type: 'line',
    transition: ['shape'],
    shape: { x1: 0, y1: 0, x2: 0, y2: 0 }
  }
  // 目标点
  const circle = {
    type: 'circle',
    transition: ['shape'],
    shape: { cx: 0, cy: 0, r: 5 }
  }
  if (groupList.length === 0) {
    return
  }

  let sinleWidth = parseInt((barWidth - 5 * groupList.length) / groupList.length)
  if (sinleWidth > 10) {
    sinleWidth = 10
  }
  const marginLen = (barWidth - groupList.length * sinleWidth) / groupList.length
  // console.log('sinleWidth', sinleWidth, 'marginLen', marginLen)
  const typeChildList = []
  for (let i = 0; i < groupList.length; i++) {
    const tmpVal = groupList[i]
    const leftX = tmpVal.x - barWidth / 2 + marginLen / 2
    const len = (sinleWidth + marginLen) * i
    const tarX = leftX + len + sinleWidth / 2
    const styleObj = {
      style: tmpVal.style
    }

    const cObj = {
      cx: tarX,
      cy: tmpVal.cy,
      r: 5
    }
    const circleClone = cloneDeep(circle)
    Object.assign(circleClone.shape, cObj)
    Object.assign(circleClone, styleObj)

    const verticalObj = {
      x1: tarX,
      y1: tmpVal.lowY,
      x2: tarX,
      y2: tmpVal.highY
    }
    const verticalClone = cloneDeep(verticalLine)
    Object.assign(verticalClone.shape, verticalObj)
    Object.assign(verticalClone, styleObj)

    const downObj = {
      x1: tarX - sinleWidth / 2,
      y1: tmpVal.lowY,
      x2: tarX + sinleWidth / 2,
      y2: tmpVal.lowY
    }
    const downClone = cloneDeep(downLine)
    Object.assign(downClone.shape, downObj)
    Object.assign(downClone, styleObj)

    const upObj = {
      x1: tarX - sinleWidth / 2,
      y1: tmpVal.highY,
      x2: tarX + sinleWidth / 2,
      y2: tmpVal.highY
    }
    const upClone = cloneDeep(upLine)
    Object.assign(upClone.shape, upObj)
    Object.assign(upClone, styleObj)

    typeChildList.push(upClone)
    typeChildList.push(downClone)
    typeChildList.push(verticalClone)
    typeChildList.push(circleClone)
  }
  console.log(typeChildList)
  return {
    type: 'group',
    children: typeChildList
  }
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
