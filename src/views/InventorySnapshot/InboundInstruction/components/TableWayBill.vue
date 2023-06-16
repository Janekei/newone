<template>
    <div class="box">
        <div class="content">
            <el-descriptions class="elDescriptions" :title="res1.title" align="center" :column="2" border>
                <el-descriptions-item v-for="(item, index) in res1.list" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content" width="180">{{
                        item.value
                    }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="elDescriptions" :title="res2.title" :column="2" border>
                <el-descriptions-item v-for="(item, index) in res2.list" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.value
                    }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="elDescriptions" :title="res3.title" :column="2" border>
                <el-descriptions-item v-for="(item, index) in res3.list" :key="index + 'k'" :label="item.title"
                    label-align="left" align="center" label-class-name="my-label" class-name="my-content">{{ item.value
                    }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
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
const res2 = reactive({
    title: '货品明细',
    list: [
        { title: '提单号', value: 'xxxxx' },
        { title: '发票号', value: 'xxxxx' },
        { title: '合同号', value: 'xxxxx' },
        { title: '集装箱数', value: 'xxxxx' },
        { title: '货值', value: 'xxxxx' },
        { title: '瓦数', value: 'xxxxx' },
        { title: '功率档位', value: 'xxxxx' },
        { title: '托盘数量', value: 'xxxxx' },
        { title: '片数', value: 'xxxxx' }
    ]
})
const res3 = reactive({
    title: '时间明细',
    list: [
        { title: '生成入库指令时间', value: 'xxxxx' },
        { title: 'ETD日期', value: 'xxxxx' },
        { title: 'ETD New 日期', value: 'xxxxx' },
        { title: 'ATD日期', value: 'xxxxx' },
        { title: 'ETA日期', value: 'xxxxx' },
        { title: 'ETA New 日期', value: 'xxxxx' },
        { title: 'ATA日期', value: 'xxxxx' },
        { title: '预计入库时间', value: 'xxxxx' },
        { title: '港口提货时间', value: 'xxxxx' },
        { title: '清关完成时间', value: 'xxxxx' }
    ]
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
