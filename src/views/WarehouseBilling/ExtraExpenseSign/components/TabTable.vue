<template>
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ background: '#C8D7EE', color: '#606266' }">
        <el-table-column prop="date" label="费用名称" width="180" />
        <el-table-column prop="name" label="单价" width="180" />
        <el-table-column prop="address" label="数量" />
        <el-table-column prop="address" label="金额" />
        <el-table-column prop="address" label="币种" />
        <el-table-column prop="address" label="备注" />
        <el-table-column prop="address" label="凭证" />
    </el-table>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No',
    }
]

</script>
<style lang="scss" scoped></style>
