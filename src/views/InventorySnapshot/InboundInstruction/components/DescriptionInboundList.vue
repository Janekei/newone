<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="发货方" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departureLocationName }}</el-descriptions-item>
        <el-descriptions-item label="收货方" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalLocationName }}</el-descriptions-item>
        <el-descriptions-item label="业务类型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.type }}</el-descriptions-item>
        <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">
            <DictTagK type="standard_time_rules" :data="props.descList.transportMode" />
        </el-descriptions-item>
        <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.carrierName }}</el-descriptions-item>
        <el-descriptions-item label="提货日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatTime(props.descList.realDepartureTime, 'yyyy-MM-dd') }}</el-descriptions-item>
        <el-descriptions-item label="起运港" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.departurePortName }}</el-descriptions-item>
        <el-descriptions-item label="目的港" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalPortName }}</el-descriptions-item>
        <el-descriptions-item label="入库指令时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.createTime , 'YYYY-MM-DD hh:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="ETD日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.etd , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="ETD NEW日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{formatDate(props.descList.newEtd , 'YYYY-MM-DD hh:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="ATD日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.atd , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="ETA日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.eta , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="ETA NEW日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.newEta , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="ATA 日期" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.ata , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="清关完成时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">-</el-descriptions-item>
        <el-descriptions-item label="港口提货时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.requiredArrivalTime , 'YYYY-MM-DD hh:mm:ss')
            }}</el-descriptions-item>
        <el-descriptions-item label="预计入库时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.estInTime , 'YYYY-MM-DD hh:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="派送地址" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.deliveryAddress }}</el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import DictTagK from '@/components/DictTagK/index.vue'
import {formatDate} from "@/utils/formatTime";
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
