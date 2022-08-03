<!--
 * @Description: input组件
 * @Autor: Alfred
 * @Date: 2022-06-21 15:56:50
 * @FilePath: /main-project/src/components/form-list/components/input-box.vue
-->
<template>
  <div class="custom-input">
    <el-input v-model="modelValue" />
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true
  }
})
const modelValue = computed({
  get() {
    console.log(this.value)
    return this.value
  },
  set(value) {
    this.$emit('update:modelValue', value)
  }
})
</script>

<style scoped></style>
