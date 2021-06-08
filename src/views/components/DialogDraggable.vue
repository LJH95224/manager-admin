<!--
 * @Description: 可拖拽的对话框
 * @Autor: Alfred
 * @Date: 2021-06-08 15:05:42
 * @LastEditTime: 2021-06-08 15:20:02
 * @FilePath: \manager-admin\src\views\components\DialogDraggable.vue
-->
<template>
  <el-button type="primary" @click="handleClick">打开弹框</el-button>
  <el-dialog
    title="提示"
    v-model="centerDialogVisible"
    width="30%"
    destroy-on-close
    center>
    <span>需要注意在 Dialog 打开前是这条内容和下面的内容都是不会被渲染的</span>
    <strong>额外的内容</strong>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const centerDialogVisible = ref(false)
    function handleClick() {
      centerDialogVisible.value = true
    }
    function handleClose() {
      centerDialogVisible.value = false
    }

    return {
      handleClick,
      handleClose,
      centerDialogVisible
    }
  }
})
</script>

<style scoped>

</style>
