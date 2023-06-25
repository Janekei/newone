<template>
    <TableK url="/jinko/outbound-goods/page" method="get" :params="formData" ref="tableRef" :firstPages="10"
        :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
        <template #buttons>
            <SearchOutbound :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData"
                @reset-form="resetForm" />
        </template>
        <template #updateTime="{ row }">
            <span>{{ formatTime(row.row.updateTime, 'yyyy-MM-dd') }}</span>
        </template>
    </TableK>
    <div class="box-btn">
        <el-button class="button" type="primary">返回</el-button>
        <el-button class="button" type="primary" @click="open('绑定车辆', '绑定车辆')">绑定车辆</el-button>
        <el-button class="button" type="primary" @click="open('出库', '确认出库', '您确认要出库吗？')">出库</el-button>
    </div>
    <DialogOutbound ref="refDialog" @success="refresh" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { formatTime } from '@/utils'
import SearchOutbound from '../components/SearchOutbound.vue';
import TableK from '@/components/TableK/index.vue'
import DialogOutbound from '../components/DialogOutbound.vue'
let formData = ref({})
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

// 打开弹窗
const refDialog = ref()
const open = (type: string, title: string, content?: string) => {
    refDialog.value.open(type, title, content)
}

const formOption = reactive([
    {
        type: 'input',
        field: 'containerId',
        placeholder: '请输入货品编码',
        label: '货品编码：'
    },
    {
        type: 'input',
        field: 'lockNo',
        placeholder: '请输入货品名称',
        label: '货品名称：'
    }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}


// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}
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
