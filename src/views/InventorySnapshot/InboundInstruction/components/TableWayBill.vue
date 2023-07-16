<template>
    <div class="box">
        <div class="content" v-if="waybillInfo === null">
            <el-descriptions class="elDescriptions" title="任务明细" width="160" align="center" :column="2" border>
                <el-descriptions-item label="入库指令单号" width="300" label-align="left" align="center"
                    label-class-name="my-label" class-name="my-content" />
                <el-descriptions-item label="发货方" width="300" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="SAP运输计划ID" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="收货方" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="业务类型" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="贸易条款" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="起运港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="目的港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="业务员" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="货品明细" width="160" :column="2" border>
                <el-descriptions-item label="提单号" width="300" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="发票号" width="300" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="合同号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="集装箱数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="瓦数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="功率档位" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <!-- <el-descriptions-item v-for="(item, index) in productDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="时间明细" width="160" :column="2" border>
                <el-descriptions-item label="生成入库指令时间" width="300" label-align="left" align="center"
                    label-class-name="my-label" class-name="my-content" />
                <el-descriptions-item label="ETD日期" width="300" label-align="left" align="center"
                    label-class-name="my-label" class-name="my-content" />
                <el-descriptions-item label="ETD New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="ATD日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="ETA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="ETA New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="ATA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="预计入库时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="港口提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <el-descriptions-item label="清关完成时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content" />
                <!-- <el-descriptions-item v-for="(item, index) in timeDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
        </div>
        <div class="content" v-else>
            <el-descriptions class="elDescriptions" title="任务明细" align="center" :column="2" border>
                <el-descriptions-item label="入库指令单号" label-align="left" width="300" align="center"
                    label-class-name="my-label" class-name="my-content">{{ waybillInfo.sapDn }}</el-descriptions-item>
                <el-descriptions-item label="发货方" label-align="left" width="300" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.departureLocationName }}</el-descriptions-item>
                <el-descriptions-item label="SAP运输计划ID" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.sapId }}</el-descriptions-item>
                <el-descriptions-item label="收货方" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.arrivalocationName }}</el-descriptions-item>
                <el-descriptions-item label="业务类型" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.type }}</el-descriptions-item>
                <el-descriptions-item label="承运商" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.carrierName }}</el-descriptions-item>
                <el-descriptions-item label="运输方式" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.transportMode }}</el-descriptions-item>
                <el-descriptions-item label="贸易条款" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.tradeWay }}</el-descriptions-item>
                <el-descriptions-item label="起运港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.departurePortName }}</el-descriptions-item>
                <el-descriptions-item label="目的港" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.arrivalPortName }}</el-descriptions-item>
                <el-descriptions-item label="提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.realDepartureTime, 'YYYY-MM-DD HH:mm:ss')
                    }}</el-descriptions-item>
                <el-descriptions-item label="业务员" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.salesman }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="货品明细" size="default" :column="2" border>
                <el-descriptions-item label="提单号" label-align="left" width="300" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.bl }}</el-descriptions-item>
                <el-descriptions-item label="发票号" label-align="left" width="300" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.invoiceNo }}</el-descriptions-item>
                <el-descriptions-item label="合同号" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.contractNo }}</el-descriptions-item>
                <el-descriptions-item label="集装箱数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.totalBox }}</el-descriptions-item>
                <el-descriptions-item label="货值" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.unitPrice }}</el-descriptions-item>
                <el-descriptions-item label="瓦数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.unitWattage }}</el-descriptions-item>
                <el-descriptions-item label="功率档位" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.power }}</el-descriptions-item>
                <el-descriptions-item label="托盘数量" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.totalPallet }}</el-descriptions-item>
                <el-descriptions-item label="片数" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ waybillInfo.totalQty }}</el-descriptions-item>
                <!-- <el-descriptions-item v-for="(item, index) in productDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item> -->
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="时间明细" width="160" :column="2" border>
                <el-descriptions-item label="生成入库指令时间" width="300" label-align="left" align="center"
                    label-class-name="my-label" class-name="my-content">{{ formatDate(waybillInfo.createTime,
                        'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="ETD日期" width="300" label-align="left" align="center"
                    label-class-name="my-label" class-name="my-content">{{ formatDate(waybillInfo.etd, 'YYYY-MM-DD HH:mm:ss')
                    }}</el-descriptions-item>
                <el-descriptions-item label="ETD New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.newEtd, 'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="ATD日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.atd, 'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="ETA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.eta, 'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="ETA New 日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.newEta, 'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="ATA日期" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.ata, 'YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
                <el-descriptions-item label="预计入库时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.estInTime, 'YYYY-MM-DD HH:mm:ss')
                    }}</el-descriptions-item>
                <el-descriptions-item label="港口提货时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.requiredArrivalTime, 'YYYY-MM-DD HH:mm:ss')
                    }}</el-descriptions-item>
                <el-descriptions-item label="清关完成时间" label-align="left" align="center" label-class-name="my-label"
                    class-name="my-content">{{ formatDate(waybillInfo.requiredArrivalTime, 'YYYY-MM-DD HH:mm:ss')
                    }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import {formatDate} from "@/utils/formatTime";
const props = defineProps({
    waybillInfo: {
        type: Object,
        default: () => { }
    }
})
onMounted(() => {
    console.log(props.waybillInfo, 'waybill')
})
let waybillInfo: any = props.waybillInfo === null ? null : props.waybillInfo
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
