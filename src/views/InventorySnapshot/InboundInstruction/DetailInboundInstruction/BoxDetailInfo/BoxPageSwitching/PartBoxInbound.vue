<template>
    <TableK url="/jinkotms/baseWarehouse" method="get" :params="formData" :firstPages="20" :tableOption="tableOption"
         />
</template>

<script lang="ts" setup>
import TableK from '@/components/TableK/index.vue'
// table表格列数据
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'No',
        label: '序号',
    },
    {
        prop: 'boxNo',
        label: '箱号',
    },
    {
        prop: 'billNo',
        label: '提单号',
    },
    {
        prop: 'boxType',
        label: '箱型',
    },
    {
        prop: 'lockNo',
        label: '锁号',
    },
    {
        prop: 'boxNumber',
        label: '件数',
    },
    {
        prop: 'weight',
        label: '重量',
    },
    {
        prop: 'volumn',
        label: '体积',
    },
    {
        prop: 'createPeople',
        label: '创建人',
    },
    {
        prop: 'createTime',
        label: '创建时间',
    },
    {
        prop: 'updatePeople',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
    }
])
</script>
<style lang="scss" scoped></style>
