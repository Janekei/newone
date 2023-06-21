<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="发货方" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departureLocationName }}</el-descriptions-item>
        <el-descriptions-item label="收货方" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalLocationName }}</el-descriptions-item>
        <el-descriptions-item label="业务类型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.type }}</el-descriptions-item>
        <el-descriptions-item label="贸易方式" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.tradeWayConfigMode }}</el-descriptions-item>
        <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.transportMode }}</el-descriptions-item>
        <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.carrierName }}</el-descriptions-item>
        <el-descriptions-item label="提货日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.realDepartureTime }}</el-descriptions-item>
        <el-descriptions-item label="起运港" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departurePortName }}</el-descriptions-item>
        <el-descriptions-item label="目的港" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalPortName }}</el-descriptions-item>
        <el-descriptions-item label="入库指令时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.createTime }}</el-descriptions-item>
        <el-descriptions-item label="ETD日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.etd }}</el-descriptions-item>
        <el-descriptions-item label="UPDATE ETD日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.newEtd }}</el-descriptions-item>
        <el-descriptions-item label="ATD日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.atd }}</el-descriptions-item>
        <el-descriptions-item label="ETA日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.eta }}</el-descriptions-item>
        <el-descriptions-item label="UPDATE ETA日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.newEta }}</el-descriptions-item>
        <el-descriptions-item label="ATA 日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.ata }}</el-descriptions-item>
        <el-descriptions-item label="清关完成时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">-</el-descriptions-item>
        <el-descriptions-item label="港口提货时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.requiredArrivalTime }}</el-descriptions-item>
        <el-descriptions-item label="预计入库时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.estInTime }}</el-descriptions-item>
        <el-descriptions-item label="派送地址" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.deliveryAddress }}</el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
const props = defineProps({
    descList: {
        type: Array as any,
        default: () => []
    }
})

</script >
<style lang="scss" scoped>
::v-deep .is-bordered-label {
    background-color: #f9f9f9 !important;
    font-weight: 700 !important;
}
</style>
