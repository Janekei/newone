<template>
    <div class="top">
        <div class="title">基础信息</div>
        <div class="content">
            <Formk :formOption="formOption" v-model:formState="formData" labelWidth="9em" />
        </div>
    </div>
    <div class="center">
        <div class="title">计费规则明细</div>
        <div class="content">
            <TableEdit ref="tableRef" :tableOption="tableOption" :showIndex="true" :showCheckBox="false"
                :showFixedOperation="true">
                <template #feeItemName="{ row }">
                    <el-input :disabled="disabled" v-model="row.row.feeItemId" />
                    <!-- <MyInputTable placeholder="" :modelValue="row.row.feeItemId" :tableConfig="tableConfig1"
                        valueKey="id" /> -->
                </template>
                <template #feeDim="{ row }">
                    <el-select :disabled="disabled" v-model="row.row.feeDim" class="m-2" placeholder="">
                        <el-option v-for="(item, index) in getIntDictOptions('billing_metrics')" :key="index + 'a'"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </template>
                <template #feeCycle="{ row }">
                    <el-select :disabled="disabled" v-model="row.row.feeCycle" class="m-2" placeholder="">
                        <el-option v-for="(item, index) in getIntDictOptions('billing_cycle')" :key="index + 'a'"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </template>
                <template #feeCyId="{ row }">
                    <el-input :disabled="disabled" v-model="row.row.feeCyId" />
                    <!-- <MyInputTable placeholder="" :modelValue="row.row.feeCyId" :tableConfig="tableConfig2" valueKey="id" /> -->
                </template>
                <template #feePrice="{ row }">
                    <el-input :disabled="disabled" v-model="row.row.feePrice" />
                </template>
                <template #feeBegin="{ row }">
                    <el-date-picker :disabled="disabled" v-model="row.row.feeBegin" value-format="YYYY-MM-DD" type="date"
                        placeholder="" size="default" />
                </template>
                <template #feeEnd="{ row }">
                    <el-date-picker :disabled="disabled" v-model="row.row.feeEnd" value-format="YYYY-MM-DD" type="date"
                        placeholder="" size="default" />
                </template>
                <template #operation="{ operateRow }">
                    <ElButton :disabled="disabled" type="primary" :icon="Delete" @click="deleteRow(operateRow)" />
                </template>
                <template #buttons>
                    <ElButton @click="addTableRow" :disabled="disabled" type="primary">添加计费项明细</ElButton>
                </template>
            </TableEdit>
        </div>
    </div>
    <div class="bottom">
        <div class="title">备注（非必填）</div>
        <div class="content">
            <el-input v-model="notes" :disabled="disabled" :rows="5" type="textarea" placeholder="其他备注信息，200字以内" />
        </div>
    </div>
    <div class="bottom-btn">
        <ElButton type="info" @click="cancle">取消</ElButton>
        <ElButton type="primary" :disabled="disabled" @click="saveTemplate">保存模板</ElButton>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus';
import Formk from '@/components/FormK/index.vue'
import TableEdit from './TableEdit.vue';
// import MyInputTable from './MyInputTable.vue';
// import FormEdit from './FormEdit.vue';
import { getIntDictOptions } from '@/utils/dict'
import { Delete } from '@element-plus/icons-vue';
import * as TemplateRulesApi from '@/api/billingtemplate/templaterule'

const route = useRoute()
const getId = route.query.id ? route.query.id : undefined
const getType = route.query.type ? Number(route.query.type) : undefined
const disabled = getType === 0 ? true : false

// 获取模板信息
const getTemplate = async () => {
    const res = await TemplateRulesApi.getTemplate({ id: getId })
    formData.value = { ...res }
    tableRef.value.tableData = res.detailsDTOList
    notes.value = res.notes
    console.log(res, 9898)
}

let isDisabled = ref(false)
onBeforeMount(() => {
    if (getId) {
        getTemplate()
        isDisabled.value = getType == 0 ? true : false
    }
})

// 表格搜索框配置
// const tableConfig1 = reactive({
//     url: '/jinko/items/page',
//     tableOption: [
//         {
//             prop: 'name',
//             label: '名称'
//         },
//         {
//             prop: 'id',
//             label: 'Code'
//         }
//     ]
// })

// const tableConfig2 = reactive({
//     url: '/jinko/currency/page',
//     tableOption: [
//         {
//             prop: 'name',
//             label: '名称'
//         },
//         {
//             prop: 'id',
//             label: 'Code'
//         }
//     ]
// })

const formData = ref({})
let notes = ref()

const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入计费规则名称',
        label: '计费规则名称：',
        width: '500px',
        disabled: route.query.type,
        rules: [
            { required: true, message: '请输入仓库', trigger: 'change' }
        ],
    },
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '',
        label: '区域：',
        disabled: route.query.type,
        rules: [
            { required: true, message: '请输入区域', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['bsWhareaId'] = row.id
            formData.value['bsWhType'] = row.type
        },
        tableConfig: {
            url: '/jinko/baseWarehouse/getWarehousePage',
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
        type: 'select',
        field: 'bsWhType',
        placeholder: '',
        label: '仓库种类',
        disabled: true,
        options: getIntDictOptions('billing_warehouse_type'),
        rules: [
            { required: true, message: '请选择仓库种类', trigger: 'blur' }
        ]
    },
])

const tableOption = reactive([
    {
        prop: 'feeItemName',
        label: '计费项',
        width: '260',
        slotName: 'feeItemName'
    },
    {
        prop: 'feeDim',
        label: '计费维度',
        width: '260',
        slotName: 'feeDim'
    },
    {
        prop: 'feeCycle',
        label: '计费周期',
        width: '260',
        slotName: 'feeCycle'
    },
    {
        prop: 'feePrice',
        label: '单价',
        width: '260',
        slotName: 'feePrice'
    },
    {
        prop: 'feeCyId',
        label: '币种',
        width: '260',
        slotName: 'feeCyId'
    },
    {
        prop: 'feeBegin',
        label: '报价生效日期',
        width: '260',
        slotName: 'feeBegin'
    },
    {
        prop: 'feeEnd',
        label: '报价失效日期',
        width: '260',
        slotName: 'feeEnd'
    }
])

// 表格动态插入的数据
const tableRef = ref()

let whFeeTmplId = ref(0)
const addTableRow = () => {
    tableRef.value.tableData.push({
        whFeeTmplId: whFeeTmplId.value++
    })
}

// 动态删除插入的数据
const deleteRow = (row) => {
    tableRef.value.tableData.forEach((item, index) => {
        if (row.whFeeTmplId == item.whFeeTmplId) {
            tableRef.value.tableData.splice(index, 1)
            return;
        }
    })
}

// 取消
const router = useRouter()
const cancle = () => {
    router.go(-1)
}

const saveTemplate = async () => {
    tableRef.value.tableData.forEach(item => {
        item.feeBegin = Date.parse(item.feeBegin)
        item.feeEnd = Date.parse(item.feeEnd)
        item.feeItemId = parseInt(item.feeItemId)
        item.feePrice = parseInt(item.feePrice)
        item.feeCyId = parseInt(item.feeCyId)
    })
    let addData = reactive({
        ...formData.value,
        detailsCreateReqVOList: {
            ...tableRef.value.tableData
        },
        notes: notes.value
    })
    if (getId) {
        const res = await TemplateRulesApi.updateTemplate(addData)
        if (res) {
            ElMessage.success('修改成功！')
        } else {
            ElMessage.error('修改失败！')
        }
    } else {
        const res = await TemplateRulesApi.createTemplate(addData)
        if (res) {
            ElMessage.success('添加成功！')
        } else {
            ElMessage.error('添加失败！')
        }
    }
}



</script>
<style lang="scss" scoped>
.title {
    padding: .625rem;
    background-color: #409EFF;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
}

.content {
    margin-top: 1.25rem;
}

.top {
    :deep(.el-form) {
        display: inline-flexbox;
        flex-wrap: wrap;
        width: 100%;
    }

    :deep(.el-form-item) {
        flex: 1;
    }

    :deep(.el-form-item__content) {
        width: 500px !important;
    }
}

.center {
    :deep(.el-form-item) {
        margin: 0;
    }

    :deep(.el-form-item__content) {
        width: 50px !important;
    }

    margin-bottom: 1.25rem;
}

.bottom {
    .title {
        padding: .625rem;
        background-color: #CCCCCC;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
    }

    .content {
        margin-top: 1.25rem;
    }
}

.bottom-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.25rem 0;
}
</style>
