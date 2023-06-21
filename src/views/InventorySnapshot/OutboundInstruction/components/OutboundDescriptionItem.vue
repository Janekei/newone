<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departureLocationName }}</el-descriptions-item>
        <el-descriptions-item label="收获地址" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalLocationName }}</el-descriptions-item>
        <el-descriptions-item label="仓库名称" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.type }}</el-descriptions-item>
        <el-descriptions-item label="集装箱数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.tradeWayConfigMode }}</el-descriptions-item>
        <el-descriptions-item label="托盘数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.transportMode }}</el-descriptions-item>
        <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.carrierName }}</el-descriptions-item>
        <el-descriptions-item label="出库指令时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.realDepartureTime }}</el-descriptions-item>
        <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departurePortName }}</el-descriptions-item>
        <el-descriptions-item label="出库指令时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalPortName }}</el-descriptions-item>
        <el-descriptions-item label="业务时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.createTime }}</el-descriptions-item>
        <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.etd }}</el-descriptions-item>
        <el-descriptions-item label="瓦数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.newEtd }}</el-descriptions-item>
        <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.atd }}</el-descriptions-item>
        <el-descriptions-item label="功率" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.eta }}</el-descriptions-item>
        <el-descriptions-item label="柜型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.newEta }}</el-descriptions-item>
        <el-descriptions-item label="物流发货类型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.ata }}</el-descriptions-item>
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
onBeforeMount(() => {
    console.log(props.descList, 'desc')
})

</script >
<style lang="scss" scoped>
::v-deep .is-bordered-label {
    background-color: #f9f9f9 !important;
    font-weight: 700 !important;
}
</style>
