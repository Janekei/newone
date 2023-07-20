<template>
    <div class="main">
        <div class="tableBox">
            <span class="notes">备注:背景色为<text class="notesRed">红色</text>的行表示系统账单与供应商账单有差异，<text
                    class="notesGreen">绿色</text>表示账单相同。</span>
            <el-table :data="expenseDetailData" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }"
                :row-class-name="tableRowClassName" :highlight-current-row="false">
                <el-table-column prop="name" label="费用" width="300" />
                <el-table-column prop="price" label="系统账单" />
                <el-table-column prop="supplierPrice" label="供应商账单" />
            </el-table>
        </div>
        <div class="formBox">
            <el-form ref="refForm" label-position="top" :rules="rules" label-width="100px" :model="formData" style="100%">
                <el-form-item label="审批原因" prop="notes">
                    <el-input v-model="formData.notes" :rows="5" type="textarea" placeholder="请输入内容" />
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="footer">
        <el-button type="primary" @click="approvalExpense">确认</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import * as ExpenseBillApi from '@/api/warehousebill/salesman/expensedetail'
const props = defineProps({
    tableRef: {
        type: Object
    }
})


const formData = ref({ notes: '' })

// 获取对账明细
const emits = defineEmits(['successApr'])
const expenseDetailData: any = ref([])
const getExpenseDetail = async () => {
    const data = await ExpenseBillApi.getExpenseDetail({ id: props.tableRef?.selectAll[0].id })
    data.detailsList.forEach(item => {
        expenseDetailData.value.push(item)
    })

}

// 审批费用
const refForm = ref()
const approvalExpense = async () => {
    refForm.value.validate(async (valid) => {
        if (valid) {
            const data = { id: props.tableRef?.selectAll[0].id, notes: formData.value.notes }
            const res = await ExpenseBillApi.approvalBill(data)
            if (res) {
                ElMessage.success('审批成功')
                emits('successApr')
            } else {
                ElMessage.error('审批失败')
            }
        }
    })

}


const rules = reactive({
    notes: [
        { required: true, message: '请输入审批原因', trigger: 'blur' },
    ]
})



const tableRowClassName = (row) => {
    console.log(typeof row.row.price)
    if (row.row.price !== row.row.supplierPrice) {
        return 'danger-row'
    } else {
        return 'success-row'
    }
}


onMounted(async () => {
    await getExpenseDetail()
})
</script>
<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .tableBox {
        display: inline-block;
        margin: 0;
        width: 60%;
        // background-color: aqua;

        .notes {
            display: inline-block;
            margin-bottom: .3125rem;
            font-family: '黑体';
            font-size: 12px;
            font-weight: 700;
        }

        .notesRed {
            color: #e30f0f;
        }

        .notesGreen {
            color: #14c214;
        }
    }

    .formBox {
        display: inline-block;
        width: 35%;
        margin-left: .625rem;
        // background-color: aquamarine;
    }
}


.footer {
    display: flex;
    justify-content: flex-end;
}

:deep(.el-table .danger-row) {
    background-color: var(--el-color-danger-light-7) !important;
}

:deep(.el-table .el-table__body tr:hover > td) {
    background-color: rgba(0, 0, 0, 0) !important;
}


:deep(.el-form-item__label) {
    font-family: '黑体';
    font-size: 18px;
    font-weight: 700;
}

:deep(.el-table .success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9) !important;
}
</style>
