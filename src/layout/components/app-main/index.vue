<!--
 * @Description: 主视图
 * @Autor: Alfred
 * @Date: 2022-03-28 14:40:46
 * @FilePath: /v3Demo/src/layout/components/app-main/index.vue
-->
<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition || 'fade'">
      <!-- <keep-alive :max="10">
        <component :is="Component" />
      </keep-alive> -->
      <keep-alive v-if="route.meta && route.meta.keepAlive">
        <component :is="Component"><!-- <p>缓存的页面</p> --></component>
      </keep-alive>
      <component :is="Component" v-else>
        <!-- <p>没有缓存的页面</p> -->
      </component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
// Component inside <Transition> renders non-element root node that cannot be a
</script>
