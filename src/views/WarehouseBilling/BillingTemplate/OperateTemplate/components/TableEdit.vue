<template>
    <TableK url="/jinko/gscwhstockpalletslog/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
        :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false" :showIndex="true">

        <template #operation>
            删除
        </template>
    </TableK>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { formatTime } from '@/utils'
// import { View, Edit, DArrowRight } from '@element-plus/icons-vue'
import TableK from '@/components/TableK/index.vue'


const formData = ref({})
const tableOption = reactive([
    {
        prop: 'bl',
        label: '计费项',
        width: '240'
    },
    {
        prop: 'goodsCode',
        label: '计费维度',
        width: '200'
    },
    {
        prop: 'goodsName',
        label: '计费周期',
        width: '200'
    },
    {
        prop: 'goodsCode',
        label: '单价',
        width: '200'
    },
    {
        prop: 'palletNo',
        label: '币种',
        width: '170'
    },
    {
        prop: 'palletNo',
        label: '报价失效日期',
        width: '170'
    },
    {
        prop: 'palcletNo',
        label: '操作',
        width: '170'
    }
])



</script>
<style scoped></style>
