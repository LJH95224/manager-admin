<!--
 * @Description: 自定义绘制内容
 * @Autor: Alfred
 * @Date: 2022-06-13 15:00:56
 * @FilePath: /main-project/src/views/map-page/misc-map/index.vue
-->
<template>
  <div id="container" ref="container" class="map-box"></div>
</template>

<script setup>
// import { onMounted, shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
const mymap = shallowRef(null)
const pointSimplifierIns = shallowRef(null)

onMounted(() => {
  initMap()
})

function initMap() {
  AMapLoader.load({
    key: '4c3405d64b542d04758985ed9b93f5a8', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0',
    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    AMapUI: {
      version: '1.1',
      plugins: []
    },
    plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    console.log(AMapUI)
    mymap.value = new AMap.Map('container', {
      center: [116.368324, 39.915085],
      zooms: [2, 20],
      zoom: 10
    })
    addPointSimplifier()
  })
}
const dataStr =
  '113.864691,22.942327,120.412618,36.382612,113.370643,22.938827,113.001181,23.120518,112.985037,23.15046,113.890205,22.798043,110.361899,20.026695,113.682288,34.618975,121.434529,31.215641,109.488707,18.309754,120.682502,28.011099,120.68556,30.912366,126.687123,45.787618,120.48506,30.053066,103.970724,30.397931,117.270073,37.96162,117.212164,31.831641,120.256218,31.882242,121.411101,31.059407,113.336586,33.729581'
function addPointSimplifier() {
  AMapUI.load(['ui/misc/PointSimplifier'], function (PointSimplifier) {
    if (!PointSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas！')
      return
    }
    console.log(PointSimplifier)
    pointSimplifierIns.value = new PointSimplifier({
      zIndex: 300,
      map: mymap.value,
      getPosition: function (dataItem) {
        //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
        return dataItem.position
      },
      compareDataItem: function (a, b, aIndex, bIndex) {
        if (aIndex === bIndex) {
          return 0
        }

        return aIndex > bIndex ? -1 : 1
      },
      getHoverTitle: function (dataItem, idx) {
        return '序号: ' + idx
      },
      renderOptions: {
        //点的样式
        pointStyle: {
          //绘制点占据的矩形区域
          content: function (ctx, x, y, width, height) {
            console.log(x, y, width, height)
            //注意，这里的width和height可能不同于pointStyle里面的width/height， 高清屏幕下会存在比例缩放

            //这里绘制一个圆顶锥形
            const yPos = 1 / 3
            ctx.moveTo(x, y) //移动到左上角

            ctx.lineTo(x + width, y) //连接到右上角

            ctx.lineTo(x + width, y + height) //连接到右下角

            ctx.lineTo(x, y + height) //连接到左下角

            ctx.lineTo(x, y) //连接到左上角
            // const top = [x + width / 2, y],
            //   right = [x + width, y + height * yPos],
            //   bottom = [x + width / 2, y + height],
            //   left = [x, y + height * yPos]

            // ctx.rect(x, y, width, width)
            // ctx.fillText('canvas', x, y)
            // ctx.font = '24px'
            // ctx.fillStyle = 'RGB(255, 0, 0)'

            // ctx.moveTo(left[0], left[1])
            // ctx.arcTo(top[0], top[1], right[0], right[1], width / 3)
            // ctx.lineTo(right[0], right[1])
            // ctx.lineTo(bottom[0], bottom[1])
            // ctx.lineTo(left[0], left[1])
            // console.log(top, right, bottom, left)
          },
          //宽度
          width: 25,
          //高度
          height: 25,
          offset: ['-50%', '-100%'],
          // fillStyle: '#00ff00',
          lineWidth: 1,
          strokeStyle: 'gray'
        },
        topNAreaStyle: {
          content: function (ctx, x, y, width, height) {
            //绘制一个连接矩形四边中点的菱形

            const top = [x + width / 2, y],
              right = [x + width, y + (height * 1) / 2],
              bottom = [x + width / 2, y + height],
              left = [x, y + (height * 1) / 2]

            ctx.moveTo(top[0], top[1])
            ctx.lineTo(right[0], right[1])
            ctx.lineTo(bottom[0], bottom[1])
            ctx.lineTo(left[0], left[1])
            ctx.lineTo(top[0], top[1])
          }
        },
        //鼠标hover时，绘制的叠加点的样式
        pointHoverStyle: {
          width: 10,
          height: 10,
          content: 'circle'
        },
        //鼠标hover时显示的title样式
        hoverTitleStyle: {
          classNames: 'my-hover-title',
          offset: [0, -15],
          position: 'top'
        }
      }
    })

    const data = createPoints(mymap.value.getCenter(), 100)
    console.log(mymap.value.getCenter())
    pointSimplifierIns.value.setData(data)
  })
}

function createPoints(center, num) {
  const data = []
  for (let i = 0, len = num; i < len; i++) {
    data.push({
      id: `序号---${i}`,
      position: [
        center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
        center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
      ]
    })
  }
  return data
}
</script>

<style lang="scss" scoped>
.map-box {
  width: 100%;
  height: 100%;
}
</style>
