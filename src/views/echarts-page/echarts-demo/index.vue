<!--
 * @Description: 柱状图
 * @Autor: Alfred
 * @Date: 2022-03-28 15:41:03
 * @FilePath: \main-project\src\views\echarts-page\echarts-demo\index.vue
-->
<template>
  <div class="echarts-demo">
    <div class="echarts-box" @mouseout="mouseout()">
      <div ref="container" class="container"></div>
      <div class="img" :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }">
        <img src="@/assets/img/echarts.png" />
      </div>
      <div
        class="tooltip"
        :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px', display: tooltipDisplay }"
      >
        <div class="item">{{ time }}</div>
        <div v-for="(value, key) in list" :key="key" class="list">
          <sapn class="key">{{ key }}:</sapn>
          <sapn class="value">{{ value }}</sapn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'

const imgWidth = ref(0)
const imgHeight = ref(0)
const lineData = reactive([])
const heatmapData = reactive([])
const tooltipTop = ref(0)
const tooltipLeft = ref(0)
let timeOut = null
const tooltipDisplay = ref('none')
const time = ref('789')
const list = ref({})
function mouseout() {
  tooltipDisplay.value = 'none'
}
for (let i = 64; i <= 512; i++) {
  for (
    let j = new Date('2022-04-10 00:00:00').getTime();
    j < new Date('2022-04-11 00:00:00').getTime();
    j += 300000
  ) {
    heatmapData.push([
      moment(j).format('YYYY-MM-DD HH:mm'),
      i,
      i + '   ' + moment(j).format('DD日HH时mm分')
    ])
  }
}
for (
  let j = new Date('2022-04-10 00:00:00').getTime(), i = 200;
  j < new Date('2022-04-11 00:00:00').getTime();
  j += 300000
) {
  if (i < 114) {
    i += 100
  } else if (i > 462) {
    i -= 100
  } else {
    Math.random() > 0.5 ? (i += 50) : (i -= 50)
  }
  lineData.push([moment(j).format('YYYY-MM-DD HH:mm'), i])
}
const option = {
  title: {
    text: '测试图表',
    top: '4%',
    left: 'center',
    textStyle: {
      fontWeight: 700,
      fontSize: '18',
      color: '#000'
    }
  },
  // tooltip: {
  //   trigger: 'axis'
  // },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: 80,
    right: 50,
    bottom: 50,
    top: 50,
    // containLabel: true,
    show: true,
    borderColor: '#000000',
    borderWidth: 2
  },
  // 按钮 下载按钮
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    },
    min: '2022-04-10 00:00:00',
    max: '2022-04-10 24:00:00',
    boundaryGap: false // 不留白，从原点开始
  },
  yAxis: {
    type: 'log',
    logBase: 2,
    splitLine: {
      show: false
    },
    max: 512,
    min: 64
  },
  series: [
    {
      type: 'line',
      data: lineData,
      color: '#fff'
    }
  ]
}
const serie = {
  //这两组数据用来模拟markLine线段开关,data可以为空
  name: '',
  symbol: ['none'], //['none']表示是一条横线；['arrow', 'none']表示线的左边是箭头，右边没右箭头；['none','arrow']表示线的左边没有箭头，右边有箭头
  type: 'line',
  label: {
    position: 'start' //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
  },
  markLine: {
    animation: false, //动画
    silent: true, //鼠标悬停事件 true没有，false有
    // symbolSize: [0, 0], //两端标记大小
    symbol: ['none'],
    data: [
      {
        // silent: false, //鼠标悬停事件 true没有，false有
        name: '高度',
        yAxis: '250',
        lineStyle: {
          //警戒线的样式 ，虚实 颜色
          type: 'solid', //样式  ‘solid’和'dotted'
          color: '#000'
          // 3   //宽度
        }
      },
      {
        name: '时间',
        xAxis: '2022-04-10 14:00:00',
        lineStyle: {
          //警戒线的样式 ，虚实 颜色
          type: 'solid', //样式  ‘solid’和'dotted'
          color: '#000'
          // 3   //宽度
        }
      }
    ]
  }
}

console.log(heatmapData)

let mycharts = reactive({})
const container = ref(null)
function setImgWidth() {
  console.log(container.value.clientWidth)
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  imgWidth.value = width - 80 - 50
  imgHeight.value = height - 50 - 50
}
onMounted(() => {
  console.log('初始化')
  mycharts = echarts.init(container.value)
  mycharts.setOption(option)
  mycharts.getZr().on('click', (params) => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      const pointInPixel = [params.offsetX, params.offsetY]
      const containGrid = mycharts.containPixel({ gridIndex: 0 }, pointInPixel)
      if (!containGrid) {
        return
      }
      tooltipDisplay.value = 'inline-block'
      const pointInGrid = mycharts.convertFromPixel({ gridIndex: 0 }, pointInPixel)
      tooltipTop.value = params.offsetY
      tooltipLeft.value = params.offsetX
      const xIndex = pointInGrid[0]
      const xtime = new Date(xIndex)
      const obj = {
        time: xtime,
        isContainer: containGrid,
        height: pointInGrid[1]
      }
      console.log(containGrid)
      const a = heatmapData.find((value) => {
        return new Date(value[0]).getTime() > xIndex && value[1] > pointInGrid[1]
      })
      const b = lineData.find((value) => {
        return new Date(value[0]).getTime() + 300000 > xIndex
      })
      time.value = moment(a[0]).format('YYYY-MM-DD HH:mm:ss')
      list.value = {
        heatmapData: a[2],
        lineData: b[1]
      }
      Object.assign(params, obj)
    }, 200)
  })
  mycharts.getZr().on('dblclick', (params) => {
    tooltipDisplay.value = 'none'
    clearTimeout(timeOut)
    const pointInPixel = [params.offsetX, params.offsetY]
    const containGrid = mycharts.containPixel({ gridIndex: 0 }, pointInPixel)
    if (!containGrid) {
      return
    }
    const pointInGrid = mycharts.convertFromPixel({ gridIndex: 0 }, pointInPixel)
    tooltipTop.value = params.offsetY
    tooltipLeft.value = params.offsetX
    const xIndex = pointInGrid[0]
    const xtime = new Date(xIndex)
    const obj = {
      time: xtime,
      isContainer: containGrid,
      height: pointInGrid[1]
    }
    const a = heatmapData.find((value) => {
      return new Date(value[0]).getTime() + 300000 > xIndex && value[1] + 1 > pointInGrid[1]
    })
    serie.markLine.data[0].yAxis = a[1]
    serie.markLine.data[1].xAxis = a[0]
    const updateOption = cloneDeep(option)
    updateOption.series.push(serie)
    mycharts.setOption(updateOption, true)
  })
  setImgWidth()
})
</script>

<style scoped lang="scss">
.echarts-demo {
  .echarts-box {
    position: relative;
    .container {
      width: 100%;
      height: 500px;
      z-index: 10;
    }
    .img {
      position: absolute;
      top: 50px;
      left: 80px;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tooltip {
      position: absolute;
      border-style: solid;
      white-space: nowrap;
      z-index: 20;
      box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
      background-color: rgba(0, 0, 0, 0.6);
      border-width: 1px;
      border-radius: 4px;
      color: rgb(255, 255, 255);
      padding: 10px;
      border-color: rgb(77, 80, 93);
      pointer-events: none;
      opacity: 1;
      .key {
        width: 150px;
        display: inline-block;
      }
    }
  }
}
</style>
