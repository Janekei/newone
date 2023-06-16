<template>
    <TableK class="table" url="/jinkotms/baseWarehouse/page" method="get" :params="formData" ref="myTable"
        :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false">
        <template #buttons>
            <TopSearchForm :formOption="formOption" @clickSearch="clickSearch" @update:form-state="updateSearchData" />
            <div class="btn-box">
                <ElButton class="btn" @click="openForm(`${t('warehousemanage.addButton')}`)" type="primary" :icon="Plus">{{
                    t('warehousemanage.addButton') }}</ElButton>
                <ElButton class="btn" type="primary" :icon="Upload">{{ t('warehousemanage.importButton') }}</ElButton>
                <ElButton class="btn" type="primary" :icon="Download" @click="exportData">{{
                    t('warehousemanage.exportButton') }}</ElButton>
                <ElButton class="btn" @click="refresh" :icon="Refresh">{{ t('warehousemanage.refreshButton') }}</ElButton>
                <ElButton class="btn" :icon="ZoomIn">{{ t('warehousemanage.searchAll') }}</ElButton>
            </div>
        </template>
        <template #country="{ row }">
            <span>{{ row.row.countryId }}</span>
        </template>
        <template #province="{ row }">
            <span>{{ row.row.countryId }}</span>
        </template>
        <template #city="{ row }">
            <span>{{ row.row.countryId }}</span>
        </template>
        <template #operation="{ operateRow }">
            <ElButton class="edit-btn" type="warning"
                @click="openForm(`${t('warehousemanage.editButton')}`, operateRow.id, operateRow.countryId)" :icon="Edit" />
            <ElButton class="delete-btn" type="danger" @click="deleteItem(operateRow)" :icon="Delete" />
        </template>
    </TableK>
    <WarehouseManageDialog ref="formRef" @success="refresh" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElButton } from 'element-plus'
import { Plus, Upload, Download, Delete, Edit, Refresh, ZoomIn } from '@element-plus/icons-vue'
import WarehouseManageDialog from './WarehouseManageForm/index.vue'
import TopSearchForm from './TopSearchForm/index.vue'
import TableK from '@/components/TableK/index.vue'
import * as WarehouseManageApi from '@/api/warehousemanage'

const { t } = useI18n()

// 新增/修改操作
const myTable = ref()
let formData = ref({})
const formRef = ref()
const openForm = (type: string, id?: number, countryId?: number) => {
    if (type === '增加' || type === 'Add') {
        formRef.value.open(type)
    } else {
        formRef.value.open(type, id, countryId)
    }
}


// 搜索操作
const formOption = reactive([
    {
        type: 'input',
        field: 'address',
        placeholder: `${t('warehousemanage.inputAddress')}`,
        label: `${t('warehousemanage.address')}`,
        rules: [
            { message: `${t('warehousemanage.inputAddress')}`, trigger: 'change' }
        ]
    },
    {
        type: 'select',
        field: 'countryId',
        label: `${t('warehousemanage.countryId')}`,
        requestOptions: {
            url: '/bidding/area/location/findCountry',
            method: 'get',
            params: { id: 0 },
            handleOptions: (res: any) => {
                return res.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        },
    }
])
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = val
}



// 表格区域
const tableOption = reactive([
    {
        prop: 'id',
        label: `ID`,
        width: '180'
    },
    {
        prop: 'countryCode',
        label: `${t('warehousemanage.countryId')}`,
        width: '180',
        slotName: 'country'
    },
    {
        prop: 'provinceCode',
        label: `${t('warehousemanage.provinceId')}`,
        width: '180',
        slotName: 'province'
    },
    {
        prop: 'cityCode',
        label: `${t('warehousemanage.cityId')}`,
        width: '180',
        slotName: 'city'
    },
    {
        prop: 'address',
        label: `${t('warehousemanage.address')}`,
        width: '180'
    },
    {
        prop: 'longitude',
        label: `${t('warehousemanage.longitude')}`,
        width: '180'
    },
    {
        prop: 'latitude',
        label: `${t('warehousemanage.latitude')}`,
        width: '180'
    },
    {
        prop: 'zipCode',
        label: 'Zip Code',
        width: '180'
    },
    {
        prop: 'name',
        label: `${t('warehousemanage.name')}`,
        width: '180'
    },
    {
        prop: 'cityCode',
        label: `${t('warehousemanage.cityId')}`,
        width: '180'
    }

])

// 获取国家、省份、城市信息
const getRowAreaInfo = async (id: number) => {
    const res = await WarehouseManageApi.getAreaData({ id })
    console.log(res, 'getRowAreaInfo')
}
onBeforeMount(() => {
    getRowAreaInfo(0)
})

const refresh = () => {
    myTable.value.refresh()
}


// 删除

const deleteItem = async (row) => {
    // console.log(row)
    const res = await WarehouseManageApi.deleteWarehouseItem({ id: row.id })
    console.log(res, 'delete')
    refresh()
}

// 导出
const exportData = async () => {
    console.log(1)
    await WarehouseManageApi.exportData({ countryId: 1, address: '1' })
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
    // background-color: #f5f8ff;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;

    .btn {
        color: #409EFF;
        background-color: #fff;
        border: .0625rem solid #d5d5d5;
    }
}

.edit-btn {
    background-color: #67C23A;
    border: none;
}

.delete-btn {
    background-color: #F56C6C;
    border: none;
}
</style>
