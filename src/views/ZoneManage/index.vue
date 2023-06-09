<template>
 区域管理

 <div>
  <TableK url="/jinkotms/baseWharea/page" method="get" :params="formData" ref="myTable" :tableOption="tableOption"
   :showExpand="true">
   <template #expand="{ expandRow }">
    {{ expandRow }}
   </template>
   <template #buttons>
    <div class="form-box">
     {{ formData }}
     <FormK :formOption="formOption" v-model:formState="formData" labelWidth="5rem" ref="formK" />
    </div>
    <div class="btn-box">
     <ElButton @click="addZoneListItem(formData)">增加</ElButton>
     <ElButton @click="deleteZoneListItem()">删除</ElButton>
     <ElButton @click="updateZoneListItem(formData)">修改</ElButton>
     <Search :schema="schema" />
    </div>
   </template>
  </TableK>

 </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { Search } from '@/components/Search'
import FormK from '@/components/FormK/index.vue'
import { FormSchema } from '@/types/form'
import * as ZoneManageApi from '@/api/zonemanage'
import TableK from '@/components/TableK/index.vue'


// 表单内容区域
const formOption = reactive([
 {
  type: 'input',
  field: 'id',
  placeholder: '请输入ID',
  label: 'ID',
  rules: [
   { required: true, message: '请输入ID', trigger: 'change' }
  ]
 },
 {
  type: 'input',
  field: 'code',
  placeholder: '请输入编码',
  label: '编码',
  rules: [
   { required: true, message: '请输入ID', trigger: 'change' }
  ]
 },
 {
  type: 'input',
  field: 'name',
  placeholder: '请输入名称',
  label: '名称',
  rules: [
   { required: true, message: '请输入ID', trigger: 'change' }
  ]
 }
])

let formData = ref({
 id: null,
 code: '',
 name: ''
})

// 刷新表格内容
const refresh = () => {
 myTable.value.refresh()
 // 清空输入框数据
 formData = ref({
  id: null,
  code: '',
  name: ''
 })
}



// 表格区域
const myTable = ref()

const tableOption = reactive([
 {
  prop: 'id',
  label: 'id'
 },
 {
  prop: 'code',
  label: 'code'
 },
 {
  prop: 'name',
  label: 'name'
 }
])

// 查找
const schema = reactive<FormSchema[]>([
 {
  field: '1111',
  component: 'Input'
 }
])

// 新增区域
const addZoneListItem = async (params) => {
 if (formData.value.id === null || formData.value.code === '' || formData.value.name === '') {
  ElMessage.error('请完整输入字段信息')
  return
 }
 console.log(formData.value.id, 'addformData')
 const res = await ZoneManageApi.addZoneItem(params)
 console.log(res, 'addzone')
 refresh()
}

// 更新区域
const updateZoneListItem = async (params) => {
 if (formData.value.id === null || formData.value.code === '' || formData.value.name === '') {
  ElMessage.error('请完整输入字段信息')
  return
 }
 const res = await ZoneManageApi.changeZoneItem(params)
 console.log(res, 'updateZone')
 refresh()
}

// 删除区域
const deleteZoneListItem = async () => {
 // 获取删除区域id
 let id = myTable.value.selectAll[0].id
 const res = await ZoneManageApi.deleteZoneItem({ id })
 console.log(res, 'deleteZone')
 refresh()
}
</script>
<style lang="scss" scoped>
.btn-box {
 display: flex;
 justify-content: flex-end;
 align-items: center;
 height: 3.125rem;
 width: 100%;
}
</style>
