<template>
 <div>
  {{ formData }}
  <FormK :formOption="formOption" v-model:formState="formData" />
  <button @click="onClick">点击修改名称</button>
 </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'

const formOption = reactive([
 {
  type: 'input',
  field: 'userName',
  placeholder: '请输入名称',
  label: '用户名称'
 }
])

const formData = ref({
 userName: '张三'
})

const onClick = () => {
 formData.value.userName = formData.value.userName += '!'
}
</script>

<style scoped lang="less"></style>
