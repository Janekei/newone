<template>
    <div>
        <TableK url="/gsc/fee/details/additionalPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @refresh="refresh" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" />
            </template>
            <template #inStockTime="{ row }">
                <span>{{ formatDate(row.row.inStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #outStockTime="{ row }">
                <span>{{ formatDate(row.row.outStockTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #feeTime="{ row }">
                <span>{{ formatDate(row.row.feeTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
            </template>
            <template #voucher="{ row }">
                <el-tag class="ml-2" type="success" v-if="row.row.voucherStatus">已上传</el-tag>
                <el-tag class="ml-2" type="info" v-else>未上传</el-tag>
            </template>
            <template #status="{ row }">
                <DictTagK type="wh_fee_details_status" :value="row.row.status" />
            </template>
            <template #operation="{ operateRow }">
                <ElButton class="edit-btn" type="warning" :icon="Edit" @click="toEditItem(operateRow.id)" />
                <ElButton class="delete-btn" type="danger" :icon="Delete" @click="toDelItem(operateRow.id)" />
            </template>
        </TableK>
    </div>
    <Dialog ref="dialogRef" @success="refresh" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import { Delete, Edit } from '@element-plus/icons-vue'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
import DictTagK from '@/components/DictTagK/index.vue'
import Dialog from './Dialog.vue'
import * as ExtraExpenseApi from '@/api/warehousebill/extrabillsign'

const formData = ref({})
const tableOption = reactive([
    {
        prop: 'feeBillName',
        label: '费用名称',
        width: '160'
    },
    {
        prop: 'supplierName',
        label: '供应商',
        width: '160'
    },
    {
        prop: 'bl',
        label: '提单号',
        width: '160'
    },
    {
        prop: 'bsWhareaName',
        label: '仓库区域',
        width: '160'
    },
    {
        prop: 'arkQty',
        label: '柜数',
        width: '160'
    },
    {
        prop: 'palletQty',
        label: '托盘数量',
        width: '160'
    },
    {
        prop: 'qty',
        label: '组片数量',
        width: '160'
    },
    {
        prop: 'inStockTime',
        label: '入仓日期',
        width: '160',
        slotName: 'inStockTime'
    },
    {
        prop: 'outStockTime',
        label: '出仓日期',
        width: '160',
        slotName: 'outStockTime'
    },
    {
        prop: 'feeTime',
        label: '费用生成时间',
        width: '160',
        slotName: 'feeTime'
    },
    {
        prop: 'price',
        label: '金额',
        width: '160'
    },
    {
        prop: 'feeCyName',
        label: '币值',
        width: '160'
    },
    {
        prop: 'voucherUrl',
        label: '凭证',
        width: '160',
        slotName: 'voucher'
    },
    {
        prop: 'notes',
        label: '备注',
        width: '160'
    },
    {
        prop: 'status',
        label: '状态',
        width: '160',
        slotName: 'status'
    }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {}
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}


// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}

//删除额外费用
const { t } = useI18n()
const message = useMessage() // 消息弹窗
const toDelItem = async (id: number) => {
    try {
        // 删除的二次确认
        await message.delConfirm()
        // 发起删除
        // console.log(id)
        await ExtraExpenseApi.deleteAddition({ id })
        message.success(t('common.delSuccess'))
        // 刷新列表
        refresh()
    } catch { }
}

// 弹窗
const dialogRef = ref()
const toEditItem = (id) => {
    dialogRef.value.open(id)
}



</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}

.link {
    margin-right: .625rem;
}
</style>
