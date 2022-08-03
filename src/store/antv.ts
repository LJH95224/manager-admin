/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2022-06-16 09:13:33
 * @FilePath: \main-project\src\store\antv.ts
 */
import { defineStore } from 'pinia'

export const antvConfigStore = defineStore('antv', {
  state: () => ({
    x6NodeData: [
      { id: 'node1-1', x: 110, y: 180 },
      { id: 'node2-1', x: 770, y: 357 },
      { id: 'node1-68417', x: 110, y: 377 },
      { id: 'node1-72536', x: 110, y: 580 },
      { id: 'node3-42581', x: 460, y: 397 },
      { id: 'node1-14128', x: 1281, y: 297 }
    ],
    x6EdgeData: [
      {
        shape: 'edge',
        attrs: {
          lines: { connection: true, strokeLinejoin: 'round' },
          wrap: { strokeWidth: 10 },
          line: { stroke: '#032a48', strokeWidth: 4, targetMarker: 'classic' }
        },
        labels: [
          {
            markup: [
              { tagName: 'rect', selector: 'labelBody' },
              { tagName: 'text', selector: 'labelText' }
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
        id: 'd58dc6a7-c571-4146-ae10-a54b3b0a3ce4',
        source: { cell: 'node1-1', port: 'port-right' },
        target: { cell: 'node3-42581', port: 'port-top' },
        zIndex: 7
      },
      {
        shape: 'edge',
        attrs: {
          lines: { connection: true, strokeLinejoin: 'round' },
          wrap: { strokeWidth: 10 },
          line: { stroke: '#032a48', strokeWidth: 4, targetMarker: 'classic' }
        },
        labels: [
          {
            markup: [
              { tagName: 'rect', selector: 'labelBody' },
              { tagName: 'text', selector: 'labelText' }
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
        id: '0c9074de-0415-427f-baa4-d76745a2ad52',
        source: { cell: 'node1-68417', port: 'port-right' },
        target: { cell: 'node3-42581', port: 'port-left' },
        zIndex: 8
      },
      {
        shape: 'edge',
        attrs: {
          lines: { connection: true, strokeLinejoin: 'round' },
          wrap: { strokeWidth: 10 },
          line: { stroke: '#032a48', strokeWidth: 4, targetMarker: 'classic' }
        },
        labels: [
          {
            markup: [
              { tagName: 'rect', selector: 'labelBody' },
              { tagName: 'text', selector: 'labelText' }
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
        id: '71452d4c-8585-40fb-811f-2ddb4d6bd772',
        source: { cell: 'node1-72536', port: 'port-right' },
        target: { cell: 'node3-42581', port: 'port-bottom' },
        zIndex: 9
      },
      {
        shape: 'edge',
        attrs: {
          lines: { connection: true, strokeLinejoin: 'round' },
          wrap: { strokeWidth: 10 },
          line: { stroke: '#032a48', strokeWidth: 4, targetMarker: 'classic' }
        },
        labels: [
          {
            markup: [
              { tagName: 'rect', selector: 'labelBody' },
              { tagName: 'text', selector: 'labelText' }
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
        id: '3282730a-7a6d-4c3a-87b2-f3c38e0dd4da',
        source: { cell: 'node3-42581', port: 'port-right' },
        target: { cell: 'node2-1', port: 'port-left' },
        zIndex: 10
      },
      {
        shape: 'edge',
        attrs: {
          lines: { connection: true, strokeLinejoin: 'round' },
          wrap: { strokeWidth: 10 },
          line: { stroke: '#032a48', strokeWidth: 4, targetMarker: 'classic' }
        },
        labels: [
          {
            markup: [
              { tagName: 'rect', selector: 'labelBody' },
              { tagName: 'text', selector: 'labelText' }
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
        id: '8fcf87d5-a81c-48d1-93a9-ddffd8ece373',
        source: { cell: 'node2-1', port: 'port-right' },
        target: { cell: 'node1-14128', port: 'port-left' },
        zIndex: 12
      }
    ]
  }),
  actions: {}
})
