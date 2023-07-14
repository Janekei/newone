<template>
    <div class="main">
        <div>
            <FormK :formOption="formOption" v-model:formState="formData" labelWidth="8em" />
        </div>
        <div>
            <TabContent :basicData="cloneData" @success="success" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'
import _ from 'lodash-es'
import TabContent from './TabContent.vue';

const formData = ref({})
const formOption = reactive([
    {
        type: 'input',
        field: 'bl',
        placeholder: '',
        label: '提单号：',
        // disabled: true
    },
    {
        type: 'inputTable',
        field: 'supplierName',
        placeholder: '',
        label: '供应商：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['supplierId'] = row.id
            formData.value['supplierName'] = row.name
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
        field: 'bsWhName',
        placeholder: '',
        label: '仓库名称：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['bsWhId'] = row.id
            formData.value['bsWhName'] = row.name
            formData.value['bsWhareaName'] = row.bsWhareaName
        },
        tableConfig: {
            url: '/gsc/baseWarehouse/getWarehousePage',
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
        type: 'input',
        field: 'bsWhareaName',
        placeholder: '',
        label: '仓库区域：',
        disabled: true
    },
    {
        type: 'input',
        field: 'arkQty',
        placeholder: '',
        label: '柜数：',
        // disabled: true
    },
    {
        type: 'input',
        field: 'palletQty',
        placeholder: '',
        label: '托盘数量：',
        // disabled: true
    },
    {
        type: 'input',
        field: 'qty',
        placeholder: '',
        label: '组片数量：',
        // disabled: true
    },
    {
        type: 'date',
        field: 'inStockTime',
        placeholder: '',
        label: '入仓日期：',
        // disabled: true
    },
    {
        type: 'date',
        field: 'outStockTime',
        placeholder: '',
        label: '出仓日期：',
        // disabled: true
    },
    {
        type: 'inputTable',
        field: 'feeCyName',
        placeholder: '',
        label: '币种：',
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['feeCyId'] = row.id
            formData.value['feeCyName'] = row.name
        },
        tableConfig: {
            url: '/gsc/currency/page',
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
])

const cloneData = ref()
watch(() => formData.value, () => {
    cloneData.value = _.cloneDeep(formData.value)
    cloneData.value['inStockTime'] = Date.parse(formData.value['inStockTime'])
    cloneData.value['outStockTime'] = Date.parse(formData.value['outStockTime'])
})

const emits = defineEmits(['success'])
const success = () => {
    emits('success')
}
</script>
<style lang="scss" scoped>
:deep(.el-form-item) {
    margin: .625rem 1.625rem;
}

.main {
    display: flex;
    flex-direction: column;
}
</style>
