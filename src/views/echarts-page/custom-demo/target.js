import cloneDeep from 'lodash/cloneDeep'

const groupLen = 3
const options = {
  title: {
    text: 'Error bar chart'
  },
  legend: {
    data: ['bar', 'error']
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
    }
  },
  xAxis: {
    data: ['2022-06-01', '2022-06-02', '2022-06-03', '2022-06-04', '2022-06-05']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: 'bar',
      data: [961.49, 473.89, 416.54, 546.45, 393.17],
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
        console.log(1, api.value[0])
        // 每个柱子的宽度
        const halfWidth = api.size([1, 0])[0]
        // 每个柱子对应x轴的坐标，一般柱子宽度中间的x轴对应的数值
        const xValue = api.value(0)
        const groupList = []
        for (let i = 1; i < groupLen * 3 + 1; i += 3) {
          const highPoint = api.coord([xValue, api.value(i)])
          const lowPoint = api.coord([xValue, api.value(i + 1)])
          const centerPoint = api.coord([xValue, api.value(i + 2)])
          const obj = {
            x: highPoint[0],
            highY: highPoint[1],
            cy: centerPoint[1],
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
        y: [1, 2, 3, 4, 5, 6]
      },
      data: [
        [
          0, 863.3905824363, 1005.2463571213, 1013.1216757127, 905.7843991106, 1027.9297418325,
          1019.7912362744, 927.1223423353, 1035.0816155576, 964.8942359327
        ],
        [
          1, 399.2081077424, 494.070497705, 524.7493608591, 410.1591065515, 538.3854588036,
          478.7955023577, 415.0038330772, 508.2519441315, 494.8821086045
        ],
        [
          2, 381.5664690087, 447.4061230921, 477.3289312301, 416.5345379477, 423.4191770822,
          447.6057392808, 385.7611701005, 483.4765312704, 483.1254376222
        ],
        [
          3, 478.811695205, 551.9059628372, 558.366749661, 468.1160427069, 558.9689753206,
          618.804402782, 531.4437271665, 557.2316289869, 571.1953331304
        ],
        [
          4, 353.8755864378, 407.0913382588, 426.595455524, 376.220425142, 403.7076174832,
          427.4531222121, 363.8722179726, 423.9384061928, 415.7856201808
        ]
      ],
      z: 100
    }
  ]
}

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
  }

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
}
