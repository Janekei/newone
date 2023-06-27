<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="客户" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departureLocationName }}</el-descriptions-item>
        <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalLocationName }}</el-descriptions-item>
        <el-descriptions-item label="面板数量" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.type }}</el-descriptions-item>
        <el-descriptions-item label="进口发票" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.tradeWayConfigMode }}</el-descriptions-item>
        <el-descriptions-item label="提货单号" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.transportMode }}</el-descriptions-item>
        <el-descriptions-item label="录取日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.carrierName }}</el-descriptions-item>
        <el-descriptions-item label="JKS Order" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatTime(props.descList.realDepartureTime, 'yyyy-MM-dd') }}</el-descriptions-item>
        <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departurePortName }}</el-descriptions-item>
        <el-descriptions-item label="集货箱号" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalPortName }}</el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils'
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
