<!--
 * @Author: 刘承广 chengguang_liu@cas-pe.com
 * @Date: 2022-06-09 11:12:27
 * @LastEditors: 刘承广 chengguang_liu@cas-pe.com
 * @LastEditTime: 2022-06-14 18:39:34
 * @FilePath: \main-project\src\views\antv-page\x6-demo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="x6-demo">
    <div class="text-2xl">AntV | X6 图编辑器 demo</div>
    <div id="container" ref="container" class="h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
const container = ref(undefined)
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello' // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world' // String，节点标签
    }
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2' // String，必须，目标节点 id
    }
  ]
}

function initGraph() {
  const graph = new Graph({
    container: container.value,
    width: 800,
    height: 600,
    background: {
      color: '#020f2f'
    }
  })
  graph.fromJSON(data)
}

onMounted(() => {
  initGraph()
})
</script>

<style scoped lang="scss">
.x6-demo {
  width: 100%;
  height: 100%;
  .container {
    background-color: red;
  }
}
</style>
