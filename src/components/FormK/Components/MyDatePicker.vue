<template>
 <ElDatePicker v-model="curValue" type="date" :placeholder="placeholder" :size="size" @change="onChange"
  value-format="YYYY-MM-DD" style="width: 100%" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'

const emits: any = defineEmits(['onChange'])
const props = defineProps({
 placeholder: {
  type: String,
  default: '请选择时间'
 },
 size: {
  type: String as any,
  default: 'default'
 },
 modelValue: {
  type: [String, Number],
  default: ''
 }
})

const curValue = ref()
watch(() => props.modelValue, () => {
 curValue.value = props.modelValue
}, { immediate: true })

const onChange = (value: any) => {
 emits('update:modelValue', value)
 emits('onChange', value)
}
</script>

<style scoped lang="scss"></style>
