<template>
    <div>
        <TableK url="/jinkotms-moduule-core-biz/gsc-wh-inbound/page" method="get" :params="formData" :firstPages="20"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true" :showExpand="true"
            @clickThisColumn="clickThisColumn">
            <template #expand="{ expandRow }">
                {{ expandRow }}
                <DescriptionInboundList :dataList="expandRow" />
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TableK from '@/components/TableK/index.vue'
import DescriptionInboundList from './DescriptionInboundList.vue';

// const { t } = useI18n()
const router = useRouter()
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'sapDn',
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
        prop: 'estInTime',
        label: '预计入库时间',
    },
    {
        prop: 'eta',
        label: '预计到港时间',
    },
    {
        prop: 'etd',
        label: '实际离港时间',
    },
    {
        prop: 'tardeWayConfigWay',
        label: '贸易条款',
    },
    {
        prop: 'status',
        label: '状态',
    }
])



//跳转对应行的详情页信息
const clickThisColumn = (row) => {
    // 获取当前行的id
    let id = row.id
    // console.log(router)
    router.push({ path: '/InventorySnapshot/detailinboundinstruction', query: { id } })
}

</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}
</style>
