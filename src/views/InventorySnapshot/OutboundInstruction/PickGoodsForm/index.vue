<template>
    <div>
        <TableK url="/gsc/outbound/pallets/getPalletsPage" method="post" :layout="layout" :data="formData" ref="tableRef"
            :firstPages="10" :tableOption="tableOption" :showIndex="true" @selectThisColumn="selectThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
<!--            <template #updateTime="{ row }">-->
<!--                <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>-->
<!--            </template>-->
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="open('绑定车辆')">绑定车辆</el-button>
        <el-button class="button" type="primary" @click="open('出库')">出库</el-button>
    </div>
    <DialogOutbound ref="refDialog" :outIds="outIds" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
// import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../components/SearchOutbound.vue'
import DialogOutbound from '../components/DialogOutbound.vue'
let formData = ref({})

// const { t } = useI18n()
const layout = ref("")
const tableOption = reactive([
    {
        prop: 'goodsCode',
        label: '物料编码',
        width: '180'
    },
    {
        prop: 'goodsName',
        label: '物料名称',
        width: '180'
    },
    {
        prop: 'bl',
        label: '提单号',
        width: '180'
    },
    {
        prop: 'bsWhName',
        label: '仓库名称',
        width: '180'
    },
    {
        prop: 'numberPlate',
        label: '车牌号',
        width: '180'
    },
    {
        prop: 'quantity',
        label: '数量',
        width: '180'
    },
    {
        prop: 'palletsNumber',
        label: '托盘数量',
        width: '180'
    },
    {
        prop: 'weight',
        label: '重量',
        width: '180'
    },
    {
        prop: 'volume',
        label: '体积',
        width: '180'
    },
    // {
    //     prop: 'updater',
    //     label: '更新人',
    //     width: '180'
    // },
    // {
    //     prop: 'updateTime',
    //     label: '更新时间',
    //     slotName: 'updateTime',
    //     width: '180'
    // }
])
// 入库指令首页搜索框数据
const tableRef = ref()
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'goodsCode',
        placeholder: '请输入物料编号',
        label: '物料编号：'
    },
    {
        type: 'input',
        field: 'goodsName',
        placeholder: '请输入物料名称',
        label: '物料名称：'
    }
])

// 搜索
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




// 多选行
let outIds: any = ref([]);
// 车牌号
let numberPlateArr: any = ref([])
// 判断所选中的行是否均绑定车辆
let isNotAllBind = ref(true)
const selectThisColumn = (rows) => {
    outIds.value = []
    numberPlateArr.value = []
    isNotAllBind.value = true
    rows.forEach((item) => {
        if (item.numberPlate === null) {
            isNotAllBind.value = false
        }
        numberPlateArr.value.push(item.numberPlate)
        outIds.value.push(item.id)
    })
}



// 确认出库
const refDialog = ref()
let isShow = ref(false)
const open = (type: string) => {
    if (outIds.value.length === 0) {
        ElMessage.error('请选择行！')
        return;
    } else {
        if (type === '出库') {
            if (isNotAllBind.value === false) {
                ElMessage.error('所选中的行存为未绑定车辆,请先绑定车辆再出库!')
                return;
            }
            isShow.value = true
            refDialog.value.open('出库', '确认出库', '您确认要出库吗')
        } else if (type === '绑定车辆') {
            isShow.value = true
            refDialog.value.open('绑定车辆', '绑定车辆', '您确认要绑定车辆吗', numberPlateArr.value)
        }
    }
}


defineExpose({
    refresh
})
</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}

.box-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    width: 100%;
    margin: 1.25rem 0;

    .button {
        margin-right: 1.25rem;
    }
}

.edit-btn {
    font-weight: 700;
    border: none;
}
</style>
