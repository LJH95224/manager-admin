/*
 * @Description: vite 配置
 * @Autor: Alfred
 * @Date: 2022-06-08 10:18:53
 * @FilePath: /main-project/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        // enabled 设置为true之后，会自动生成 .eslintrc-auto-import.json
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: './auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({ mockPath: './src/mock', supportTs: true }),
    vueJsx({})
    // gzip压缩 生产环境生成 .gz 文件
    // viteCompression({
    //   verbose: true,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'gzip',
    //   ext: '.gz',
    // }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        // additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.scss')}";`
        additionalData: `
          $test-color: red;
          $primary-color: #266bff;
          $link-color: #266bff;
          $theme-color: #266bff;
          $font-theme-color: #266bff;
          $font-main-color: #000000;
          $font-sub-color: #2a2b34;
          $theme-opcity-background-color: rgba(255, 255, 255, 0.9);
        `
        // additionalData: `@import '~@/src/styles/variables.scss';`
      }
    }
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src')
  //   }
  // },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
      {
        find: '@antv/x6',
        replacement: '@antv/x6/dist/x6.js'
      },
      {
        find: '@antv/x6-vue-shape',
        replacement: '@antv/x6-vue-shape/lib'
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: false,
    https: false,
    proxy: {
      '/native-api': {
        target: 'http://10.5.16.7:19003',
        ws: true,
        changeOrigin: true
      },
      '/mock-api': {
        target: 'http://127.0.0.1:4523/mock/491634',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock-api/, '')
      }
    }
  }
  // 生产环境打包配置
  //去除 console debugger
  // build: {
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true
  //     }
  //   }
  // }
})
// resolve: {
//   alias: {
//     '@': path.resolve(__dirname, 'src')
//   },
//   alias: [
//     {
//       find: '@antv/x6',
//       replacement: '@antv/x6/lib'
//     },
//     {
//       find: '@antv/x6',
//       replacement: '@antv/x6/lib'
//     }
//   ]
// },
