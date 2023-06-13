<template>
    <TableK class="table" url="/jinkotms/baseWarehouse/page" method="get" :params="formData" ref="myTable"
        :tableOption="tableOption">
        <template #buttons>
            <TopSearchForm :formOption="formOption" />
            <div class="btn-box">
                <ElButton @click="search">{{ t('warehousemanage.searchButton') }}
                </ElButton>
                <ElButton @click="openForm('增加')" key="primary" type="primary" plain :icon="Plus">{{
                    t('warehousemanage.addButton') }}</ElButton>
                <ElButton key="primary" type="primary" plain :icon="Upload">导入</ElButton>
                <ElButton key="primary" type="primary" plain :icon="Download">导出</ElButton>
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
import { Plus, Upload, Download } from '@element-plus/icons-vue'
import WarehouseManageDialog from './WarehouseManageForm/index.vue'
import TopSearchForm from './TopSearchForm/index.vue'
import TableK from '@/components/TableK/index.vue'
import * as WarehouseManageApi from '@/api/warehousemanage'

const { t } = useI18n()

// 新增/修改操作
const myTable = ref()
let formData = ref({
    id: undefined,
    code: undefined,
    name: undefined,
    longitude: undefined,
    latitude: undefined,
    bsWhareaCode: undefined,
    bsWhareaName: undefined,
    bsWhareaId: undefined
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
        placeholder: `请填写具体地址`,
        label: `具体地址`,
        rules: [
            { message: `请填写具体地址`, trigger: 'change' }
        ]
    },
    {
        type: 'select',
        field: 'country',
        placeholder: '请选择国家',
        label: '国家',
        requestOptions: {
            url: '/warehouse/list',
            method: 'get',
            params: {},
            handleOptions: (res: any) => {
                return res.data.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.code
                    }
                })
            }
        },
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
::v-deep .table {
    padding: 0 !important;
}

.btn-box {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3.25rem;
    margin-bottom: .625rem;
    width: 100%;
    border: 1px solid #dadcdf;
    background-color: #f5f8ff;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;
}
</style>
