<template>
    选托
    <TableK url="/jinkotms-moduule-core-biz/gsc-wh-inbound/page" method="get" :params="formData" :firstPages="20"
        :tableOption="tableOption" :showCheckBox="true" />
    <div class="box-btn">
        <el-button class="button" type="primary" @click="backPartInbound">返回</el-button>
        <el-button class="button" type="primary" @click="partInbound">确认入库</el-button>
    </div>
    <DialogInbound ref="refDialog" />
</template>

<script lang="ts" setup>
import TableK from '@/components/TableK/index.vue'
import DialogInbound from '../../../components/DialogInbound.vue';

const props = defineProps({
    iscloseTray: {
        type: Boolean,
        default: true
    }
})

// ref弹窗
const refDialog = ref()

// 确认整批入库
const partInbound = () => {
    refDialog.value.open('消息', '您确定要入库？')
}

// 返回部分入库箱维度详情页面
const emits = defineEmits(['update:changeCloseTray'])
const backPartInbound = () => {
    const params = !props.iscloseTray
    emits('update:changeCloseTray', params)
}
// table表格列数据
const formData = ref({})
const tableOption = reactive([
    {
        prop: 'boxNo',
        label: '托盘号',
    },
    {
        prop: 'billNo',
        label: '数量',
    },
    {
        prop: 'boxType',
        label: '规格',
    },
    {
        prop: 'lockNo',
        label: '材料',
    },
    {
        prop: 'boxNumber',
        label: '重量',
    },
    {
        prop: 'weight',
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
</script>
<style lang="scss" scoped>
.edit-btn {
    background-color: #67C23A;
    border: none;
}
</style>
