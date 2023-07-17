<template>
    <div class="main">
        <div class="tableBox">
            <el-table :data="expenseDetailData" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }"
                :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="费用" width="300" />
                <el-table-column prop="price" label="系统账单" />
                <el-table-column label="供应商账单">
                    <template #default="scope">
                        <el-input type="number"
                            oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                            v-model="scope.row.supplierPrice" placeholder="" />
                    </template>
                </el-table-column>
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
    id: {
        type: Number
    }
})


const formData = ref({ notes: '' })

// 获取对账明细
const emits = defineEmits(['successApr'])
const expenseDetailData: any = ref([])
const getExpenseDetail = async () => {
    const data = await ExpenseBillApi.getExpenseDetail({ id: props.id })
    data.detailsList.forEach(item => {
        expenseDetailData.value.push(item)
    })

}

// 审批费用
const refForm = ref()
const approvalExpense = async () => {
    refForm.value.validate(async (valid) => {
        if (valid) {
            const data = { id: props.id, notes: formData.value.notes }
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



const tableRowClassName = (row, rowIndex) => {
    console.log(row.row.name, row.row.name !== row.row.address, rowIndex, 9999)
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

:deep(.el-form-item__label) {
    font-family: '黑体';
    font-size: 18px;
    font-weight: 700;
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9) !important;
}
</style>
