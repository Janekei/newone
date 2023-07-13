<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="集装箱号" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.containerNo }}</el-descriptions-item>
        <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalCount }}</el-descriptions-item>
        <el-descriptions-item label="总瓦数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalMegawatt }}</el-descriptions-item>
        <el-descriptions-item label="仓库名称" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.bsWhName }}</el-descriptions-item>
        <el-descriptions-item label="仓库编码" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.bsWhCode }}</el-descriptions-item>
        <el-descriptions-item label="仓库区域" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.bsWhareaName }}</el-descriptions-item>
        <el-descriptions-item label="仓库类型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{props.descList.bsWhType ? getIntDictOptions('billing_warehouse_type')[props.descList.bsWhType].label : ''}}</el-descriptions-item>
        <el-descriptions-item label="入库时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.actInTime , 'YYYY-MM-DD hh:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="在库时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ formatDate(props.descList.liveTime , 'YYYY-MM-DD hh:mm:ss')}}</el-descriptions-item>
<!--        <el-descriptions-item label="单价" label-align="left" align="center" label-class-name="my-label"-->
<!--            class-name="my-content">{{ props.descList.containerNo }}</el-descriptions-item>-->
    </el-descriptions>
</template>

<script lang="ts" setup>
// import { formatTime } from '@/utils'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import {formatDate} from "@/utils/formatTime";
import {getIntDictOptions} from "@/utils/dict";
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
