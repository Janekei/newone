<template>
 <el-date-picker v-model="value" type="date" :placeholder="placeholder" :size="size" @change="onChange"
  value-format="YYYY-MM-DD" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDatePicker } from 'element-plus'

const emits: any = defineEmits(['onChange'])
defineProps({
 placeholder: {
  type: String,
  default: '请选择时间'
 },
 size: {
  type: String as any,
  default: 'default'
 }
})

const value = ref('')
const onChange = (value: any) => {
 emits('onChange', value)
}
</script>

<style scoped lang="less"></style>
