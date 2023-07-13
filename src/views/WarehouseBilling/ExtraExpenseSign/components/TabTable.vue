<template>
    <div>
        {{ props.basicData }}
        <el-table :data="additionalMsg" border size="small" style="width: 100%"
            :header-cell-style="{ background: '#C8D7EE', color: '#606266' }">
            <el-table-column label="费用名称" align="center">
                <template #default="scope">
                    <MyInputTable v-model="scope.row.itemName" :tableId="scope.$index" :valueKey="tableConfig.valueKey"
                        :tableOption="tableConfig.tableOption" :tableConfig="tableConfig"
                        :setFormData="tableConfig.setFormData" :clearData="tableConfig.clearData" />
                </template>
            </el-table-column>
            <el-table-column label="单价" align="center">
                <template #default="scope">
                    <el-input
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.feePrice" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
                <template #default="scope">
                    <el-input
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.feeNumber" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="金额" align="center">
                <template #default="scope">
                    <el-input
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.price" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
                <template #default="scope">
                    <el-input
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.notes" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="凭证" align="center">
                <template #default>
                    <Upload @getFileUrl="getFileUrl" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="170">
                <template #default="scope">
                    <el-button type="primary" text v-if="scope.$index != 0">
                        编辑
                    </el-button>
                    <el-button type="danger" text v-if="scope.$index != 0">
                        删除
                    </el-button>
                    <el-button type="primary" text @click="toAddItem" v-if="scope.$index == 0">
                        添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElMessage } from 'element-plus'

import Upload from './Upload.vue';
import MyInputTable from './MyInputTable.vue';
import * as ExtraExpenseApi from '@/api/warehousebill/extrabillsign'
const props = defineProps({
    basicData: {
        type: Object,
        default: () => { }
    }
})


const additionalMsg = ref([
    {
        "itemId": "",
        "feePrice": "",
        "feeNumber": "",
        "notes": "",
        "price": "",
        "itemName": ""
    }
])

const tableConfig = ref(
    {
        type: 'inputTable',
        field: 'itemName',
        placeholder: '',
        label: ' ',
        disabled: true,
        valueKey: 'itemName',
        clearData: () => {
        },
        setFormData: (row, index) => {
            console.log('row', row, index)
            additionalMsg.value[index].itemId = row.id
            additionalMsg.value[index].itemName = row.name
        },
        url: '/gsc/items/page',
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
)

// 获取文件名
const fileUrl = ref()
const getFileUrl = (url) => {
    fileUrl.value = url
}

const toAddItem = async () => {
    let params = {
        "itemId": additionalMsg.value[0].itemId,
        "feePrice": additionalMsg.value[0].feePrice,
        "feeNumber": additionalMsg.value[0].feeNumber,
        "notes": additionalMsg.value[0].notes,
        "voucherUrl": fileUrl.value,
        "price": additionalMsg.value[0].price
    }
    Object.assign(props.basicData, params)
    const res = await ExtraExpenseApi.createAddition(props.basicData)
    if (res) {
        ElMessage.success('添加成功！')
    } else {
        ElMessage.success('添加失败！')
    }

}

onMounted(async () => {

})

</script>
<style lang="scss" scoped></style>
