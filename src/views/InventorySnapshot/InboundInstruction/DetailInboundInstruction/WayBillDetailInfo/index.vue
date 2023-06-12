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
