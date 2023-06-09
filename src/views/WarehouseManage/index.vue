<template>
    <TableK url="/jinkotms/baseWarehouse/page" method="get" :params="formData" ref="myTable" :tableOption="tableOption">
        <template #buttons>
            <div class="search-box">
                <!-- {{ formData }} -->
                <FormK :formOption="formOption" v-model:formState="formData" labelWidth="5rem" />
            </div>
            <div class="btn-box">
                <ElButton @click="search">{{ t('warehousemanage.searchButton') }}</ElButton>
                <ElButton @click="openForm('增加')">{{ t('warehousemanage.addButton') }}</ElButton>
                <ElButton @click="deleteItem">{{ t('warehousemanage.deleteButton') }}</ElButton>
                <ElButton @click="openForm('修改')">{{ t('warehousemanage.editButton') }}</ElButton>
                <ElButton @click="refresh">{{ t('warehousemanage.refreshButton') }}</ElButton>
            </div>
        </template>
        <template #date="{ row }">
            <span style="color: red">{{ row.row.date }}</span>
        </template>
    </TableK>
    <WarehouseManageDialog ref="formRef" @success="refresh" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElButton } from 'element-plus'
import WarehouseManageDialog from './WarehouseManageForm/index.vue'
import FormK from '@/components/FormK/index.vue'
import TableK from '@/components/TableK/index.vue'
import * as WarehouseManageApi from '@/api/warehousemanage'

const { t } = useI18n()

// 新增/修改操作
const myTable = ref()
let formData = ref({
    id: null,
    code: '',
    name: '',
    longitude: null,
    latitude: null,
    bsWhareaCode: '',
    bsWhareaName: '',
    bsWhareaId: null
})
const formRef = ref()
const openForm = (type: string) => {
    if (type === '修改') {
        let id = myTable.value.selectAll[0].id
        console.log(id, 'selectId')
        formRef.value.open(type, id)
    } else {
        formRef.value.open(type)
    }
}


// 搜索操作
const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: `${t('warehousemanage.nameInput')}`,
        label: `${t('warehousemanage.name')}`,
        rules: [
            { message: `${t('warehousemanage.nameInput')}`, trigger: 'change' }
        ]
    }
])
const search = () => {
    refresh()
}




// 表格区域

const tableOption = reactive([
    {
        prop: 'id',
        label: `ID`,
        width: '180'
    },
    {
        prop: 'code',
        label: `${t('warehousemanage.code')}`
    },
    {
        prop: 'name',
        label: `${t('warehousemanage.name')}`
    },
    {
        prop: 'longitude',
        label: `${t('warehousemanage.longitude')}`
    },
    {
        prop: 'latitude',
        label: `${t('warehousemanage.latitude')}`
    },
    {
        prop: 'bsWhareaCode',
        label: `${t('warehousemanage.whareaCode')}`
    },
    {
        prop: 'bsWhareaName',
        label: `${t('warehousemanage.whareaName')}`
    },
    {
        prop: 'bsWhareaId',
        label: `${t('warehousemanage.WhareaId')}`
    }
])

const refresh = () => {
    myTable.value.refresh()
}


// 删除
let deleteId = ref(0)
const deleteItem = async () => {
    deleteId.value = myTable.value.selectAll[0].id
    const res = await WarehouseManageApi.deleteWarehouseItem({ id: deleteId.value })
    console.log(res, 'delete')
    refresh()
}
</script>
<style lang="scss" scoped>
.btn-box {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3.25rem;
    margin-bottom: .625rem;
    width: 100%;
}
</style>
