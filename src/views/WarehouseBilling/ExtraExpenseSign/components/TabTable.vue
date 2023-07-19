<template>
    <div>
        <el-table v-loading="ifCanShow" :data="additionalMsg" border size="small" style="width: 100%"
            :header-cell-style="{ background: '#C8D7EE', color: '#606266' }">
            <el-table-column label="费用名称" align="center">
                <template #default="scope">
                    <MyInputTable v-model="scope.row.feeBillName" :disabled="props.disabled" :tableId="scope.$index"
                        :valueKey="tableConfig.valueKey" :tableOption="tableConfig.tableOption" :tableConfig="tableConfig"
                        :setFormData="tableConfig.setFormData" :clearData="tableConfig.clearData" />
                </template>
            </el-table-column>
            <el-table-column label="单价" align="center">
                <template #default="scope">
                    <el-input type="number"
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.feePrice" :disabled="props.disabled" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
                <template #default="scope">
                    <el-input type="number"
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.feeNumber" :disabled="props.disabled" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="金额" align="center">
                <template #default="scope">
                    <el-input type="number"
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.price" :disabled="props.disabled" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
                <template #default="scope">
                    <el-input
                        oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                        v-model="scope.row.notes" :disabled="props.disabled" placeholder="" />
                </template>
            </el-table-column>
            <el-table-column label="凭证" align="center">
                <template #default="scope">
                    <span>
                        <Upload @getFileUrl="getFileUrl" @uploadSuccess="uploadSuccess(scope.$index)"
                            :disabled="props.disabled" text="上传" />
                    </span>
                    <!-- <span>
                        <Upload @getFileUrl="getFileUrl" @uploadSuccess="uploadSuccess(scope.$index)"
                            :disabled="props.disabled" text="重新上传" />
                    </span> -->
                </template>
            </el-table-column>
            <el-table-column v-if="showOperate" fixed="right" label="操作" align="center" width="170">
                <template #default="scope">
                    <el-button type="danger" @click="toDelItem(scope.row.fid)" text v-if="scope.$index != 0">
                        删除
                    </el-button>
                    <el-button type="primary" text @click="toAddItem" v-if="scope.$index == 0" :disabled="props.disabled">
                        添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="header-bottom-btn">
        <ElButton :disabled="savaBtnStatus" type="primary" @click="saveExpenseDetail">保存</ElButton>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElMessage } from 'element-plus'
import _ from 'lodash-es'
import Upload from './Upload.vue';
import MyInputTable from './MyInputTable.vue';
import * as ExtraExpenseApi from '@/api/warehousebill/extrabillsign'
const props = defineProps({
    basicData: {
        type: Object,
        default: () => { }
    },
    disabled: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number
    }
})


const additionalMsg: any = ref([])

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
    if (url) {
        ElMessage.success('上传成功！')
        fileUrl.value = url
        return;
    }
    ElMessage.error('上传失败！')
}

// 上传图片成功，录入对应索引号下的对象的url中
const uploadSuccess = (index) => {
    console.log(index, 'index')
    additionalMsg.value[index]["voucherUrl"] = fileUrl.value
}


const ifCanShow = ref(false)
const showOperate = ref(true)
// 额外费用明细列表
const getExtraFeeDetail = async () => {
    ifCanShow.value = true
    const data = await ExtraExpenseApi.selectAddition({ id: props.id })
    showOperate.value = false
    additionalMsg.value.push({
        "itemId": data.itemId,
        "feeBillName": data.itemName,
        "feePrice": data.feePrice,
        "feeNumber": data.feeNumber,
        "notes": data.notes,
        "price": data.price,
        "voucherUrl": data.voucherUrl
    })
    ifCanShow.value = false
}

// const emits = defineEmits(['success'])
// 增加额外费用
let dataList: any = ref([])
let index = ref(0)
let savaBtnStatus = ref(true)
const toAddItem = async () => {
    savaBtnStatus.value = false
    dataList.value = additionalMsg.value
    dataList.value.splice(0, 0, {
        "fid": index.value++,
        "itemId": "",
        "feePrice": "",
        "feeNumber": "",
        "notes": "",
        "price": "",
        "feeBillName": "",
        "voucherUrl": ""
    })
    additionalMsg.value = dataList.value
}

const saveExpenseDetail = async () => {
    if (props.id) {
        let params = _.cloneDeep(props.basicData)
        params["itemId"] = additionalMsg.value[0]["itemId"]
        params["feePrice"] = additionalMsg.value[0]["feePrice"]
        params["feeNumber"] = additionalMsg.value[0]["feeNumber"]
        params["notes"] = additionalMsg.value[0]["notes"]
        params["price"] = additionalMsg.value[0]["price"]
        params["voucherUrl"] = additionalMsg.value[0]["voucherUrl"]
        const res = await ExtraExpenseApi.updateAddition(params)
        if (res) {
            ElMessage.success('修改成功！')
        } else {
            ElMessage.success('修改失败！')
        }
    } else {
        let list = dataList.value.filter((element, index) => { if (index > 0) return element })
        const data = Object.assign({}, props.basicData, { 'detailsList': list })
        const res = await ExtraExpenseApi.createAdditionDetail(data)
        if (res) {
            ElMessage.success('添加成功！')
        } else {
            ElMessage.success('添加失败！')
        }
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
        message.success(t('common.delSuccess'))
        // 刷新列表
        dataList.value.forEach((item, index) => {
            if (item.fid === id) {
                dataList.value.splice(index, 1)
            }
        })
    } catch { }
}

onBeforeMount(() => {
    if (props.id) {
        console.log(8888)
        savaBtnStatus.value = false
        getExtraFeeDetail()
    } else {
        additionalMsg.value.push(
            {
                "fid": index.value++,
                "itemId": "",
                "feePrice": "",
                "feeNumber": "",
                "notes": "",
                "price": "",
                "feeBillName": "",
                "voucherUrl": ""
            })
    }
})

</script>
<style lang="scss" scoped>
.header-bottom-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.25rem;
    margin-right: 1.75rem;
}
</style>
