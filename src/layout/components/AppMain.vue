<!--
 * @Description: 主视图
 * @Author: Alfred
 * @Date: 2021-05-17 21:47:46
 * @LastEditTime: 2021-06-01 11:41:44
 * @FilePath: \manager-admin\src\layout\components\AppMain.vue
-->
<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <keep-alive v-if="!route.meta.noCache">
        <component :is="Component"><!-- <p>缓存的页面</p> --></component>
      </keep-alive>
      <component :is="Component" v-else>
        <!-- <p>没有缓存的页面</p> -->
      </component>
    </transition>
  </router-view>
</template>
