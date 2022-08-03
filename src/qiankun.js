import { registerMicroApps, start } from 'qiankun'

const loader = (loading) => {
  console.log(loading)
}

registerMicroApps(
  [
    {
      name: 'qiankunVue',
      entry: 'http://localhost:8001',
      container: '#alf-mian-view',
      activeRule: '/micro-services/vue-app',
      loader,
      props: {
        name: '父传子的消息',
        age: 18
      }
    }
  ],
  {
    beforeLoad: () => console.log('加载前'),
    beforeMount: () => console.log('挂载前'),
    afterMount: () => console.log('加载完成'),
    beforeUnmount: () => console.log('卸载前')
  }
)

start({ sandbox: { experimentalStyleIsolation: true } })
// start()
