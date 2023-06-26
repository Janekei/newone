<template>
 <div>
  <TableK ref="myTable" url="/jinko/gscwhstockpallets/page" method="get" :params="formData" :firstPages="10"
   :tableOption="tableOption" :showCheckBox="false" />
 </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import TableK from '@/components/TableK/index.vue'

const formData = ref({})
const tableOption = reactive([
 {
  prop: 'goodsId',
  label: '序号',
 },
 {
  prop: 'goodsName',
  label: '货物名称',
 },
 {
  prop: 'goodsCode',
  label: '规格型号',
 },
 {
  prop: 'area',
  label: '区域',
 },
 {
  prop: 'Whaddress',
  label: '仓库地址',
 },
 {
  prop: 'miniInboundTime',
  label: '最短入库时间',
 },
 {
  prop: 'maxInboundTime',
  label: '最长入库时间',
 },
 {
  prop: 'avgInboundTime',
  label: '平均在库时间',
 },
 {
  prop: 'totalCount',
  label: '兆瓦数',
 },
 {
  prop: 'totalMegawatt',
  label: '总兆瓦数'
 }
])

</script>
<style lang="scss" scoped>
.table {
 margin-top: .625rem;
}
</style>
