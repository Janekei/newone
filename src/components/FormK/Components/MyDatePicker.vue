<template>
  <ElDatePicker v-model="curValue" :type="type" :placeholder="placeholder" :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder" :size="size" @change="onChange" value-format="YYYY-MM-DD" style="width: 100%" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'

const emits: any = defineEmits(['onChange'])
const props = defineProps({
  type: {
    type: String as any,
    default: 'date'
  },
  placeholder: {
    type: String,
    default: '请选择时间'
  },
  startPlaceholder: {
    type: String,
    default: '请选择时间'
  },
  endPlaceholder: {
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
