<template>
    <div class="main">
        <div class="tableBox">
            <el-table :data="extraDetailData" v-loading="loading" border style="width: 100%"
                :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ background: '#C8D7EE', color: '#606266', textAlign: 'center' }">
                <el-table-column prop="feeBillName" label="计费项" width="300" />
                <el-table-column prop="feePrice" label="单价" />
                <el-table-column prop="feeNumber" label="数量" />
                <el-table-column prop="price" label="金额" />
                <el-table-column prop="notes" label="备注" />
                <el-table-column prop="voucherUrl" label="凭证">
                    <template #default="scope">
                        <el-link v-if="scope.row.voucherUrl" type="primary"
                            @click="downVoucherFile(scope.row.voucherUrl)">查看凭证</el-link>
                        <span v-else>未上传</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="formBox">
            <el-form ref="formRef" label-position="top" :rules="rules" label-width="100px" :model="formData" style="100%">
                <el-form-item label="审批原因" prop="approveNotes">
                    <el-input v-model="formData.approveNotes" :rows="2" type="textarea" placeholder="请输入内容" />
                </el-form-item>
            </el-form>
        </div>
        <div class="footer">
            <el-button type="primary" @click="approvalExpense(2)">确认</el-button>
            <el-button @click="approvalExpense(1)">驳回</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElMessage } from 'element-plus'
import * as ExtraApprovalApi from '@/api/warehousebill/extrabillapproval'
const props = defineProps({
    tableRef: {
        type: Object
    }
})

const formData = ref({
    approveNotes: ''
})

const rules = reactive({
    approveNotes: [
        { required: true, message: '请输入备注信息', trigger: 'change' },
    ]
})

// 获取费用明细
const loading = ref(false)
const extraDetailData: any = ref([])
const getExtraDetail = async () => {
    loading.value = true
    const data = await ExtraApprovalApi.selectAddition({ id: props.tableRef?.selectAll[0].id })
    emits('sendDetail', data)
    extraDetailData.value.push(data)
    loading.value = false
}

// 查看凭证
const downVoucherFile = (data) => {
    location.href = `${data}`
}

const formRef = ref()
// 审批费用
const emits = defineEmits(['successApr', 'sendDetail'])
const approvalExpense = async (status) => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const data = { id: props.tableRef?.selectAll[0].id, approveNotes: formData.value.approveNotes, status }
            const res = await ExtraApprovalApi.approvalAddition(data)
            if (res) {
                ElMessage.success('审批成功')
                emits('successApr')
            } else {
                ElMessage.error('审批失败')
            }
        }
    })
}

onMounted(async () => {
    await getExtraDetail()
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
