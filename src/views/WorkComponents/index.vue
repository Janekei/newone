<template>
 <div class="form-box">
  {{ formData }}
  <FormK :formOption="formOption" v-model:formState="formData" labelWidth="5rem" ref="formK" />
 </div>
 <ElButton @click="submit">提交</ElButton>
 <ElButton @click="reset">重置</ElButton>
 <hr />
 <TableK url="/table/list" method="get" :params="formData" ref="myTable" :firstPages="20" :tableOption="tableOption">
  <template #buttons="{ selectRow }">
   <span>{{ selectRow.length }}</span>
  </template>
  <template #date="{ row }">
   <span style="color: red">{{ row.row.date }}</span>
  </template>
 </TableK>
 <ElButton @click="refresh">刷新列表</ElButton>
</template>
 
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import FormK from '@/components/FormK/index.vue'
import TableK from '@/components/TableK/index.vue'

const formOption = reactive([
 {
  type: 'input',
  field: 'code',
  placeholder: '请输入码值',
  label: '码值',
  rules: [
   { required: true, message: '请输入码值', trigger: 'change' }
  ]
 },
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
  ],
  rules: [
   { required: true, message: '请选择区域', trigger: 'blur' }
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
  },
  rules: [
   { required: true, message: '请选择仓库', trigger: 'blur' }
  ]
 },
 {
  type: 'date',
  field: 'time',
  placeholder: '请选择时间',
  label: '时间',
  rules: [
   { required: true, message: '请选择时间', trigger: 'blur' }
  ]
 },
 {
  type: 'autocomplete',
  field: 'entName',
  placeholder: '请输入企业名称',
  label: '企业名称',
  requestOptions: {
   url: '/entname/list',
   method: 'get',
   params: {},
   searchKey: 'searchKey',
   handleOptions: (res: any) => {
    return res.data.map((item: any) => {
     return {
      value: item.label
     }
    })
   }
  },
  rules: [
   { required: true, message: '请输入企业名称', trigger: 'blur' }
  ]
 },
])

const formData = ref({
 code: 123,
 region: 1,
 time: '2023-05-25',
 entName: 'vue'
})

const formK = ref()
const submit = () => {
 formK.value.validate((valid, fields) => {
  console.log(valid, fields, 105);
 })
}
const reset = () => {
 formK.value.resetFields()
}

const myTable = ref()
const refresh = () => {
 myTable.value.refresh()
}

const tableOption = reactive([
 {
  prop: 'date',
  label: '时间',
  width: '180',
  slotName: 'date'
 },
 {
  prop: 'name',
  label: '名称',
  width: '180'
 },
 {
  prop: 'address',
  label: '地址'
 }
])
</script>

<style scoped lang="scss">
.form-box {
 width: 70%;
 background-color: #fff;
}
</style>
