<template>
    <div class="top">
        <div class="title">基础信息</div>
        <div class="content">
            <Formk :formOption="formOption" v-model:formState="formData" labelWidth="9em" />
        </div>
    </div>
    <div class="header-bottom-btn">
        <ElButton @click="saveBaseInfo" :disabled="disabled" type="primary">保存</ElButton>
    </div>
    <div class="center">
        <div class="title">计费规则明细</div>
        <div class="content">
            <el-table height="350" :data="FeeItemList" :header-cell-style="{ 'text-align': 'center' }"
                v-loading="ifCanShowRuleDetail" style="width: 100%">
                <el-table-column label="序号" type="index" width="100" align="center" />
                <el-table-column label="计费项" align="center">
                    <template #default="scope">
                        <MyInputTable v-model="scope.row.feeItemName" :tableId="scope.$index"
                            :disabled="disabled || itemDisabled" :valueKey="tableConfigFee.valueKey"
                            :tableOption="tableConfigFee.tableOption" :tableConfig="tableConfigFee"
                            :setFormData="tableConfigFee.setFormData" :clearData="tableConfigFee.clearData" />
                    </template>
                </el-table-column>
                <el-table-column label="计费维度" align="center">
                    <template #default="scope">
                        <el-select :disabled="disabled || itemDisabled" v-model="scope.row.feeDim" placeholder="">
                            <el-option v-for="(item, index) in getIntDictOptions('billing_metrics')" :key="index + 'a'"
                                :label="item.label" :value="item.value" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="计费周期" align="center">
                    <template #default="scope">
                        <el-select :disabled="disabled || itemDisabled" v-model="scope.row.feeCycle" class="m-2"
                            placeholder="">
                            <el-option v-for="(item, index) in getIntDictOptions('billing_cycle')" :key="index + 'a'"
                                :label="item.label" :value="item.value" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="单价" align="center">
                    <template #default="scope">
                        <el-input type="number"
                            oninput="if(value < 0 || value == '' || value == 0 || value == null) value = null; if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"
                            :disabled="disabled || itemDisabled" v-model="scope.row.feePrice" placeholder="请输入单价" />
                    </template>
                </el-table-column>
                <el-table-column label="币种" align="center">
                    <template #default="scope">
                        <MyInputTable v-model="scope.row.feeCyName" :tableId="scope.$index"
                            :disabled="disabled || itemDisabled" :valueKey="tableConfigCurrency.valueKey"
                            :tableOption="tableConfigCurrency.tableOption" :tableConfig="tableConfigCurrency"
                            :setFormData="tableConfigCurrency.setFormData" :clearData="tableConfigCurrency.clearData" />
                    </template>
                </el-table-column>
                <el-table-column label="报价生效日期" align="center">
                    <template #default="scope">
                        <div class="time-picker">
                            <el-date-picker clearable :disabled="disabled || itemDisabled" v-model="scope.row.feeBegin"
                                value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="请选择报价生效日期" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="报价失效日期" align="center">
                    <template #default="scope">
                        <div class="time-picker">
                            <el-date-picker class="time-picker" clearable :disabled="disabled || itemDisabled"
                                v-model="scope.row.feeEnd" value-format="YYYY-MM-DD HH:mm:ss" type="datetime"
                                placeholder="请选择报价失效日期" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="170">
                    <template #default="scope">
                        <el-button type="primary" text @click="toEditItem(scope.row, scope.$index)"
                            v-if="scope.$index != 0">
                            编辑
                        </el-button>
                        <el-button type="danger" text @click="toDelItem(scope.row.id)" v-if="scope.$index != 0">
                            删除
                        </el-button>
                        <el-button type="primary" text @click="toAddItem" v-if="scope.$index == 0">
                            添加
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-view">
                <Pagination :total="linePageParams.total" v-model:page="linePageParams.pageNo"
                    v-model:limit="linePageParams.pageSize" @pagination="toGetRuleDetail(getId)" />
            </div>
        </div>
    </div>
    <!-- <div class="bottom-btn">
        <ElButton type="info" @click="cancle">取消</ElButton>
        <ElButton type="primary" :disabled="disabled" @click="saveTemplate">保存模板</ElButton>
    </div> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus';
import Formk from '@/components/FormK/index.vue'
import { formatDate } from '@/utils/formatTime'
import { getIntDictOptions } from '@/utils/dict'
import * as TemplateRulesApi from '@/api/billingtemplate/templaterule'
import MyInputTable from "./MyInputTable.vue"
const { t } = useI18n()

const route = useRoute()
const getId = ref(route.query.id ? route.query.id : undefined)
const getType = route.query.type ? Number(route.query.type) : undefined
const disabled = getType === 0 ? true : false
const itemDisabled = ref(false)

//分页
const linePageParams = ref({
    total: 0,
    pageNo: 1,
    pageSize: 5
})

const FeeItemList = ref([
    {
        "feeItemId": '',
        "feeItemName": '',
        "feeDim": '',
        "feeCycle": '',
        "feePrice": '',
        "feeCyId": '',
        "feeCyName": '',
        "feeBegin": "",
        "feeEnd": ""
    }
])

const formData = ref({})

const tableConfigFee = ref(
    {
        type: 'inputTable',
        field: 'feeItemName',
        placeholder: '',
        label: ' ',
        disabled: true,
        valueKey: 'feeItemName',
        clearData: () => {
        },
        setFormData: (row, index) => {
            console.log('row', row, index)
            FeeItemList.value[index].feeItemId = row.id
            FeeItemList.value[index].feeItemName = row.name
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

const tableConfigCurrency = ref(
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '',
        label: '',
        disabled: true,
        valueKey: 'CurrencyId',
        clearData: () => {
        },
        setFormData: (row, index) => {
            FeeItemList.value[index].feeCyId = row.id
            FeeItemList.value[index].feeCyName = row.name
        },
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
)

//编辑功能
const toEditItem = async (row, index) => {
    console.log('row', row, index)
    let params = {
        "id": row.id,
        "whFeeTmplId": getId.value,
        "feeItemId": row.feeItemId,
        "feeDim": row.feeDim,
        "feeCycle": row.feeCycle,
        "feePrice": row.feePrice,
        "feeCyId": row.feeCyId,
        "feeBegin": new Date(row.feeBegin).getTime(),
        "feeEnd": new Date(row.feeEnd).getTime(),
    }
    if (params.feeBegin > params.feeEnd) {
        ElMessage.error('报价生效效时间不得大于报价失效时间！')
        return
    }
    let data = await TemplateRulesApi.updateTempDetail(params)
    if (data) {
        ElMessage.success('更新成功！')
    } else {
        ElMessage.success('更新失败！')
    }
}


const ifCanShowRuleDetail = ref(false)
//获取仓储费用规则明细的分页
const toGetRuleDetail = async (id) => {
    ifCanShowRuleDetail.value = true
    let data = await TemplateRulesApi.getTemplateDetail({
        whFeeTmplId: id,
        pageNo: linePageParams.value.pageNo,
        pageSize: linePageParams.value.pageSize
    })
    // console.log(data.list, 999999)
    let dataList = data.list
    for (let count = 0; count < dataList.length; count++) {
        dataList[count].feeBegin = formatDate(dataList[count].feeBegin, 'YYYY-MM-DD hh:mm:ss')
        dataList[count].feeEnd = formatDate(dataList[count].feeEnd, 'YYYY-MM-DD hh:mm:ss')
    }
    dataList.splice(0, 0, {
        "feeItemId": '',
        "feeItemName": '',
        "feeDim": '',
        "feeCycle": '',
        "feePrice": '',
        "feeCyId": '',
        "feeCyName": '',
        "feeBegin": "",
        "feeEnd": ""
    })
    FeeItemList.value = data.list
    // console.log('FeeItemList.value', FeeItemList.value)
    linePageParams.value.total = data.total
    ifCanShowRuleDetail.value = false
}


const saveBaseInfo = async () => {
    console.log('formData', formData.value)
    let params = {
        "name": formData.value.name,
        "bsWhType": formData.value.bsWhType,
        "bsWhareaId": formData.value.bsWhareaId,
        "notes": formData.value.notes
    }
    if (getId.value) {
        Object.assign(params, { id: getId.value })
        let data = await TemplateRulesApi.updateTempDetail(params)
        if (data) {
            ElMessage.success('更新成功！')
        } else {
            ElMessage.error('更新失败！')
        }
    } else {
        let data = await TemplateRulesApi.createTemplate(params)
        // console.log(data, 'getId')
        if (data) {
            getId.value = data
            itemDisabled.value = false
            ElMessage.success('创建成功！')
        } else {
            ElMessage.error('创建失败！')
        }
    }
}


// let notes = ref()

const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入计费规则名称',
        label: '计费规则名称：',
        width: '500px',
        disabled: route.query.type,
        rules: [
            { required: true, message: '请输入仓库', trigger: 'change' }
        ],
    },
    {
        type: 'inputTable',
        field: 'bsWhareaName',
        placeholder: '',
        label: '区域：',
        disabled: route.query.type,
        rules: [
            { required: true, message: '请输入区域', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {
        },
        setFormData: (row) => {
            formData.value['bsWhareaId'] = row.id
        },
        tableConfig: {
            url: '/gsc/wharea/whareaPage',
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
        type: 'select',
        field: 'bsWhType',
        placeholder: '',
        label: '仓库种类',
        disabled: route.query.type,
        options: getIntDictOptions('billing_warehouse_type'),
        rules: [
            { required: true, message: '请选择仓库种类', trigger: 'blur' }
        ]
    },
    {
        type: 'input',
        field: 'notes',
        placeholder: '其他备注信息，200字以内',
        typeName: 'textarea',
        label: '备注：',
        width: '500px',
        disabled: disabled,
        // rules: [
        //   { required: true, message: '请输入仓库', trigger: 'change' }
        // ],
    },
])


const message = useMessage() // 消息弹窗
//删除项
const toDelItem = async (id: number) => {
    try {
        // 删除的二次确认
        await message.delConfirm()
        // 发起删除
        // console.log(id)
        await TemplateRulesApi.deleteTempDetail({ id })
        message.success(t('common.delSuccess'))
        // 刷新列表
        await toGetRuleDetail(getId.value)
    } catch { }
}


//添加项
const toAddItem = async () => {
    let params = {
        "whFeeTmplId": getId.value,
        "feeItemId": FeeItemList.value[0].feeItemId,
        "feeDim": FeeItemList.value[0].feeDim,
        "feeCycle": FeeItemList.value[0].feeCycle,
        "feePrice": FeeItemList.value[0].feePrice,
        "feeCyId": FeeItemList.value[0].feeCyId,
        "feeBegin": new Date(FeeItemList.value[0].feeBegin).getTime(),
        "feeEnd": new Date(FeeItemList.value[0].feeEnd).getTime(),
    }
    // console.log('新增的参数', params)
    if (params.feeBegin > params.feeEnd) {
        ElMessage.error('报价生效效时间不得大于报价失效时间！')
        return
    }
    let data = await TemplateRulesApi.createTemplateDetail(params)
    if (data) {
        toGetRuleDetail(getId.value)
        ElMessage.success('模板绑定成功！')
    } else {
        ElMessage.error('模板绑定失败！')
    }
}

// 取消
// const router = useRouter()
// const cancle = () => {
//     router.go(-1)
// }

// const saveTemplate = async () => {

// }

//回显计费规则基础信息
const toGetRuleBaseInfo = async (id) => {
    let data = await TemplateRulesApi.getTemplate({ id })
    formData.value = data
    console.log(formData.value, 9999)
}

/** 初始化 **/
onMounted(async () => {
    if (getId.value) {
        toGetRuleBaseInfo(getId.value)
        toGetRuleDetail(getId.value)
    } else {
        itemDisabled.value = true
    }
})


</script>
<style lang="scss" scoped>
.title {
    padding: .625rem;
    background-color: #409EFF;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
}

.content {
    margin-top: 1.25rem;
}

.top {
    :deep(.el-form) {
        display: inline-flexbox;
        flex-wrap: wrap;
        width: 100%;
    }

    :deep(.el-form-item) {
        flex: 1;
    }

    :deep(.el-form-item__content) {
        width: 500px !important;
    }
}

.header-bottom-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 25px 25px 0;
}

.center {
    :deep(.el-form-item) {
        margin: 0;
    }

    :deep(.el-form-item__content) {
        width: 50px !important;
    }

    margin-bottom: 1.25rem;
}


// .bottom {
//     .title {
//         padding: .625rem;
//         background-color: #CCCCCC;
//         color: #fff;
//         font-size: 14px;
//         font-weight: 700;
//     }

//     .content {
//         margin-top: 1.25rem;
//     }
// }

.bottom-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.25rem 0;
}
</style>
