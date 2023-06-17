<template>
    部分
    <TableK class="pagination" url="/jinkotms-moduule-core-biz/gsc-wh-inbound/page" method="get" :params="formData"
        :showIndex="true" :firstPages="20" :tableOption="tableOption" />
    <div class="box-btn">
        <el-button class="button" type="primary">返回</el-button>
        <el-button class="button" type="primary" @click="partInbound">确认入库</el-button>
    </div>
    <DialogInbound ref="refDialog" />
</template>

<script lang="ts" setup>
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';
// table表格列数据
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'boxNo',
        label: '箱号',
    },
    {
        prop: 'billNo',
        label: '提单号',
    },
    {
        prop: 'boxType',
        label: '箱型',
    },
    {
        prop: 'lockNo',
        label: '锁号',
    },
    {
        prop: 'boxNumber',
        label: '件数',
    },
    {
        prop: 'weight',
        label: '重量',
    },
    {
        prop: 'volumn',
        label: '体积',
    },
    {
        prop: 'createPeople',
        label: '创建人',
    },
    {
        prop: 'createTime',
        label: '创建时间',
    },
    {
        prop: 'updatePeople',
        label: '更新人',
    },
    {
        prop: 'updateTime',
        label: '更新时间',
    }
])
// ref弹窗
const refDialog = ref()

// 确认整批入库
const partInbound = () => {
    refDialog.value.open('消息', '您确定要入库？')
}
</script>
<style lang="scss" scoped>
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
</style>
