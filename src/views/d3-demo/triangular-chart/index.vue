<!--
 * @Description: 三角坐标统计图
 * @Autor: Alfred
 * @Date: 2022-06-15 15:10:50
 * @FilePath: /main-project/src/views/d3-demo/triangular-chart/index.vue
-->
<template>
  <div class="triangular-chart">
    <h2>D3-demo</h2>
    <div ref="chart1" class="chart-demo1 border-2 border-red-500"></div>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
const chart1 = ref(null)

let d3Svg
const width = 550,
  height = 550,
  margin = 50

onMounted(() => {
  initChart1()
})

const chartsData = [
  {
    targetX: 0.5,
    targetY: 0.3,
    targetZ: 0.2
  },
  {
    targetX: 0.3,
    targetY: 0.2,
    targetZ: 0.5
  },
  {
    targetX: 0.9,
    targetY: 0.05,
    targetZ: 0.05
  }
]

const initChart1 = () => {
  // 初始化demo1
  // eslint-disable-next-line prettier/prettier
  d3Svg = d3
    .select(chart1.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'svg')

  drawX(d3Svg)
  drawY(d3Svg)
  drawY2(d3Svg)
  addD3Data(d3Svg, chartsData)
  addTooltip(d3Svg)
  // drawGrid(d3Svg)
}
//创建线性比例尺，使用坐标轴必备
const xScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, width - margin * 2])

const drawX = (svg) => {
  //创建底部的x的坐标轴
  const xAxis = d3.axisBottom(xScale)
  //使坐标轴插入svg中
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', function () {
      //让平移到底部x对的位置，咱们还要绘制y轴呢
      return `translate(${margin}, ${height - margin})`
    })
    .call(xAxis)
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('stroke-opacity', (d) => (d === 1 ? 0 : 0.1))
        .attr('transform', (d) => {
          if (d <= 0.3) {
            return `matrix(
              ${triangularCom('cos', 299)},
              ${triangularCom('sin', 299)},
              ${-triangularCom('sin', 299)},
              ${triangularCom('cos', 299)}, 0, 0)`
          } else if (d === 0.4 || d === 0.5) {
            return `matrix(
              ${triangularCom('cos', 298.5)},
              ${triangularCom('sin', 298.5)},
              ${-triangularCom('sin', 298.5)},
              ${triangularCom('cos', 298.5)}, 0, 0)`
          } else if (d === 0.6) {
            return `matrix(
              ${triangularCom('cos', 298)},
              ${triangularCom('sin', 298)},
              ${-triangularCom('sin', 298)},
              ${triangularCom('cos', 298)}, 0, 0)`
          } else if (d === 0.7) {
            return `matrix(
              ${triangularCom('cos', 297.5)},
              ${triangularCom('sin', 297.5)},
              ${-triangularCom('sin', 297.5)},
              ${triangularCom('cos', 297.5)}, 0, 0)`
          } else if (d === 0.8) {
            return `matrix(
              ${triangularCom('cos', 296.5)},
              ${triangularCom('sin', 296.5)},
              ${-triangularCom('sin', 296.5)},
              ${triangularCom('cos', 296.5)}, 0, 0)`
          } else if (d === 0.9) {
            return `matrix(
              ${triangularCom('cos', 293)},
              ${triangularCom('sin', 293)},
              ${-triangularCom('sin', 293)},
              ${triangularCom('cos', 293)}, 0, 0)`
          }
        })
        .attr('x2', (d) => {
          if (d === 0 || d === 1) {
            return 0
          }
          const length = (1 - d) * (width - margin)
          if (d === 0.1) {
            return -triangularCom('sin', 298) * length
          } else if (d === 0.2 || d === 0.3 || d === 0.4) {
            return -triangularCom('sin', 298) * length
          }
          return -triangularCom('sin', 299) * length
        })
    )
}
//创建线性比例尺，使用坐标轴必备
const yScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, width - margin * 2])
const drawY = (svg) => {
  //创建底部的x的坐标轴
  const yAxis = d3.axisLeft(yScale)

  const x = triangularCom('cos', 60) * (width - margin * 2).toFixed(3)
  const y = triangularCom('sin', 60) * (width - margin * 2).toFixed(3)

  //使坐标轴插入svg中
  svg
    .append('g')
    .attr('class', 'y-axis')
    .attr('transform', function () {
      //让平移到底部x对的位置，咱们还要绘制y轴呢
      // return `translate(${margin}, ${margin})`
      return `matrix(
        ${triangularCom('cos', 30)},
        ${triangularCom('sin', 30)},
        ${-triangularCom('sin', 30)},
        ${triangularCom('cos', 30)}, ${margin + x}, ${height - margin - y})`
    })
    .call(yAxis)
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('stroke-opacity', (d) => (d === 1 ? 0 : 0.1))
        .attr('transform', (d) => {
          return `matrix(
            ${triangularCom('cos', 30)},
            ${triangularCom('sin', 30)},
            ${-triangularCom('sin', 30)},
            ${triangularCom('cos', 30)}, 0, 0)`
        })
        .attr('x2', (d) => {
          if (d === 0 || d === 1) {
            return 0
          }
          const length = (1 - d) * (width - margin * 2)
          return triangularCom('cos', 60) * length * 2
        })
    )
}

const drawY2 = (svg) => {
  //创建线性比例尺，使用坐标轴必备
  const yScale2 = d3
    .scaleLinear()
    .domain([1, 0])
    .range([0, width - margin * 2])

  //创建底部的x的坐标轴
  const yrAxis = d3.axisRight(yScale2)

  const x = triangularCom('cos', 60) * (width - margin * 2).toFixed(3)
  const y = triangularCom('sin', 60) * (width - margin * 2).toFixed(3)

  //使坐标轴插入svg中
  svg
    .append('g')
    .attr('class', 'y-axis')
    .attr('transform', function () {
      //让平移到底部x对的位置，咱们还要绘制y轴呢
      // return `translate(${margin}, ${margin})`
      return `matrix(
        ${triangularCom('cos', 330)},
        ${triangularCom('sin', 330)},
        ${-triangularCom('sin', 330)},
        ${triangularCom('cos', 330)}, ${width - margin - x}, ${height - margin - y})`
    })
    .call(yrAxis)
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('stroke-opacity', (d) => (d === 1 ? 0 : 0.1))
        .attr('transform', (d) => {
          return `matrix(
            ${triangularCom('cos', 210)},
            ${triangularCom('sin', 210)},
            ${-triangularCom('sin', 210)},
            ${triangularCom('cos', 210)}, 0, 0)`
        })
        .attr('x2', (d) => {
          if (d === 0 || d === 1) {
            return 0
          }
          const length = (1 - d) * (width - margin * 2)
          return -triangularCom('sin', 210) * length * 2
        })
    )
}

const addD3Data = (svg, baseData) => {
  // 斜率1
  const k = triangularCom('tan', 60)
  const k2 = triangularCom('tan', 120)
  baseData.forEach((item) => {
    const tmpData = intersectionCom(k, k2, { x: item.targetX, y: 0 }, { x: 1 - item.targetY, y: 0 })
    item.x = tmpData.x
    item.y = 1 - tmpData.y
  })
  svg
    .append('g')
    .selectAll()
    .data(baseData)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .style('cursor', 'pointer')
    .attr('cx', (d) => margin + xScale(d.x))
    .attr('cy', (d) => margin + yScale(d.y))
    .attr('r', 0)
    .attr('fill', '#FBBC05')
    .attr('stroke', 'rgba(56, 8, 228, .5)')
    .transition()
    .duration(300)
    .attr('r', 4)
}

const addTooltip = (svg) => {
  const tooltips = d3
    .select('body')
    .append('div')
    // .style('width', '130px')
    // .style('height', '20px')
    .style('background-color', 'rgba(0,0,0,.6)')
    .style('color', 'rgba(255, 255, 255)')
    .style('dispaly', 'flex')
    .style('justify-content', 'center')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('opacity', 0)
  d3.selectAll('.point')
    .on('mouseenter', (e, g) => {
      console.log(e, g, '鼠标炫富')
      tooltips
        .html(
          `X：${g.targetX * 100 + '%'} <br/>
          Y：${g.targetY * 100 + '%'} <br/>
          Z：${g.targetZ * 100 + '%'}`
        )
        .style('position', 'absolute')
        .style('left', `${e.clientX}px`)
        .style('top', `${e.clientY}px`)
        .style('opacity', 1)
    })
    .on('mouseleave', (e, g) => {
      tooltips.style('opacity', 0).style('left', `0px`).style('top', `0px`)
    })
}

const mathAngle = (num) => {
  return ((2 * Math.PI) / 360) * num
}
// 计算三角函数角度
const triangularCom = (type, angle) => {
  if (type === 'sin') {
    return Math.sin(mathAngle(angle)).toFixed(3)
  } else if (type === 'cos') {
    return Math.cos(mathAngle(angle)).toFixed(3)
  } else if (type === 'tan') {
    return Math.tan(mathAngle(angle)).toFixed(3)
  }
}

// 获取两个线的交点
const intersectionCom = (k1, k2, pointA, pointB) => {
  const a = -k1 * pointA.x
  const b = -k2 * pointB.x
  const x = (b - a) / (k1 - k2)
  const y = k1 * x + a
  return { x, y }
}
</script>

<style scoped lang="scss">
.triangular-chart {
  width: 100%;
  height: 100%;
  .chart-demo1 {
    width: 100%;
    height: 600px;
  }
}
</style>
