<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="客户" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.customer }}</el-descriptions-item>
        <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalCount }}</el-descriptions-item>
        <el-descriptions-item label="面板数量" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.panelNumber }}</el-descriptions-item>
        <el-descriptions-item label="进口发票" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.invoiceNo }}</el-descriptions-item>
        <el-descriptions-item label="提货单号" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.bl }}</el-descriptions-item>
        <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.val }}</el-descriptions-item>
        <el-descriptions-item label="集货箱号" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.containerNo }}</el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
// import { formatTime } from '@/utils'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
const props = defineProps({
    descList: {
        type: Array as any,
        default: () => []
    }
})

</script >
<style lang="scss" scoped>
:deep(.is-bordered-label) {
    background-color: #f9f9f9 !important;
    font-weight: 700 !important;
}
</style>
