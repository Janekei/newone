<template>
    <div class="main">
        <div class="tableBox">
            <el-table :data="tableData" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }">
                <el-table-column prop="date" label="计费项" width="300" />
                <el-table-column prop="name" label="账单" />
                <el-table-column prop="address" label="数量" />
                <el-table-column prop="address" label="金额" />
                <el-table-column prop="address" label="币种" />
                <el-table-column prop="address" label="备注" />
                <el-table-column prop="address" label="凭证" />
            </el-table>
        </div>
        <div class="formBox">
            <el-form label-position="top" :rules="rules" label-width="100px" :model="formData" style="100%">
                <el-form-item label="审批原因" prop="approveNotes">
                    <el-input v-model="approveNotes" :rows="2" type="textarea" placeholder="请输入内容" />
                </el-form-item>
            </el-form>

        </div>
        <div class="footer">
            <el-button type="primary" @click="approvalExpense(1)">确认</el-button>
            <el-button @click="approvalExpense(0)">驳回</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElMessage } from 'element-plus'
import * as ExtraApprovalApi from '@/api/warehousebill/extrabillapproval'
const props = defineProps({
    id: {
        type: Number
    }
})
const tableData = ref([])

const approveNotes = ref()
const formData = ref()

const rules = reactive({
    approveNotes: [
        { message: '请输入备注信息', trigger: 'change' },
    ]
})

// 获取费用明细
const extraDetailData = ref()
const getExtraDetail = async () => {
    const data = await ExtraApprovalApi.selectAddition({ id: props.id })
    extraDetailData.value = data
}

// 审批费用
const approvalExpense = async (status) => {
    const data = { id: props.id, approveNotes: approveNotes.value, status }
    const res = await ExtraApprovalApi.approvalAddition(data)
    if (res) {
        ElMessage.success('审批成功')
    } else {
        ElMessage.error('审批失败')
    }
}

onBeforeMount(() => {
    getExtraDetail()
})


</script>
<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: column;
    width: 100%;

    // .tableBox {
    //     display: inline-block;
    //     margin: 0;
    //     width: 60%;
    //     // background-color: aqua;
    // }

    // .formBox {
    //     display: inline-block;
    //     width: 35%;
    //     margin-left: .625rem;
    //     // background-color: aquamarine;
    // }
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
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9) !important;
}
</style>
