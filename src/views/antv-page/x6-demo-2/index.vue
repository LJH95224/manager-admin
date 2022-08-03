<!--
 * @Description: 
 * @Autor: Alfred
 * @Date: 2022-06-13 14:46:19
 * @FilePath: \main-project\src\views\antv-page\x6-demo-2\index.vue
-->
<template>
  <div class="x6-demo">
    <div class="text-2xl">AntV | X6 图编辑器 demo</div>
    <div class="canvas-box">
      <div id="agentCanvas" ref="agentCanvas" class="agent-canvas">
        <div class="node1" data-type="node1" @mousedown="show($event)">
          <img src="@/assets/img/img1.png" />
        </div>
        <div class="node2" data-type="node2" @mousedown="show($event)">
          <img src="@/assets/img/img2.png" />
        </div>
        <div class="node3" data-type="node3" @mousedown="show($event)">
          <img src="@/assets/img/img3.png" />
        </div>
      </div>
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
import { Graph, Addon, Shape } from '@antv/x6'
import '@antv/x6-vue-shape'
import { antvConfigStore } from '@/store/antv'
import { storeToRefs } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import domNode1 from './components/node1/index.vue'
import domNode2 from './components/node2/index.vue'
import domNode3 from './components/node3/index.vue'
const { x6NodeData, x6EdgeData } = storeToRefs(antvConfigStore())
console.log(x6NodeData, x6EdgeData)
const graph = shallowRef('')
const dnd = shallowRef('')
const container = ref(null)
function show(e) {
  const target = e.currentTarget
  const type = target.getAttribute('data-type')
  const node =
    type === 'node1'
      ? this.graph.createNode({
          id: 'node1',
          shape: 'vue-shape',
          x: 200,
          y: 150,
          width: 100,
          height: 100,
          component: domNode1,
          ports: {
            groups: {
              group1: {
                attrs: {
                  circle: {
                    r: 10,
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
            items: [
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
          }
        })
      : type === 'node2'
      ? this.graph.createNode({
          id: 'node2',
          shape: 'vue-shape',
          width: 100,
          height: 100,
          component: domNode2,
          ports: {
            groups: {
              group1: {
                attrs: {
                  circle: {
                    r: 10,
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
            items: [
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
          }
        })
      : this.graph.createNode({
          id: 'node3',
          shape: 'vue-shape',
          x: 600,
          y: 150,
          width: 60,
          height: 60,
          component: domNode3,
          ports: {
            groups: {
              group1: {
                attrs: {
                  circle: {
                    r: 10,
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
            items: [
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
          }
        })
  console.log(node, e)
  dnd.value.start(node, e)
}
Shape.Edge.config({
  // router: {
  //   name: 'manhattan',
  //   args: {
  //     startDirections: ['bottom'],
  //     endDirections: ['left']
  //   }
  // },
  labels: [
    {
      markup: [
        {
          tagName: 'rect',
          selector: 'labelBody'
        },
        {
          tagName: 'text',
          selector: 'labelText'
        }
      ],
      attrs: {
        labelText: {
          text: '×',
          fill: '#ffa940',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle'
        },
        labelBody: {
          ref: 'labelText',
          refX: -5,
          refY: 0,
          rx: 10,
          ry: 10,
          refWidth2: 10,
          refHeight2: 2,
          stroke: '#ffa940',
          fill: '#fff',
          strokeWidth: 2,
          cursor: 'pointer',
          event: 'edge:delete'
        }
      }
    }
  ],
  attrs: {
    line: {
      stroke: '#032a48',
      strokeWidth: 4
      // connection: true,
      // strokeLinejoin: 'round',
      // targetMarker: ''
    }
  }
})
function initGraph() {
  graph.value = new Graph({
    container: container.value,
    background: {
      color: '#020f2f'
    },
    snapline: true,
    connecting: {
      // 是否允许连接到画布空白位置的点，默认为 true。
      allowBlank: false,
      // 是否允许在相同的起始节点和终止之间创建多条边，默认为 true。
      allowMulti: false,
      // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true
      allowLoop: false,
      // 是否允许边链接到节点（非节点上的链接桩），默认为 true
      allowNode: false,
      // 拖动边时，是否高亮显示所有可用的连接桩或节点，默认值为 false。
      highlight: true
    }
    // scroller: true
    // grid: true
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
                r: 10,
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
    console.log(value)
    graph.value.addEdge({
      id: value.id,
      source: value.source, // 源节点
      target: value.target // 目标节点
    })
  })
  const options = {
    target: graph.value,
    scaled: false,
    animation: true,
    validateNode(droppingNode, options) {
      console.log(droppingNode, options, '==>')
      return true
    },
    getDragNode: (node) => node.clone({ keepId: true }),
    getDropNode(node) {
      const nodeType = node.id
      const cloneNode = node.clone({ keepId: true })
      function createId() {
        function randomId() {
          return nodeType + '-' + Math.ceil(Math.random() * 100000)
        }
        function setId() {
          const id = randomId()
          return x6NodeData.value.findIndex((value) => value.id === id) >= 0 ? setId() : id
        }
        return setId()
      }
      cloneNode.id = createId()
      return cloneNode
    }
  }
  dnd.value = new Addon.Dnd(options)
  /**
   * @description: 监控节点发生位置变化时触发
   * @return {*}
   */
  graph.value.on('node:moved', ({ e, zx, zy, node, view }) => {
    console.log('之前的元素')
    const { x, y } = node.position()
    console.log(e)
    console.log(x, 'x')
    console.log(y, 'y')
    console.log(node.id, 'id')
    console.log(node)
    console.log(view)
    const index = x6NodeData.value.findIndex((value) => {
      return value.id === node.id
    })
    if (index >= 0) {
      x6NodeData.value[index] = {
        id: node.id,
        x: x,
        y: y
      }
    }
  })
  /**
   * @description: 删除node节点
   * @return {*}
   */
  graph.value.on('node:delete', ({ view, e }) => {
    console.log(view, e)
    e.stopPropagation()
    view.cell.remove()
  })
  /**
   * @description: 删除（边/连接线）
   * @return {*}
   */
  graph.value.on('edge:delete', ({ view, e }) => {
    console.log(view, e)
    e.stopPropagation()
    view.cell.remove()
  })
  /**
   * @description: 监控新增节点时触发
   * @return {*}
   */
  graph.value.on('node:added', ({ node }) => {
    const { x, y } = node.position()
    console.log('新加入的元素')
    console.log(node, 'id')
    console.log(node.id, 'id')
    console.log(x, 'x')
    console.log(y, 'y')
    x6NodeData.value.push({
      id: node.id,
      x: x,
      y: y
    })
  })
  /**
   * @description: 监控删除节点时触发
   * @return {*}
   */
  graph.value.on('node:removed', ({ node }) => {
    console.log('删除节点的元素')
    console.log(node.id, 'id')
    const index = x6NodeData.value.findIndex((value) => {
      return value.id === node.id
    })
    if (index >= 0) {
      x6NodeData.value.splice(index, 1)
    }
  })
  /**
   * @description: 监控删除(边/连接线)
   * @return {*}
   */
  graph.value.on('edge:removed', ({ edge, options }) => {
    console.log('删除 (边/连接线)')
    const index = x6EdgeData.value.findIndex((value) => {
      return value.id === edge.store.data.id
    })
    if (index >= 0) {
      x6EdgeData.value.splice(index, 1)
    }
  })
  /**
   * @description: 监控(边/连接线)发生变化
   * @return {*}
   */
  graph.value.on('edge:connected', ({ isNew, edge }) => {
    console.log('(边/连接线)连接上节点时触发')
    x6EdgeData.value.push({
      ...edge.store.data
    })
  })
}

onMounted(() => {
  initGraph()
})
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
        width: 60px;
        height: 60px;
        top: 50px;
        left: 310px;
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
      .node3 {
        width: 60px;
        height: 60px;
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
    .node3 {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
