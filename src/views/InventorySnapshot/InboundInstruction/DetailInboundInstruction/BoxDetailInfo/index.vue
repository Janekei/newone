<template>
    <SearchContent :formOption="formOptionBox" />
    <TableK url="/jinkotms/baseWarehouse" method="get" :params="formData" :firstPages="20" :tableOption="tableOption"
        :showCheckBox="false" />
</template>

<script lang="ts" setup>
import SearchContent from '../../components/SearchContent.vue'
import TableK from '@/components/TableK/index.vue'


// 柜信息搜索框数据
const formOptionBox = reactive([
    {
        type: 'input',
        field: 'boxNo',
        placeholder: '请填写箱号',
        label: '箱号',
        rules: [
            { required: true, message: '请填写箱号', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'code',
        placeholder: '请输入锁号',
        label: '锁号',
        rules: [
            { required: true, message: '请填写锁号', trigger: 'change' }
        ]
    }
])

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
