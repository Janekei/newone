<template>
    全部
    <TableK url="/jinko/gsc-wh-inbound-container/page" method="get" :params="{ id: listItemId }" :firstPages="20"
        :tableOption="tableOption" :showCheckBox="false" :showIndex="true" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import TableK from '@/components/TableK/index.vue'

// listItemId：入库指令列表传过来的参数
const route = useRoute()
let listItemId: number = parseInt(JSON.parse(route.query.id as any));
// table表格列数据
const tableOption = reactive([
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
