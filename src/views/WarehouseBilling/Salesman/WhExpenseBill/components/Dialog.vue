<template>
    <Dialog v-model="dialogVisible" ref="dialogRef" :title="dialogTitle" width="800">
        <div class="form-box">
            <FormK :formOption="formOption" ref="refForm" v-model:formState="formData" labelWidth="9em" />
        </div>
        <div class="btn-box">
            <el-button size="small" @click="submitForm" type="primary">确认</el-button>
        </div>
        <DialogTable v-if="billId" :billId="billId" />
        <!-- <template #footer>
            <el-button @click="submitForm" type="primary">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template> -->
    </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/components/Dialog'
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/formatTime'
import FormK from '@/components/FormK/index.vue'
import * as ExpenseBillApi from '@/api/warehousebill/supplier/expensebill'
import DialogTable from './DialogTable.vue'

const formData = ref({})
const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: '',
        label: '账单名称：',
        rules: [
            { required: true, message: '请输入账单名称', trigger: 'change' }
        ]
    },
    {
        type: 'inputTable',
        field: 'supplierName',
        placeholder: '',
        label: '供应商：',
        rules: [
            { required: true, message: '请输入供应商', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
            formData.value['supplierName'] = undefined
            formData.value['supplierId'] = undefined
        },
        setFormData: (row) => {
            formData.value['supplierName'] = row.name
            formData.value['supplierId'] = row.id
        },
        tableConfig: {
            url: '/gsc/carrier/page',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '',
        label: '仓库区域：',
        rules: [
            { required: true, message: '请输入仓库区域', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
            formData.value['bsWhareaName'] = undefined
            formData.value['bsWhareaId'] = undefined
        },
        setFormData: (row) => {
            formData.value['bsWhareaName'] = row.name
            formData.value['bsWhareaId'] = row.id
        },
        tableConfig: {
            url: '/gsc/wharea/page',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'date',
        field: 'startDate',
        placeholder: '',
        label: '账单起始日期：',
        rules: [
            { required: true, message: '请输入账单生成日期', trigger: 'change' }
        ]
    },
    {
        type: 'date',
        field: 'endDate',
        placeholder: '',
        label: '账单截止日期：',
        rules: [
            { required: true, message: '请输入账单生成日期', trigger: 'change' }
        ]
    },
    {
        type: 'input',
        field: 'price',
        placeholder: '',
        label: '供应商总金额：',
        rules: [
            { required: true, message: '请输入账单生成日期', trigger: 'change' }
        ]
    }
])

// 表单内容区域
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formType = ref()
const refForm = ref()

let getId = ref()
const open = async (type: string, id?: number) => {
    dialogVisible.value = true
    formType.value = type
    dialogTitle.value = type + '总费用对账'
    if (id) {
        getId.value = id
        const res = await ExpenseBillApi.getExpense({ id })
        formData.value = res
        formData.value['billDate'] = formatDate(formData.value['billDate'], 'YYYY-MM-DD HH:mm:ss')
        console.log(formData.value['billDate'], 9090)
    }
}

watch(() => dialogVisible.value, (newVal) => {
    if (newVal === false) resetForm()
})

// 提交表单
// 定义 success 事件，用于操作成功后的回调
const emits = defineEmits(['success'])
let billId = ref()
const submitForm = () => {
    refForm.value.validate(async (valid) => {
        if (valid) {
            let params = {
                name: formData.value['name'],
                supplierId: formData.value['supplierId'],
                bsWhareaId: formData.value['bsWhareaId'],
                startDate: Date.parse(formData.value['startDate']),
                endDate: Date.parse(formData.value['endDate']),
                price: formData.value['price']
            }
            if (formType.value === '新增') {
                const res = await ExpenseBillApi.createExpense(params)
                if (res) {
                    billId.value = res
                    ElMessage.success('新增成功')
                    // resetForm()
                    // dialogVisible.value = false
                    emits('success')
                } else {
                    ElMessage.success('新增失败')
                }
            } else if (formType.value === '编辑') {
                let params1 = Object.assign({}, params, { id: getId.value })
                const res = await ExpenseBillApi.updateExpense(params1)
                if (res) {
                    ElMessage.success('修改成功')
                    // dialogVisible.value = false
                    emits('success')
                } else {
                    ElMessage.success('修改失败')
                }
            }
        }
    })
}



defineExpose({
    open
})

/** 重置表单 */
const resetForm = () => {
    refForm.value.resetFields()
}



</script>
<style lang="scss" scoped>
.form-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: .3125rem;
}

.text {
    display: inline-block;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
}
</style>
