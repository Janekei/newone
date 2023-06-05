<template>
 <div class="flex-box-form">
  <div class="form-title-color filter">筛选</div>
  <div>
   <FormK :formOption="formOption" v-model:formState="formData" :marginBottom="false" />
  </div>
 </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="scss">
.flex-box-form {
 display: flex;
 align-items: center;
 background-color: #d3e4ee;
 padding: .375rem .75rem;
 font-size: 1rem;
}

.filter {
 margin-right: 1rem;
}
</style>
