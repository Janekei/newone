<template>
    <el-descriptions :column="5" border>
        <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.carrierName }}</el-descriptions-item>
        <el-descriptions-item label="收获地址" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.arrivalLocationName }}</el-descriptions-item>
        <el-descriptions-item label="仓库名称" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.type }}</el-descriptions-item>
        <el-descriptions-item label="集装箱数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalBox }}</el-descriptions-item>
        <el-descriptions-item label="托盘数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalPallet }}</el-descriptions-item>
        <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalQty }}</el-descriptions-item>
        <el-descriptions-item label="出库指令时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.actInTime }}</el-descriptions-item>
        <el-descriptions-item label="业务时间" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.createTime }}</el-descriptions-item>
        <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.val }}</el-descriptions-item>
        <el-descriptions-item label="瓦数" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.totalWatt }}</el-descriptions-item>
        <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">
            <DictTagK :type="transferModeDictType" :data="(props.descList.transportMode * 1)" />
        </el-descriptions-item>
        <el-descriptions-item label="功率" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.power }}</el-descriptions-item>
        <el-descriptions-item label="柜型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.newEta }}</el-descriptions-item>
        <el-descriptions-item label="物流发货类型" label-align="left" align="center" label-class-name="my-label"
            class-name="my-content">{{ props.descList.ata }}</el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import DictTagK from '@/components/DictTagK/index.vue'
const props = defineProps({
    descList: {
        type: Array as any,
        default: () => []
    }
})

const transferModeDictType = ref('standard_time_rules')
</script>
<style lang="scss" scoped>
::v-deep .is-bordered-label {
    background-color: #f9f9f9 !important;
    font-weight: 700 !important;
}
</style>
