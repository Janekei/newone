<template>
    <div>
        <TableK url="/jinko/standardTIme/page" method="get" :params="formData" ref="tableRef" :tableOption="tableOption"
            :showFixedOperation="true" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <FormSearch @AddTimeRules="AddTimeRules" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" />
            </template>
            <template #operation>
                <ElButton class="edit-btn" type="warning" :icon="Edit" />
                <ElButton class="delete-btn" type="danger" :icon="Delete" />
            </template>
        </TableK>
    </div>
    <DialogEditForm ref="formRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import FormSearch from './FormSearch.vue';
import DialogEditForm from './DialogEditForm.vue';
import TableK from '@/components/TableK/index.vue'

let formData = ref({})

const tableOption = [
    {
        prop: 'departureCountryName',
        label: '起运国'
    },
    {
        prop: 'departurePortName',
        label: '起运港'
    },
    {
        prop: 'arrivalCountryName',
        label: '目的国'
    },
    {
        prop: 'arrivalPortName',
        label: '目的港'
    },
    {
        prop: 'transportMode',
        label: '运输方式',
        width: '120'
    },
    {
        prop: 'transferPort',
        label: '直达/中转',
        width: '120'
    },
    {
        prop: 'deapportDeaprture',
        label: '进港未离港',
        width: '180'
    },
    {
        prop: 'departureArrport',
        label: '离港未到港',
        width: '180'
    },
    {
        prop: 'transportDeapport',
        label: '中转港未离港',
        width: '180'
    },
    {
        prop: 'departureTransport',
        label: '离港未到中转港',
        width: '180'
    },
    {
        prop: 'arrportBl',
        label: '到港未提货',
        width: '180'
    }
]

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


// 调用DialogForm打开弹窗方法
const formRef = ref()
const open = (type: string, id?: number) => {
    formRef.value.open(type, id)
}

// 打开增加功能弹窗
const AddTimeRules = () => {
    open('增加')
}

</script>
<style lang="scss" scoped>
.edit-btn {
    background-color: #67C23A;
    border: none;
}

.delete-btn {
    background-color: #F56C6C;
    border: none;
}
</style>