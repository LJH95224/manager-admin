<!--
 * @Description: 主视图
 * @Author: Alfred
 * @Date: 2021-05-17 21:47:46
 * @LastEditTime: 2021-05-25 16:08:15
 * @FilePath: \manager-admin\src\layout\components\AppMain.vue
-->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component" >
        <!-- <p>缓存页面</p> -->
      </component>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive">
      <!-- <p>没有缓存的页面</p> -->
    </component>
  </router-view>
</template>
