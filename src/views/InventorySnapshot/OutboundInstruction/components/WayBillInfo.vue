<template>
    <div class="box">
        <div class="content">
            <el-descriptions class="elDescriptions" title="任务明细" label-width="100" align="center" :column="2" border>
                <el-descriptions-item label="任务单号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.orderCode }}</el-descriptions-item>
                <el-descriptions-item label="发货方" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.departureLocationName }}</el-descriptions-item>
                <el-descriptions-item label="SAP ID" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.sapId }}</el-descriptions-item>
                <el-descriptions-item label="收货方" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.arrivalocationName }}</el-descriptions-item>
                <el-descriptions-item label="业务类型" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.type }}</el-descriptions-item>
                <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.carrierName }}</el-descriptions-item>
                <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.transportMode }}</el-descriptions-item>
                <el-descriptions-item label="贸易方式" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.tradeWayConfigMode }}</el-descriptions-item>
                <el-descriptions-item label="起运港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.departurePortName }}</el-descriptions-item>
                <el-descriptions-item label="目的港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.arrivalPortName }}</el-descriptions-item>
                <el-descriptions-item label="提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.realDepartureTime, 'yyyy-MM-dd')
                    }}</el-descriptions-item>
                <el-descriptions-item label="需求方" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.salesman }}</el-descriptions-item>
                <!-- <el-descriptions-item v-for="(item, index) in taskDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content" width="180">{{
                        item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="货品明细" label-width="100" :column="2" border>
                <el-descriptions-item label="提单号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.bl }}</el-descriptions-item>
                <el-descriptions-item label="发票号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.invoice_no }}</el-descriptions-item>
                <el-descriptions-item label="合同号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.contractNo }}</el-descriptions-item>
                <el-descriptions-item label="集装箱数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.totalBox }}</el-descriptions-item>
                <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.unitPrice }}</el-descriptions-item>
                <el-descriptions-item label="瓦数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.carrierName }}</el-descriptions-item>
                <el-descriptions-item label="功率档位" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.goodsId }}</el-descriptions-item>
                <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.palletQty }}</el-descriptions-item>
                <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ props.waybillInfo.totalWatt }}</el-descriptions-item>
                <!-- <el-descriptions-item v-for="(item, index) in productDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="时间明细" label-width="100" :column="2" border>
                <el-descriptions-item label="生成入库指令时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.createTime,
                        'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ETD日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.etd, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ETD New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.newEtd, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ATD日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.atd, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ETA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.eta, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ETA New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.newAta, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="ATA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.ata, 'yyyy-MM-dd') }}</el-descriptions-item>
                <el-descriptions-item label="预计入库时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.estInTime, 'yyyy-MM-dd')
                    }}</el-descriptions-item>
                <el-descriptions-item label="港口提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.requiredArrivalTime, 'yyyy-MM-dd')
                    }}</el-descriptions-item>
                <el-descriptions-item label="清关完成时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatTime(props.waybillInfo.requiredArrivalTime, 'yyyy-MM-dd')
                    }}</el-descriptions-item>
                <!-- <el-descriptions-item v-for="(item, index) in timeDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { formatTime } from '@/utils'
const props = defineProps({
    waybillInfo: {
        type: Object,
        default: () => { }
    }
})
</script>
<style lang="scss" scoped>
.box {
    width: 90%;
    margin: 0 auto;
}

.title {
    text-align: center;
    padding: 0.125rem;
    background-color: #d1e8ff;
    font-family: '黑体';
    font-weight: 700;
    border: .0625rem solid #409EFF;
}

.content {
    // border: .125rem solid #bebebe;
    border-top: none;
    border-bottom: none;
    overflow: hidden;
    margin-bottom: .625rem;

    .elDescriptions {
        margin-bottom: .625rem;
    }

}

::v-deep .el-descriptions__title {
    width: 100%;
    background-color: #d1e8ff;
    text-align: center;
    padding: .3125rem 0;
    border-radius: 1.25rem;
}


.el_col {
    border: 0.0625rem solid #bebebe;
    padding: .25rem;
    font-size: .875rem;
}
</style>
