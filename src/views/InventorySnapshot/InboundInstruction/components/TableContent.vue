<template>
    <div>
        <TableK ref="myTable" url="/jinkotms/baseWarehouse" method="get" :params="formData" :firstPages="20"
            :tableOption="tableOption" :showCheckBox="false" :showExpand="true">
            <template #expand="{ expandRow }">
                {{ expandRow }}
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import TableK from '@/components/TableK/index.vue'

const formData = ref({})
const tableOption = reactive([
    {
        prop: 'No',
        label: '序号',
    },
    {
        prop: 'sapNo',
        label: 'SAP任务号',
    },
    {
        prop: 'billNo',
        label: '提单号',
    },
    {
        prop: 'containerNum',
        label: '柜量',
    },
    {
        prop: 'preInboundTime',
        label: '预计入库时间',
    },
    {
        prop: 'preArriveTime',
        label: '预计到港时间',
    },
    {
        prop: 'ArrivedTime',
        label: '实际到港时间',
    },
    {
        prop: 'tradeClause',
        label: '贸易条款',
    },
    {
        prop: 'status',
        label: '状态',
    }
])

</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}
</style>
