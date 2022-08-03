<!--
 * @Description: echarts 组件
 * @Autor: Alfred
 * @Date: 2022-06-09 16:48:27
 * @FilePath: /main-project/src/components/base-echarts/index.vue
-->
<template>
  <div :id="id" ref="echartsRef" class="echarts-container" :style="style"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, PropType } from 'vue'
import isEmpty from 'lodash/isEmpty'
import { brush } from 'd3-brush'

const props = defineProps({
  id: {
    type: String as PropType<string | undefined>,
    default: undefined
  },
  width: {
    type: String as PropType<string | undefined>,
    default: undefined
  },
  height: {
    type: String as PropType<string | undefined>,
    default: undefined
  },
  option: {
    type: Object as PropType<echarts.EChartsOption>,
    required: true
  },
  brushEnd: {
    type: Function as PropType<any>,
    default: null
  }
})
const echartsRef = ref<HTMLElement>()
const myChart = shallowRef<echarts.ECharts>()
let objResizeObserver: ResizeObserver | null = null
let timeOut: any = null

onMounted(() => {
  initEcharts()
  // window.addEventListener('resize', resizeFun)
  objResizeObserver = new ResizeObserver(() => {
    if (timeOut) {
      clearTimeout(timeOut)
      timeOut = null
    }
    timeOut = setTimeout(() => {
      resizeFun()
    }, 300)
  })
  if (echartsRef.value) {
    objResizeObserver.observe(echartsRef.value)
  }
})

onBeforeUnmount(() => {
  if (objResizeObserver && echartsRef.value) {
    objResizeObserver.unobserve(echartsRef.value)
  }
})

const style = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

watch(
  () => props.option,
  (newVal, oldVal) => {
    if (myChart.value) {
      if (isEmpty(newVal)) {
        myChart.value.clear()
      } else {
        myChart.value.setOption(newVal, true)
      }
      if (newVal?.brush) {
        chartBrushMode()
      }
    } else {
      initEcharts()
    }
  },
  {
    deep: true
  }
)

defineExpose({
  myChart: myChart.value
})

/**
 * @description: 初始化echarts
 * @return {*}
 */
function initEcharts() {
  if (!echartsRef.value || !props.option) {
    return
  }
  myChart.value = echarts.init(echartsRef.value)
  console.log(myChart)

  // 适用于大数据量的切换时图表绘制错误,先清空在重绘
  myChart.value.clear()

  // 设置为true可以是图表切换数据时重新渲染
  myChart.value.setOption(props.option, true)
  if (props.option?.brush) {
    chartBrushMode()
  }

  if (props.brushEnd) {
    myChart.value.on('brushEnd', props.brushEnd)
  }
}

function resizeFun() {
  // const width =
  myChart.value?.resize()
}

/**
 * @description: 刷选
 * @return {*}
 */
function chartBrushMode() {
  if (!myChart.value) {
    return
  }
  myChart.value.dispatchAction({
    type: 'takeGlobalCursor',
    // 如果想变为“可刷选状态”，必须设置。不设置则会关闭“可刷选状态”。
    key: 'brush',
    brushOption: {
      // 参见 brush 组件的 brushType。如果设置为 false 则关闭“可刷选状态”。
      // brushType: 'lineX'
      // 参见 brush 组件的 brushMode。如果不设置，则取 brush 组件的 brushMode 设置。
      // brushMode: String
    }
  })
}
</script>

<style scoped></style>
