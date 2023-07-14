<template>
    <div class="main">
        <div class="tableBox">
            <el-table :data="expenseDetailData" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }"
                :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="费用" width="300" />
                <el-table-column prop="price" label="系统账单" />
                <el-table-column prop="supplierPrice" label="供应商账单" />
            </el-table>
        </div>
        <div class="formBox">
            <el-form label-position="top" :rules="rules" label-width="100px" :model="formData" style="100%">
                <el-form-item label="审批原因" prop="reason">
                    <el-input v-model="reason" :rows="5" type="textarea" placeholder="请输入内容" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import * as AllExpenseBillApi from '@/api/warehousebill/salesman/allexpensebill'
const props = defineProps({
    id: {
        type: Number
    }
})


// const tableData = [
//     {
//         date: '租赁费',
//         name: 25,
//         address: 25,
//     },
//     {
//         date: '报关费',
//         name: 25,
//         address: 60,
//     },
//     {
//         date: '特殊监管车辆费',
//         name: 25,
//         address: 70,
//     }
// ]

const reason = ref()
const formData = ref()

// 获取对账明细
const emits = defineEmits(['successApr', 'sendDetail'])
const expenseDetailData: any = ref([])
const getExpenseDetail = async () => {
    const data = await AllExpenseBillApi.getExpenseDetail({ id: props.id })
    emits('sendDetail', data)
    expenseDetailData.value.push(data)
}

const rules = reactive({
    reason: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
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
