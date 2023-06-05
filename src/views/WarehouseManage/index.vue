<template>
 <div>
  仓库管理
  <TableK url="/table/list" method="get" :params="formData" ref="myTable" :firstPages="20" :tableOption="tableOption">
   <!-- <template #date="{ row }">
                <span style="color: red">{{ row.row.date }}</span>
            </template> -->
  </TableK>
  <ElButton>增加</ElButton>
  <ElButton>删除</ElButton>
  <Search :schema="schema" />
  <ElButton>修改</ElButton>
 </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search } from '@/components/Search'
import { FormSchema } from '@/types/form'
import TableK from '@/components/TableK/index.vue'
const formData = ref({
 code: 123,
 region: 1,
 time: '2023-05-25',
 entName: 'vue'
})
const myTable = ref()
// const refresh = () => {
//     myTable.value.refresh()
// }
const tableOption = reactive([
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

// 查找
const schema = reactive<FormSchema[]>([
 {
  field: 'field1',
  component: 'Input'
 }
])
</script>
<style lang="scss" scoped></style>
