<template>
    <TableWayBill :data="res1" />
    <TableWayBill :data="res1" />
    <TableWayBill :data="res1" />
    <div class="box-btn">
        <el-button class="button" type="primary">异常订单</el-button>
        <el-button class="button" type="primary">整批入库</el-button>
        <el-button class="button" type="primary">部分入库</el-button>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import TableWayBill from '../../components/TableWayBill.vue'
const res1 = reactive({
    title: '任务明细',
    list: [
        { title: '任务单号', value: 'xxxxx' },
        { title: '发货方', value: 'xxxxx' },
        { title: 'SAP ID', value: 'xxxxx' },
        { title: '收货方', value: 'xxxxx' },
        { title: '业务类型', value: 'xxxxx' },
        { title: '承运商', value: 'xxxxx' },
        { title: '运输方式', value: 'xxxxx' },
        { title: '贸易方式', value: 'xxxxx' },
        { title: '起运港', value: 'xxxxx' },
        { title: '目的港', value: 'xxxxx' },
        { title: '提货时间', value: 'xxxxx' },
        { title: '需求方', value: 'xxxxx' },
    ]
})
// const res2 = reactive({
//     title: '货品明细',
//     list: [
//         { title: '提单号', value: 'xxxxx' },
//         { title: '发票号', value: 'xxxxx' },
//         { title: '合同号', value: 'xxxxx' },
//         { title: '集装箱数', value: 'xxxxx' },
//         { title: '货值', value: 'xxxxx' },
//         { title: '瓦数', value: 'xxxxx' },
//         { title: '功率档位', value: 'xxxxx' },
//         { title: '托盘数量', value: 'xxxxx' },
//         { title: '片数', value: 'xxxxx' }
//     ]
// })
// const res3 = reactive({
//     title: '时间明细',
//     list: [
//         { title: '生成入库指令时间', value: 'xxxxx' },
//         { title: 'ETD日期', value: 'xxxxx' },
//         { title: 'ETD New 日期', value: 'xxxxx' },
//         { title: 'ATD日期', value: 'xxxxx' },
//         { title: 'ETA日期', value: 'xxxxx' },
//         { title: 'ETA New 日期', value: 'xxxxx' },
//         { title: 'ATA日期', value: 'xxxxx' },
//         { title: '预计入库时间', value: 'xxxxx' },
//         { title: '港口提货时间', value: 'xxxxx' },
//         { title: '清关完成时间', value: 'xxxxx' }
//     ]
// })
</script>
<style lang="scss" scoped>
.box-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3.125rem;
    width: 100%;
    // background-color: aqua;
    margin: 1.25rem 0;

    .button {
        margin-right: 1.25rem;
    }
}
</style>
