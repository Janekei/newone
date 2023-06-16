<template>
    <div>
        <TableK url="/jinkotms-moduule-core-biz/gsc-wh-inbound/page" method="get" :params="formData" :firstPages="20"
            :tableOption="tableOption" :showCheckBox="false" :showExpand="true" @clickThisColumn="clickThisColumn">
            <template #expand="{ expandRow }">
                {{ expandRow }}
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TableK from '@/components/TableK/index.vue'

// const { t } = useI18n()
const router = useRouter()
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

//跳转对应行的详情页信息
const clickThisColumn = (val) => {
    console.log(val, 333)
    router.push('/InventorySnapshot/detailinboundinstruction')
}

</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}
</style>
