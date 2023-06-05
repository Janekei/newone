<template>
 <ElAutocomplete v-model="curValue" :placeholder="placeholder" :fetch-suggestions="querySearchAsync" @select="onSelect"
  @change="onChange" clearable style="width: 100%" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElAutocomplete } from 'element-plus'
import request from '@/config/axios'

const emits: any = defineEmits(['onChange'])
const props = defineProps({
 placeholder: {
  type: String,
  default: '请输入'
 },
 requestOptions: {
  type: Object as any,
  default: null
 },
 modelValue: {
  type: [String, Number],
  default: ''
 }
})

let list: any = []

const curValue = ref()
watch(() => props.modelValue, () => {
 curValue.value = props.modelValue
}, { immediate: true })

const onSelect = (value: any) => {
 emits('update:modelValue', value['value'])
 emits('onChange')
}

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
 const { url, method, params = {}, handleOptions, searchKey } = props.requestOptions
 params[searchKey] = queryString
 request[method]({ url, params }).then((res: any) => {
  if (handleOptions) {
   handleOptions(res)
   list = handleOptions(res)
   cb(list)
  }
 })
}

const onChange = (value) => {
 if (!value) {
  emits('update:modelValue', '')
  emits('onChange')
 }
}
</script>

<style scoped lang="scss"></style>
