<template>
    <div class="main">
        <TableK url="/gsc/baseWarehouse/page" method="get" :params="formData" ref="myTable" :tableOption="tableOption"
            :showFixedOperation="true" :showCheckBox="false">
            <template #buttons>
                <TopSearchForm :formOption="formOption" @clickSearch="clickSearch" @update:form-state="updateSearchData" />
                <div class="btn-box">
                    <ElButton class="btn" @click="openForm(`${t('warehousemanage.addButton')}`)" type="primary"
                        :icon="Plus">{{
                            t('warehousemanage.addButton') }}</ElButton>
                    <ElButton class="btn" type="primary" :icon="Upload">{{ t('warehousemanage.importButton') }}</ElButton>
                    <ElButton class="btn" type="primary" :icon="Download" @click="exportData">{{
                        t('warehousemanage.exportButton') }}</ElButton>
                    <ElButton class="btn" @click="refresh" :icon="Refresh">{{ t('warehousemanage.refreshButton') }}
                    </ElButton>
                    <ElButton class="btn" :icon="ZoomIn">{{ t('warehousemanage.searchAll') }}</ElButton>
                </div>
            </template>
            <template #country="{ row }">
                <span>{{ row.row.countryId }}</span>
            </template>
            <template #province="{ row }">
                <span>{{ row.row.provinceId }}</span>
            </template>
            <template #city="{ row }">
                <span>{{ row.row.cityId }}</span>
            </template>
            <template #operation="{ operateRow }">
                <ElButton class="edit-btn" type="warning"
                    @click="openForm(`${t('warehousemanage.editButton')}`, operateRow.id, operateRow.countryId)"
                    :icon="Edit" />
                <ElButton class="delete-btn" type="danger" @click="deleteItem(operateRow)" :icon="Delete" />
            </template>
        </TableK>
        <WarehouseManageDialog ref="formRef" @success="refresh" />
    </div>
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
const message = useMessage() // 消息弹窗


// 搜索操作
const formOption = reactive([
    {
        type: 'input',
        field: 'address',
        placeholder: `${t('warehousemanage.inputAddress')}`,
        label: `${t('warehousemanage.address')}`
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
        width: '200'
    },
    {
        prop: 'countryCode',
        label: `${t('warehousemanage.countryId')}`,
        slotName: 'country',
        width: '180'
    },
    {
        prop: 'provinceCode',
        label: `${t('warehousemanage.provinceId')}`,
        slotName: 'province',
        width: '180'
    },
    {
        prop: 'cityCode',
        label: `${t('warehousemanage.cityId')}`,
        slotName: 'city',
        width: '180'
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
    getRowAreaInfo(3)
    // getRowAreaInfo(1)
    // getRowAreaInfo(16)
})

const refresh = () => {
    myTable.value.refresh()
}


// 删除

const deleteItem = async (row) => {
    // console.log(row)
    try {
      // 删除的二次确认
      await message.delConfirm()
      // 发起删除
      await WarehouseManageApi.deleteWarehouseItem({ id: row.id })
      message.success(t('common.delSuccess'))
      // 刷新列表
      await refresh()
    } catch {}
    // console.log(res, 'delete')
}

// 导出
const exportData = async () => {
    console.log(1)
    await WarehouseManageApi.exportData({ countryId: 1, address: '1' })
}
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
}

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
