<template>
    <TableK class="table" url="/jinkotms/baseWarehouse/page" method="get" :params="formData" ref="myTable"
        :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false">
        <template #buttons>
            <TopSearchForm :formOption="formOption" />
            <div class="btn-box">
                <ElButton class="btn" @click="openForm('增加')" type="primary" :icon="Plus">{{
                    t('warehousemanage.addButton') }}</ElButton>
                <ElButton class="btn" type="primary" :icon="Upload">导入</ElButton>
                <ElButton class="btn" type="primary" :icon="Download">导出</ElButton>

                <ElButton class="btn" @click="refresh" :icon="Refresh">{{ t('warehousemanage.refreshButton') }}</ElButton>
                <ElButton class="btn" @click="search" :icon="ZoomIn">全部查找</ElButton>
            </div>
        </template>
        <template #operation="{ operateRow }">
            <ElButton type="warning" @click="openForm('修改')" :icon="Edit" />
            <ElButton type="danger" @click="deleteItem(operateRow)" :icon="Delete" />
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
let formData = ref({
    id: undefined,
    countryCode: undefined,
    provinceCode: undefined,
    cityCode: undefined,
    address: undefined,
    longitude: undefined,
    latitude: undefined,
    zipCode: undefined,
    name: undefined,
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
            url: '/bidding/area/location/findCountry',
            method: 'get',
            params: { id: 2 },
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
        prop: 'countryCode',
        label: '国家',
        width: '180'
    },
    {
        prop: 'provinceCode',
        label: '省份',
        width: '180'
    },
    {
        prop: 'cityCode',
        label: '城市',
        width: '180'
    },
    {
        prop: 'address',
        label: '具体地址',
        width: '180'
    },
    {
        prop: 'longitude',
        label: '经度',
        width: '180'
    },
    {
        prop: 'latitude',
        label: '纬度',
        width: '180'
    },
    {
        prop: 'zipCode',
        label: 'zip code',
        width: '180'
    },
    {
        prop: 'name',
        label: '仓库名称',
        width: '180'
    },
    {
        prop: 'cityCode',
        label: '仓库属性',
        width: '180'
    }

])

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
</style>
