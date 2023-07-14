<template>
    <div>
        <el-table :data="additionalMsg" border size="small" style="width: 100%"
            :header-cell-style="{ background: '#C8D7EE', color: '#606266' }">
            <el-table-column label="费用名称" align="center">
                <template #default="scope">
                    <MyInputTable v-model="scope.row.feeBillName" :tableId="scope.$index" :valueKey="tableConfig.valueKey"
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
                    <!-- <el-button type="primary" text v-if="scope.$index != 0">
                        编辑
                    </el-button> -->
                    <el-button type="danger" @click="toDelItem(scope.row.id)" text v-if="scope.$index != 0">
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
        "feeBillName": "",
    }
])

const tableConfig = ref(
    {
        type: 'inputTable',
        field: 'feeBillName',
        placeholder: '',
        label: ' ',
        disabled: true,
        valueKey: 'itemName',
        clearData: () => {
        },
        setFormData: (row) => {
            console.log(row, 999)
            additionalMsg.value[0]['itemId'] = row.id
            additionalMsg.value[0]['feeBillName'] = row.name
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
    console.log(fileUrl.value, 8080)
}

const ifCanShow = ref(false)
// 获取额外费用明细
// 额外费用明细列表
let dataList: any = ref([])
const getExtraFeeDetail = async (id) => {
    ifCanShow.value = true
    const data = await ExtraExpenseApi.selectAddition({ id })
    if (data) {
        dataList.value.splice(0, 0, {
            "id": "",
            "itemId": "",
            "feePrice": "",
            "feeNumber": "",
            "notes": "",
            "price": "",
            "itemName": "",
            "feeBillName": ""
        })
        dataList.value.push(data)
        additionalMsg.value = dataList.value
        ifCanShow.value = false
    }
}

// const emits = defineEmits(['success'])
// 增加额外费用
const toAddItem = async () => {
    let params = {
        "itemId": additionalMsg.value[0].itemId,
        "feePrice": additionalMsg.value[0].feePrice,
        "feeNumber": additionalMsg.value[0].feeNumber,
        "notes": additionalMsg.value[0].notes,
        "voucherUrl": fileUrl.value,
        "price": additionalMsg.value[0].price,
        "feeBillName": additionalMsg.value[0].feeBillName
    }
    const data = Object.assign({}, props.basicData, params)
    const res = await ExtraExpenseApi.createAddition(data)
    getExtraFeeDetail(res)
    if (res) {
        ElMessage.success('添加成功！')
    } else {
        ElMessage.success('添加失败！')
    }
}

const { t } = useI18n()
const message = useMessage() // 消息弹窗
//删除额外费用
const toDelItem = async (id: number) => {
    try {
        // 删除的二次确认
        await message.delConfirm()
        // 发起删除
        // console.log(id)
        await ExtraExpenseApi.deleteAddition({ id })
        message.success(t('common.delSuccess'))
        // 刷新列表
        // dataList.value.filter((item) => { return item.id === id })
        dataList.value.forEach((item, index) => {
            if (item.id === id) {
                dataList.value.splice(index, 1)
            }
        })
        additionalMsg.value = dataList.value
    } catch { }
}

onMounted(async () => {

})

</script>
<style lang="scss" scoped></style>
