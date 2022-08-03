<!--
 * @Description: 
 * @Autor: Alfred
 * @Date: 2022-06-13 14:46:19
 * @FilePath: \main-project\src\views\antv-page\x6-demo-3\index.vue
-->
<template>
  <div class="x6-demo">
    <div class="text-2xl">AntV | X6 图编辑器 demo</div>
    <div class="canvas-box">
      <div id="container" ref="container" class="X6-canvas"></div>
    </div>
    <div>
      {{ x6NodeData }}
    </div>
    <div>
      {{ x6EdgeData }}
    </div>
  </div>
</template>

<script setup>
import { Graph, Shape } from '@antv/x6'
import '@antv/x6-vue-shape'
import cloneDeep from 'lodash/cloneDeep'
import { antvConfigStore } from '@/store/antv'
import { storeToRefs } from 'pinia'
import domNode1 from './components/node1/index.vue'
import domNode2 from './components/node2/index.vue'
import domNode3 from './components/node3/index.vue'

const { x6NodeData, x6EdgeData } = storeToRefs(antvConfigStore())
const graph = shallowRef('')
const dnd = shallowRef('')

const container = ref(null)

function initGraph() {
  graph.value = new Graph({
    container: container.value,
    background: {
      color: '#020f2f'
    },
    interacting: {
      nodeMovable: false
    },
    width: 1400,
    height: 1000
  })
  x6NodeData.value.forEach((value) => {
    console.log(value)
    const nodeOptions = {
      id: '',
      shape: 'vue-shape',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      component: '',
      ports: {
        groups: {
          group1: {
            attrs: {
              circle: {
                r: 0,
                magnet: true,
                stroke: '#31d0c6',
                strokeLinejoin: 'round',
                targetMarker: ''
              },
              strokeLinejoin: 'round',
              targetMarker: ''
            },
            position: {
              name: 'absolute'
            }
          }
        },
        items: []
      }
    }
    const x6Type = value.id.split('-')[0]
    if (x6Type === 'node1') {
      const node1Data = {
        id: value.id,
        x: value.x,
        y: value.y,
        width: 100,
        height: 100,
        component: domNode1
      }
      const node1Options = Object.assign(cloneDeep(nodeOptions), node1Data)
      node1Options.ports.items = [
        {
          id: 'port-top',
          group: 'group1',
          args: {
            x: 50,
            y: 0
          }
        },
        {
          id: 'port-left',
          group: 'group1',
          args: {
            x: 0,
            y: 50
          }
        },
        {
          id: 'port-bottom',
          group: 'group1',
          args: {
            x: 50,
            y: 100
          }
        },
        {
          id: 'port-right',
          group: 'group1',
          args: {
            x: 100,
            y: 50
          }
        }
      ]
      graph.value.addNode(node1Options)
    } else if (x6Type === 'node2') {
      const node2Data = {
        id: value.id,
        x: value.x,
        y: value.y,
        width: 100,
        height: 100,
        component: domNode2
      }
      const node2Options = Object.assign(cloneDeep(nodeOptions), node2Data)
      node2Options.ports.items = [
        {
          id: 'port-left',
          group: 'group1',
          args: {
            x: 0,
            y: 75
          }
        },
        {
          id: 'port-right',
          group: 'group1',
          args: {
            x: 100,
            y: 23
          }
        }
      ]
      graph.value.addNode(node2Options)
    } else if (x6Type === 'node3') {
      const node3Data = {
        id: value.id,
        x: value.x,
        y: value.y,
        width: 60,
        height: 60,
        component: domNode3
      }
      const node3Options = Object.assign(cloneDeep(nodeOptions), node3Data)
      node3Options.ports.items = [
        {
          id: 'port-top',
          group: 'group1',
          args: {
            x: 30,
            y: 0
          }
        },
        {
          id: 'port-left',
          group: 'group1',
          args: {
            x: 0,
            y: 30
          }
        },
        {
          id: 'port-bottom',
          group: 'group1',
          args: {
            x: 30,
            y: 60
          }
        },
        {
          id: 'port-right',
          group: 'group1',
          args: {
            x: 60,
            y: 30
          }
        }
      ]
      graph.value.addNode(node3Options)
    }
  })
  x6EdgeData.value.forEach((value) => {
    console.log(value, '==>>')
    graph.value.addEdge({
      id: value.id,
      shape: 'double-edge',
      source: value.source, // 源节点
      target: value.target, // 目标节点
      connector: { name: 'rounded' },
      attrs: {
        line: {
          stroke: '#032a48',
          strokeWidth: 14,
          connection: true,
          strokeLinejoin: 'round',
          targetMarker: '',
          strokeDasharray: 10, //虚线  值代表虚线的间隔
          // targetMarker: 'classic',
          style: {
            animation: 'ant-line 30s infinite linear'
          }
        },
        outline: {
          stroke: '#237804',
          strokeWidth: 18
        }
      },
      labels: [],
      router: {
        name: 'manhattan',
        args: {
          startDirections: [value.source.port.split('-')[1]],
          endDirections: [value.target.port.split('-')[1]]
        }
      }
    })
  })
}

onMounted(() => {
  initGraph()
})
watch(
  [x6NodeData, x6EdgeData],
  (newVal, oldVal) => {
    initGraph()
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.x6-demo {
  width: 100%;
  height: 100%;
  .canvas-box {
    width: 100%;
    height: calc(100% - 60px);
    .agent-canvas {
      background-color: #fff;
      width: 20%;
      height: 100%;
      display: inline-block;
      border: 5px solid #666;
      position: relative;
      .node1,
      .node2,
      .node3 {
        position: absolute;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .node1 {
        top: 30px;
        left: 30px;
      }
      .node2 {
        top: 30px;
        left: 160px;
      }
      .node3 {
        top: 160px;
        left: 30px;
      }
    }
    .X6-canvas {
      background-color: #6cc;
      width: 79%;
      height: 100%;
      display: inline-block;
      .node1,
      .node2,
      .node3 {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .text {
    color: #fff;
  }
  .node-box {
    .node1,
    .node2,
    .node3 {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<style>
@keyframes ant-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
