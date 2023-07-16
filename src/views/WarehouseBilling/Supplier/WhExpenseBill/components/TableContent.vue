<template>
    <div>
        <TableK url="/gsc/fee/bill/salesmanPage" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm"
                    @success="refresh" />
            </template>
            <template #status="{ row }">
                <DictTagK type="wh_fee_details_status" :value="row.row.status" />
            </template>
            <template #operation="{ operateRow }">
                <ElButton class="edit-btn" type="warning" :icon="Edit" @click="open('编辑', operateRow.id)" />
                <ElButton class="delete-btn" type="danger" :icon="Delete" @click="deleteExpenseItem(operateRow.id)" />
            </template>
        </TableK>
    </div>
    <Dialog ref="dialogRef" @success="refresh" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { formatTime } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
import Dialog from './Dialog.vue'
import * as ExpenseBillApi from '@/api/warehousebill/supplier/expensebill'

const props = defineProps({
    code: {
        type: String,
        default: ''
    }
})

const formData = ref({})
const tableOption = reactive([
    {
        prop: 'name',
        label: '账单名称',
        width: '160'
    },
    {
        prop: 'supplierName',
        label: '供应商',
        width: '160'
    },
    {
        prop: 'bsWhareaName',
        label: '仓库区域',
        width: '160'
    },
    {
        prop: 'billDate',
        label: '账单生成日期',
        width: '160'
    },
    {
        prop: 'status',
        label: '状态',
        width: '160',
        slotName: 'status'
    },
    {
        prop: 'supplierPrice',
        label: '供应商金额',
        width: '160'
    },
    {
        prop: 'price',
        label: '总金额'
    }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        code: props.code
    }
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}

// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}

// 弹窗
const dialogRef = ref()
const open = (type: string, id: number) => {
    dialogRef.value.open(type, id)
}

// 删除
const { t } = useI18n()
const message = useMessage() // 消息弹窗
const deleteExpenseItem = async (id) => {
    try {
        // 删除的二次确认
        await message.delConfirm()
        await ExpenseBillApi.deleteExpense({ id })
        message.success(t('common.delSuccess'))
        // 刷新列表
        refresh()
    } catch { }
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
