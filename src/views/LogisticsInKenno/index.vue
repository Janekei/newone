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
  type: 'select',
  field: 'region',
  placeholder: '请选择区域',
  label: '区域',
  options: [
   { label: '全部', value: 0 },
   { label: '北美', value: 1 },
   { label: '南亚', value: 2 },
   { label: '越南', value: 3 },
   { label: '欧洲', value: 4 }
  ]
 },
 {
  type: 'select',
  field: 'warehouse',
  placeholder: '请选择仓库',
  label: '仓库',
  requestOptions: {
   url: '/warehouse/list',
   method: 'get',
   params: {},
   handleOptions: (res: any) => {
    return res.data.map((item: any) => {
     return {
      label: item.name,
      value: item.code
     }
    })
   }
  }
 },
 {
  type: 'date',
  field: 'time',
  placeholder: '请选择时间',
  label: '时间'
 },
])

const formData = ref({
 userName: '张三'
})

const onClick = () => {
 formData.value.userName = formData.value.userName += '!'
}
</script>

<style scoped lang="less"></style>
