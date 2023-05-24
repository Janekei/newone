<template>
 <ElInput v-model="value" :placeholder="placeholder" @input="change" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
const emits: any = defineEmits(['onChange'])
defineProps({
 placeholder: {
  type: String,
  default: '请输入'
 }
})

const change = (value: any) => {
 emits('onChange', value)
}
const value = ref('')
</script>