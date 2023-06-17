<template>
    <div class="box">
        <div class="content">
            <el-descriptions class="elDescriptions" title="任务明细" align="center" :column="2" border>
                <el-descriptions-item v-for="(item, index) in taskDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content" width="180">{{
                        item.name
                    }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="货品明细" :column="2" border>
                <el-descriptions-item v-for="(item, index) in productDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="elDescriptions" title="时间明细" :column="2" border>
                <el-descriptions-item v-for="(item, index) in timeDetail" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.name
                    }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
// const props = defineProps({
//     boxDetailInfo: {
//         type: Array as any,
//         default: () => []
//     }
// })
// console.log(props)
const taskDetail = reactive([
    { title: '任务单号', name: 'departureLocationId' },
    { title: '发货方', name: 'carrierName' },
    { title: 'SAP ID', name: 'sapDn' },
    { title: '收货方', name: 'arrivalLocationId' },
    { title: '业务类型', name: 'type' },
    { title: '承运商', name: 'carrierName' },
    { title: '运输方式', name: 'transportMode' },
    { title: '贸易方式', name: 'tradeWayConfigId' },
    { title: '起运港', name: 'departurePortName' },
    { title: '目的港', name: 'arrivalPortName' },
    { title: '提货时间', name: 'realDepartureTime' },
    { title: '需求方', name: 'salesman' }
])
const productDetail = reactive([
    { title: '提单号', name: 'bl' },
    { title: '发票号', name: 'invoice_no' },
    { title: '合同号', name: 'contractNo' },
    { title: '集装箱数', name: 'totalBox' },
    { title: '货值', name: 'unitPrice' },
    { title: '瓦数', name: 'carrierName' },
    { title: '功率档位', name: 'goodsId' },
    { title: '托盘数量', name: 'palletQty' },
    { title: '片数', name: 'totalWatt' }
])
const timeDetail = reactive([
    { title: '生成入库指令时间', name: 'estInTime' },
    { title: 'ETD日期', name: 'etd' },
    { title: 'ETD New 日期', name: 'newEtd' },
    { title: 'ATD日期', name: 'atd' },
    { title: 'ETA日期', name: 'eta' },
    { title: 'ETA New 日期', name: 'newEta' },
    { title: 'ATA日期', name: 'ata' },
    { title: '预计入库时间', name: 'requiredArrivalTime' },
    { title: '港口提货时间', name: 'qty' },
    { title: '清关完成时间', name: 'qty' }
])

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
