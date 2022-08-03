<template>
  <div class="d3-demo-1">
    <div>d3-demo-1 测试页面</div>
    <div class="content-svg" style="padding: 10px 0 0px 20px; height: 100%">
      <svg
        id="svgYAxis"
        ref="svgYAxis"
        onselectstart="return false"
        :style="{ height: height + 'px', width: 40 + 'px' }"
      ></svg>
      <svg
        id="speed"
        onselectstart="return false"
        :style="{ height: height + 'px', width: width + 'px' }"
        class="leftsvg"
      >
        <defs id="defs">
          <g id="id1">
            <image
              id="radarImage1"
              :xlink:href="radarImage.image1.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <image
              v-show="isDrawWind"
              id="image1"
              :xlink:href="image.image1.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <g v-show="isDrawPBL" id="pbl1"></g>
            <g v-show="isDrawAOD" id="aod1"></g>
            <g v-show="isDrawYundigao" id="yundigao1"></g>
            <g id="xAxis1"></g>
          </g>
          <g id="id2">
            <image
              id="radarImage2"
              :xlink:href="radarImage.image2.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <image
              v-show="isDrawWind"
              id="image2"
              :xlink:href="image.image2.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <g v-show="isDrawPBL" id="pbl2"></g>
            <g v-show="isDrawAOD" id="aod2"></g>
            <g v-show="isDrawYundigao" id="yundigao2"></g>
            <g id="xAxis2"></g>
          </g>
          <g id="id3">
            <image
              id="radarImage3"
              :xlink:href="radarImage.image3.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <image
              v-show="isDrawWind"
              id="image3"
              :xlink:href="image.image3.imageData"
              y="50"
              :style="{ height: imageHeight + 'px', width: imageWidth + 'px' }"
            ></image>
            <g v-show="isDrawPBL" id="pbl3"></g>
            <g v-show="isDrawAOD" id="aod3"></g>
            <g v-show="isDrawYundigao" id="yundigao3"></g>
            <g id="xAxis3"></g>
          </g>
        </defs>
        <use xlink:href="#id1" :x="image.image1.imageLeft"></use>
        <use xlink:href="#id2" :x="image.image2.imageLeft"></use>
        <use xlink:href="#id3" :x="image.image3.imageLeft"></use>
      </svg>
      <svg
        id="svgBar"
        ref="svgBar"
        onselectstart="return false"
        :style="{ height: height + 'px', width: 110 + 'px' }"
        style=""
      ></svg>
    </div>
    <div>{{ itemData }}</div>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { image1 } from './image1'
import { image2 } from './image2'
import { image3 } from './image3'
import moment from 'moment'

// 初始竖线距雷达图左边框的距离
let defaultVerticalXLeft = 0
const itemData = ref('')
const height = ref(520)
const imageHeight = 420
const image = reactive({
  image1: {
    imageData: '',
    imageLeft: -5880,
    timeScale: '',
    xAxis: 'xAxis1', // 坐标轴ID
    axis: '',
    time: '2022-06-22 00:00:00'
  },
  image2: {
    imageData: '',
    imageLeft: 0,
    timeScale: '',
    xAxis: 'xAxis2',
    axis: '',
    time: '2022-06-23 00:00:00'
  },
  image3: {
    imageData: '',
    imageLeft: 5880,
    timeScale: '',
    xAxis: 'xAxis3',
    axis: '',
    time: '2022-06-24 00:00:00'
  }
})
const radarImage = reactive({
  image1: {
    imageData: image1,
    timeScale: '',
    xAxis: 'xAxis1', // 坐标轴ID
    pbl: 'pbl1',
    aod: 'aod1',
    yundigao: 'yundigao1',
    axis: ''
  },
  image2: {
    imageData: image2,
    timeScale: '',
    xAxis: 'xAxis2',
    pbl: 'pbl2',
    aod: 'aod2',
    yundigao: 'yundigao2',
    axis: ''
  },
  image3: {
    imageData: image3,
    timeScale: '',
    xAxis: 'xAxis3',
    pbl: 'pbl3',
    aod: 'aod3',
    yundigao: 'yundigao3',
    axis: ''
  }
})
const imageWidth = ref(5880)
let imageAtLeft = 'image1'
let imageAtCenter = 'image2'
let imageAtRight = 'image3'
let timeScale = reactive({})

const isDrawWind = ref(false)
const isDrawPBL = ref(false)
const isDrawAOD = ref(false)
const isDrawYundigao = ref(false)

/********* y轴定义域 *****************************************/
let svgYAxis = ''
const yAxisTickValues = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5]
const yAxisDomain = [0, 5]
/**
 * @description: 创建y轴线
 * @return {*}
 */
function createYAxis() {
  svgYAxis = d3.select('#svgYAxis')
  const yScale = d3.scaleLinear().domain(yAxisDomain).range([420, 0])
  // svg添加y轴
  svgYAxis
    .append('g')
    .attr('id', 'yAxis')
    .attr('class', 'wind_axis')
    .attr('transform', 'translate(39,51)')
    .call(d3.axisLeft(yScale).tickValues(yAxisTickValues))
  // eslint-disable-next-line newline-per-chained-call
  svgYAxis.append('g').append('text').text('Km').attr('x', 12).attr('y', 30)
}
/********* 结束 **********************************************/

/********* bar定义域  ****************************************/
let svgBar = ''

const y2Scale = d3.scaleLinear().domain([0, 5]).range([imageHeight, 0])
const yAxis = d3.axisRight(y2Scale).ticks(10)

const windLevel = [
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 6 },
    { x: 20, y: 0 },
    { x: 0, y: 0 }
  ], // level1
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 0, y: 0 }
  ], // level2
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 6 },
    { x: 16, y: 0 },
    { x: 0, y: 0 }
  ], // level3
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 10 },
    { x: 16, y: 0 },
    { x: 0, y: 0 }
  ], // level4
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 10 },
    { x: 16, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 6 },
    { x: 12, y: 0 },
    { x: 0, y: 0 }
  ], // level5
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 10 },
    { x: 16, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 10 },
    { x: 12, y: 0 },
    { x: 0, y: 0 }
  ], // level6
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 0 },
    { x: 16, y: 0 },
    { x: 16, y: 10 },
    { x: 16, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 10 },
    { x: 12, y: 0 },
    { x: 8, y: 0 },
    { x: 8, y: 10 },
    { x: 8, y: 0 },
    { x: 0, y: 0 }
  ], // level7
  [
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 17, y: 8 },
    { x: 14, y: 0 },
    { x: 17, y: 8 },
    { x: 20, y: 0 },
    { x: 0, y: 0 }
  ] // level8
]
const windLevelCh = ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级以上'] // 八-十二级
const barHeight = 240
const barLeftMargin = 50
/**
 * @description: 创建bar
 * @return {*}
 */
function createBar() {
  svgBar = d3.select('#svgBar')
  const imageBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAADwCAYAAABfYQmVAAAEk0lEQVR42u3ZT2jXdRzH8d/+Oqfb
ftP+QkTQn4sECR30UkRIEEhRBOUh8LJOFoSH/hzCDtVBCgJBxiIsQkjYwYIdBolhLNpkldEqpUbr
r62Y/6ab2159iB06KPvD1vPV9nrDE0QQXj78/rYvs1LJVSoDXZ0is0GYaaggWSFMt9QgBcENYWpD
DZIVwuUba5CCsHgELQ/CLbVIi0DQ8iHcUYtk9STAL0tX6r9FmLyzVmQWT0IQyk3cXSeyRX5hXFqI
ia1lDJjFe0IQyl26r15kFggXH6gXWRBcEMa314vMA+GRMgYsCDYIOxpEFgQXhAs7G0TmgdDRKLIg
uCCcf7pRZBYI53Y3iiwINggvrBFZEFwQzr7cJDILhDOvNYksCDYIr5cxYBYIY/vWiiwINgidZQyY
B8LbZQxYEGwQ3mkWWRBcEM4cbBaZB8L7ZQxYEGwQuteJzAPhgzIGLAg2CD1lDFgQXBDO9q4XmQfC
kTIGLAg2CB+3iMzj/x0+bRFZEGwQBsoYMA+EwTIGLAg2CF+WMWBBsEEYahWZB8LJMgYsCC4I539o
E5kHwkgZAxYEG4RfyxiwINgg/FEVmQXChbGqyIJgg3CujAHzeGMcbxdZEFwQ/rzYLjILhJFL7SIL
ggvCNxNVkQXBBWGwDCGzQDg6WRVZEFwQesoQMguE7jKELAguCAfKELIguCDsn2wTmQXC3sttIguC
C8KeMoTMAuG5MoQsCC4Iz0y1icwCoaMMIQuCC8LjU60iC4ILwkNlCJkFwrbpVpEFwQVhaxlCZoFw
VxlCFgQXhFtnWkQWBBeEG8oQMguEqlpEFgQXhLoyhMwCoaJ2oQXBBuF6oXkg3CS0INgg3Ca0INgg
bBKaB8JmoQXBBmGL0DwQ7hVaEGwQtgktCDYI24XmgfCo0ILggjDzhNA8EJ4UWhBsEDqE5oGwS2hB
sEF4VmhBsEF4UWgeCHuEFgQbhFeF5oHwhtCCYIOwT2hBsEHoEprFTb8rtCC4IEwdFJrFTRwSWhBM
EGrGu0VmgVA7dlhkQbBBGP1QZEGwQfi9R2QWCHU/9YosCDYIwx+JzAKh/tRRkQXBBmHomMiC4ILQ
cKJPZBYIjYP9IguCDUL/cZF5IPR9LrIg2CAcOyEyC4Q1R4ZEFgQbhN7vRBYEF4SmnlMi80A4PCyy
ILggrO0eEZkHwqFfRBYEF4Tm906LLAg2CAdGRWaBsO6tv0QWBBuE/WUMmAfCm6MiC4ILwvq9p0Vm
gdDyym8iC4ILQutLP4ssCDYIz4+IzANh948iC4ILQtuuYZF5IDz1vciC4IJQ3XlSZEFwQWjf8a3I
PBAeGxJZEGwQHv5aZBYIGx78SmRBWDiCZlva23j/FyJbIMCVfr0ECPcMiswCYaCrU2T/esQ1x+O+
vAgbtxxHmkXweBKCUIZcs7kfaYEIy/fd4R+ETZ8hLQJheS4IswjX3t6HZIVw3c2fIAXBDQF+Wcrl
civnFIBcEIKwkgHm+xOeqyHM98/+b/6FNcdfdq7fW5UIlZXwBMwXQavh68ViEVbMx0FXQdACPgor
5iOR94JcLreq72+n/sF8UjsfgQAAAABJRU5ErkJggg==`
  svgBar
    .append('image')
    .attr('id', 'image')
    .attr('xlink:href', imageBase64)
    .attr('x', 50)
    .attr('y', 50)
    .attr('width', 60)
    .attr('height', 230)
  // 定义折线
  const line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
  // 风的图标
  windLevel.forEach((array, index) => {
    svgBar
      .append('path')
      .attr('class', 'wind_level')
      .attr('d', line(array))
      .attr(
        'transform',
        'translate(' + (barLeftMargin - 10) + ',' + (barHeight + 50 + 25 * index) + ')'
      )
  })
  // 风的等级
  windLevelCh.forEach((name, index) => {
    svgBar
      .append('g')
      .append('text')
      .attr('class', 'wind_levelCh')
      .text(name)
      .attr('x', barLeftMargin + 15)
      .attr('y', barHeight + 58 + 25 * index)
  })
  svgBar
    .append('g')
    .attr('id', 'y2Axis')
    .attr('class', 'wind_axis')
    .attr('transform', 'translate(1,' + 51 + ')')
    .call(yAxis)
}
/********* 结束 **********************************************/

/********* 创建中间图表定义域  ****************************************/
// const parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S')
let svgSpeed = ''

const width = 1800
const drag = d3.drag().on('drag', (e) => {
  if (image[imageAtCenter].imageLeft > width) {
    const tmp = imageAtRight
    imageAtRight = imageAtCenter
    imageAtCenter = imageAtLeft
    imageAtLeft = tmp

    radarImage[imageAtLeft].imageData = ''
    image[imageAtLeft].time = moment(image[imageAtLeft].time)
      .subtract(3, 'd')
      .format('YYYY-MM-DD 00:00:00')
    //   // 时间比例尺
    console.log(
      image[imageAtLeft].time,
      moment(image[imageAtLeft].time).add(1, 'd').format('YYYY-MM-DD 00:00:00')
    )
    image[imageAtLeft].timeScale = d3
      .scaleTime()
      .domain([
        new Date(image[imageAtLeft].time),
        new Date(moment(image[imageAtLeft].time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
      ])
      .range([0, imageWidth.value])
    timeScale = d3
      .scaleTime()
      .domain([
        new Date(image[imageAtCenter].time),
        new Date(moment(image[imageAtCenter].time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
      ])
      .range([0, imageWidth.value])
    // 定义时间轴
    image[imageAtLeft].axis = d3
      .axisBottom(image[imageAtLeft].timeScale)
      .tickFormat(localTimeFormate)
      .ticks(24)
    d3.select('#' + image[imageAtLeft].xAxis)
      .selectAll('g')
      .remove()
    // svg添加时间轴
    d3.select('#' + image[imageAtLeft].xAxis)
      .append('g')
      .attr('class', 'wind_axis')
      .attr('transform', 'translate(0,' + (imageHeight + 51) + ')')
      .call(image[imageAtLeft].axis)
    image[imageAtLeft].imageLeft = image[imageAtCenter].imageLeft - imageWidth.value
  } else if (image[imageAtRight].imageLeft < 0) {
    const tmp = imageAtLeft
    imageAtLeft = imageAtCenter
    imageAtCenter = imageAtRight
    imageAtRight = tmp

    radarImage[imageAtRight].imageData = ''
    image[imageAtRight].time = moment(image[imageAtRight].time)
      .add(3, 'd')
      .format('YYYY-MM-DD 00:00:00')
    // 时间比例尺
    console.log(
      image[imageAtRight].time,
      moment(image[imageAtRight].time).add(1, 'd').format('YYYY-MM-DD 00:00:00')
    )
    image[imageAtRight].timeScale = d3
      .scaleTime()
      .domain([
        new Date(image[imageAtRight].time),
        new Date(moment(image[imageAtRight].time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
      ])
      .range([0, imageWidth.value])
    timeScale = d3
      .scaleTime()
      .domain([
        new Date(image[imageAtCenter].time),
        new Date(moment(image[imageAtCenter].time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
      ])
      .range([0, imageWidth.value])
    console.log(image[imageAtRight].timeScale)
    // 定义时间轴
    image[imageAtRight].axis = d3
      .axisBottom(image[imageAtRight].timeScale)
      .tickFormat(localTimeFormate)
      .ticks(24)
    d3.select('#' + image[imageAtRight].xAxis)
      .selectAll('g')
      .remove()
    // svg添加时间轴
    d3.select('#' + image[imageAtRight].xAxis)
      .append('g')
      .attr('class', 'wind_axis')
      .attr('transform', 'translate(0,' + (imageHeight + 51) + ')')
      .call(image[imageAtRight].axis)
    image[imageAtRight].imageLeft = image[imageAtCenter].imageLeft + imageWidth.value
  }
  image.image1.imageLeft = image.image1.imageLeft + e.dx
  image.image2.imageLeft = image.image2.imageLeft + e.dx
  image.image3.imageLeft = image.image3.imageLeft + e.dx
  defaultVerticalXLeft = defaultVerticalXLeft + e.dx
  d3.select('#verticalLine').attr('x1', defaultVerticalXLeft)
  d3.select('#verticalLine').attr('x2', defaultVerticalXLeft)
})

let clickTimeId = ''

function createSpeed(svg, callback) {
  svg = d3.select('#speed')
  svg
    .append('rect') // 添加一个矩形
    .attr('id', 'rect')
    .attr('class', 'layer')
    .attr('x', 0)
    .attr('y', 50)
    .attr('width', width)
    .attr('height', imageHeight)
    .attr('opacity', 0)
    .call(drag)
    .on('click', (e) => drawTootip(e))
    .on('dblclick', (e) => drawVerticalLine(e))
  // .on('mouseout', () => this.tooltip.style('display', 'none'))
  svg
    .append('g')
    .append('text')
    .text('气溶胶激光雷达')
    .attr('id', 'title')
    .attr('class', 'wind_title')
    .attr('x', width / 2)
    .attr('y', 40)
  callback(svg)
}
// 单击绘制提示框
function drawTootip(event) {
  clearTimeout(clickTimeId)
  // 执行延时
  clickTimeId = setTimeout(() => {
    // 此处为单击事件要执行的代码
    getSingleData(event)
  }, 200)
}
// 格式化根据像素计算出的时间
function TimeFormate(time) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1 // 月份是从0开始的
  const day = time.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  if (min % 5 != 0) {
    //eslint-disable-line
    if (min % 5 <= 3) {
      min = min - (min % 5)
    } else {
      min = min + (5 - (min % 5))
    }
  }
  if (min === 60) {
    hour += 1
    min = 0
  }
  min = min < 10 ? '0' + min : min
  const newTime =
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (day < 10 ? '0' + day : day) +
    ' ' +
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    min +
    ':00'
  return newTime
}
function getSingleData(event) {
  // 根据点击像素距图片左边距的距离计算时间
  console.log(
    event.offsetX,
    event.offsetY,
    timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4)
  )
  console.log(image[imageAtCenter].imageLeft)
  console.log(event.offsetX - image[imageAtCenter].imageLeft - 4)
  console.log(TimeFormate(timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4)))
  itemData.value = TimeFormate(timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4))
}
// 双击绘制竖线
function drawVerticalLine(e) {
  svgSpeed.select('#verticalLine').remove()
  const event = e
  clearTimeout(clickTimeId)
  const clickTime = getRadarTimeByMouseEvent(event.offsetX)
  defaultVerticalXLeft = event.offsetX
  svgSpeed
    .insert('line', '.layer')
    .attr('id', 'verticalLine')
    .attr('x1', event.offsetX)
    .attr('y1', 50)
    .attr('x2', event.offsetX)
    .attr('y2', imageHeight + 50)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
  console.log(
    event.offsetX,
    event.offsetY,
    timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4)
  )
  console.log(image[imageAtCenter].imageLeft)
  console.log(event.offsetX - image[imageAtCenter].imageLeft - 4)
  console.log(TimeFormate(timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4)))
  itemData.value = TimeFormate(timeScale.invert(event.offsetX - image[imageAtCenter].imageLeft - 4))
}
function getRadarTimeByMouseEvent(x) {
  const image1X1 = image.image1.imageLeft
  const image1X2 = image.image1.imageLeft + imageWidth.value
  const image2X1 = image.image2.imageLeft
  const image2X2 = image.image2.imageLeft + imageWidth.value
  const image3X1 = image.image3.imageLeft
  const image3X2 = image.image3.imageLeft + imageWidth.value
  if (x >= image1X1 && x <= image1X2) {
    return radarTimeFormate(image.image1.timeScale.invert(x - image1X1))
  } else if (x > image2X1 && x <= image2X2) {
    return radarTimeFormate(image.image2.timeScale.invert(x - image2X1))
  } else if (x > image3X1 && x <= image3X2) {
    return radarTimeFormate(image.image3.timeScale.invert(x - image3X1))
  }
}
// 格式化根据像素计算出的时间
function radarTimeFormate(time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1 // 月份是从0开始的
  let day = time.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  if (min % 5 != 0) {
    //eslint-disable-line
    if (min % 5 <= 3) {
      min = min - (min % 5)
    } else {
      min = min + (5 - (min % 5))
    }
  }
  if (min === 60) {
    const addOneHourTime = new Date(time.getTime() + 1000 * 60 * 60)
    year = addOneHourTime.getFullYear()
    month = addOneHourTime.getMonth() + 1 // 月份是从0开始的
    day = addOneHourTime.getDate()
    hour = addOneHourTime.getHours()
    min = 0
  }
  min = min < 10 ? '0' + min : min
  const newTime =
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (day < 10 ? '0' + day : day) +
    ' ' +
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    min +
    ':00'
  return newTime
}
/********* 结束 **********************************************/

/********* X轴定义域 *****************************************/
// 格式化X轴时间
function localTimeFormate(time) {
  if (time.getHours() == 0) {
    //eslint-disable-line
    const month = time.getMonth() + 1 // 月份是从0开始的
    const day = time.getDate()
    const newTime = (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day)
    return newTime
  }
  const hour = time.getHours()
  const min = time.getMinutes()
  const newTime = (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min)
  return newTime
}
// 时间比例尺
image.image1.timeScale = d3
  .scaleTime()
  .domain([
    new Date(image.image1.time),
    new Date(moment(image.image1.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
  ])
  .range([0, 5880])
image.image2.timeScale = d3
  .scaleTime()
  .domain([
    new Date(image.image2.time),
    new Date(moment(image.image2.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
  ])
  .range([0, 5880])
// 点击时的时间比例尺
timeScale = d3
  .scaleTime()
  .domain([
    new Date(image.image2.time),
    new Date(moment(image.image2.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
  ])
  .range([0, 5880])
image.image3.timeScale = d3
  .scaleTime()
  .domain([
    new Date(image.image3.time),
    new Date(moment(image.image3.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
  ])
  .range([0, 5880])
console.log(image.image1.time, moment(image.image1.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
console.log(image.image2.time, moment(image.image2.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
console.log(image.image3.time, moment(image.image3.time).add(1, 'd').format('YYYY-MM-DD 00:00:00'))
// 定义时间轴
image.image1.axis = d3.axisBottom(image.image1.timeScale).tickFormat(localTimeFormate).ticks(24)
image.image2.axis = d3.axisBottom(image.image2.timeScale).tickFormat(localTimeFormate).ticks(24)
image.image3.axis = d3.axisBottom(image.image3.timeScale).tickFormat(localTimeFormate).ticks(24)
function createXAxis() {
  d3.select('#xAxis1')
    .append('g')
    .attr('class', 'wind_axis')
    .attr('transform', 'translate(0,' + (imageHeight + 51) + ')')
    .call(image.image1.axis)
  d3.select('#xAxis2')
    .append('g')
    .attr('class', 'wind_axis')
    .attr('transform', 'translate(0,' + (imageHeight + 51) + ')')
    .call(image.image2.axis)
  d3.select('#xAxis3')
    .append('g')
    .attr('class', 'wind_axis')
    .attr('transform', 'translate(0,' + (imageHeight + 51) + ')')
    .call(image.image3.axis)
}
/********* 结束 **********************************************/

onMounted(() => {
  createYAxis()
  createBar()
  createSpeed(svgSpeed, (svg) => {
    svgSpeed = svg
  })
  createXAxis()
})
</script>
<style scoped lang="scss">
.d3-demo-1 {
  .content-svg {
    width: 100%;
    border: 1px solid #599;
    display: flex;
  }
}
</style>
<style>
.wind_axis path,
.wind_axis line {
  fill: none;
  stroke: #000;
  stroke-width: 2;
  shape-rendering: crispEdges;
}
.wind_axis text {
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
}
.wind_level {
  fill: none;
  stroke: #000;
  stroke-width: 1;
}
.wind_levelCh {
  font-size: 11px;
}
.layer {
  border: 1px solid #000;
}
/* 标题 */
.wind_title {
  font-family: Arial, 微软雅黑;
  font-size: 22px;
  text-anchor: middle;
}
</style>
