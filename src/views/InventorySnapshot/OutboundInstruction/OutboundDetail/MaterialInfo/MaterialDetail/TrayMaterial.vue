<template>
    托
    <div>
        <TableK url="/jinko/outbound-goods/list" method="get" :params="formData" ref="tableRef" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false" :showIndex="true"
            @click-this-column="clickThisColumn">
            <template #buttons>
                <SearchOutbound :formOption="formOptionHome" @click-search="clickSearch"
                    @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #updateTime="{ row }">
                <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
            </template>
        </TableK>
    </div>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backOperate">返回</el-button>
        <!-- <el-button v-else-if="props.isClickErrorBtn" class="button" type="primary" @click="errorRecord">异常登记</el-button> -->
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { formatTime } from '@/utils'
import TableK from '@/components/TableK/index.vue'
import SearchOutbound from '../../../components/SearchOutbound.vue'
const props = defineProps({
    goodsId: {
        type: Number,
        default: 0
    },
    iscloseTray: {
        type: Boolean,
        default: false
    }
})

const route = useRoute()
let id: number = parseInt(JSON.parse(route.query.id as any));
let formData = ref({
    goodsId: props.goodsId,
    id
})


// 返回部分入库箱维度详情页面
const emits = defineEmits(['update:changeCloseTray', 'backWaybill', 'showTrayList'])
const backOperate = () => {
    const params = !props.iscloseTray
    emits('update:changeCloseTray', params)
}

// const { t } = useI18n()
const tableOption = reactive([
    {
        prop: 'goodCode',
        label: '货品编码',
    },
    {
        prop: 'goodsName',
        label: '货品名称',
    },
    {
        prop: 'bl',
        label: '提单号',
    },
    {
        prop: 'bsWhId',
        label: '仓库名称',
    },
    {
        prop: 'bsWhAddress',
        label: '仓库地址',
    },
    {
        prop: 'goodsNumber',
        label: '数量',
    },
    {
        prop: 'palletQuantity',
        label: '托盘数量',
    },
    {
        prop: 'totalWeight',
        label: '重量',
    },
    {
        prop: 'totalVolume',
        label: '体积',
    },
    {
        prop: 'updater',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        slotName: 'updateTime'
    }
])
// 入库指令首页搜索框数据
const tableRef = ref()
const formOptionHome = reactive([
    {
        type: 'input',
        field: 'containerId',
        placeholder: '请输入箱号',
        label: '箱号：'
    },
    {
        type: 'input',
        field: 'lockNo',
        placeholder: '请输入锁号',
        label: '锁号：'
    }
])

// 搜索
let searchData = ref({})
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = ref({
        goodsId: props.goodsId,
        id
    })
    Object.assign(formData.value, val)
}
const resetForm = () => {
    searchData.value = {}
    refresh()
}


// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}


//跳转对应行的详情页信息
const clickThisColumn = (row) => {
    // 获取当前行的id
    emits('showTrayList', row.id)
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
    background-color: #67C23A;
    border: none;
}
</style>
