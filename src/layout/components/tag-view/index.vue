<!--
 * @Description: 标签视图组件
 * @Autor: Alfred
 * @Date: 2022-05-19 10:46:43
 * @FilePath: /main-project/src/layout/components/tag-view/index.vue
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :active-class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      class="tags-view-item"
    >
      <span v-show="isActive(tag)" class="active-circle"></span>
      {{ tag.meta?.title }}
      <span
        v-if="!isAffix(tag)"
        class="close-icon adv-cross"
        @click.prevent.stop="closeSelectedTag(tag)"
      ></span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { routeConfigStore } from '@/store/route'
import { storeToRefs } from 'pinia'

export interface visitedViewsTypes extends Partial<RouteLocationNormalized> {
  title?: string
}

const router = useRouter()
const currentRoute = useRoute()

const routeConfig = routeConfigStore()
const visitedViews = routeConfig.visitedViews

const { queryedRouterData } = storeToRefs(routeConfig)

const toLastView = () => {
  const latestView = visitedViews.slice(-1)[0]
  const fullPath = latestView && latestView.fullPath ? latestView.fullPath : '/'
  router.push({ path: fullPath }).catch((err) => {
    console.warn(err)
  })
}

// 是否是激活状态
const isActive = (route: visitedViewsTypes) => {
  if (!route.path) {
    return false
  }
  // console.log(route.path, currentRoute.path, currentRoute.path.includes(route.path))
  return currentRoute.path.includes(route.path)
  // return route.path === currentRoute.path
}

// 是否是固定状态
const isAffix = (tag: visitedViewsTypes) => {
  return tag.meta && tag.meta.affix
}

// 是否关闭
const closeSelectedTag = (tag: visitedViewsTypes): void => {
  // console.log('删除操作', tag.name)
  routeConfig.removeView(tag)
  if (isActive(tag)) {
    toLastView()
  }
}

onBeforeMount(() => {
  initTags()
  addTags()
})

watch(
  () => currentRoute.name,
  () => {
    if (currentRoute.name !== 'Login') {
      addTags()
    }
  }
)
const addTags = (): void => {
  if (currentRoute.name) {
    routeConfig.addViews(currentRoute)
  }
}

const initTags = (): void => {
  const affixTags = filterAffixTags(queryedRouterData.value)
  for (const tag of affixTags) {
    if (tag.name) {
      routeConfig.addViews(tag)
    }
  }
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: visitedViewsTypes[] = []

  routes &&
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        let tagPath = ''
        if (route.path === '/' && basePath === '/') {
          tagPath = '/'
        } else if (basePath !== '/' && route.path !== '/') {
          tagPath = basePath + '/' + route.path
        } else if (basePath === '/' && route.path !== '/') {
          if (route.path.indexOf('/') === 0) {
            tagPath = route.path
          } else {
            tagPath = '/' + route.path
          }
        } else if (basePath !== '/' && route.path === '/') {
          tagPath = basePath
        }
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }

      if (route.children) {
        let tagPath = ''
        if (route.path === '/' && basePath === '/') {
          tagPath = '/'
        } else if (basePath !== '/' && route.path !== '/') {
          tagPath = basePath + '/' + route.path
        } else if (basePath === '/' && route.path !== '/') {
          if (route.path.indexOf('/') === 0) {
            tagPath = route.path
          } else {
            tagPath = '/' + route.path
          }
        } else if (basePath !== '/' && route.path === '/') {
          tagPath = basePath
        }
        const childTags = filterAffixTags(route.children, tagPath)
        if (childTags.length >= 1) {
          tags = tags.concat(childTags)
        }
      }
    })
  return tags
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 35px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 25px;
    border: 1px solid rgba(124, 141, 181, 0.3);
    border-radius: 1px;
    color: #495060;
    background: #fff;
    padding: 0 10px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    box-sizing: border-box;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background-color: #5ddab4;
      color: #fff;
    }
    .active-circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 8px;
      display: inline-block;
    }
    .close-icon {
      width: 14px;
      height: 14px;
      display: inline-block;
      position: relative;
      top: 1px;
      line-height: 15px;
      text-align: center;
      &:hover {
        border-radius: 50%;
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
