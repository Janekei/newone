<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick" @tab-change="handleChange">
        <el-tab-pane label="运单信息" name="waybill">
            <WayBillDetail @goToPartInbound="goToPartInbound" />
        </el-tab-pane>
        <el-tab-pane label="柜信息" name="container">
            <ContainerDetail v-if="!state" />
            <div v-else>
                <PartInboundDetail />
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import WayBillDetail from '../WayBillDetail/index.vue'
import ContainerDetail from '../containerDetail/index.vue'
import PartInboundDetail from '../PartInboundDetail/index.vue'


// 运单信息 柜信息功能
// tabList 运单信息
const activeName = ref('waybill')

const handleClick = (tab, event) => {
    console.log(tab, event)
}

//展示运单详情的柜信息页面
let state = ref(false)
const goToPartInbound = (val) => {
    state.value = val
    activeName.value = 'container'
}
const handleChange = () => {
    if (activeName.value === 'waybill') {
        state.value = false
    }
}
</script>
<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 1.75rem;
    font-weight: 600;
    background-color: #6b778c;
}

::v-deep .el-tabs__nav {
    background-color: #fff;
    border: 0.0625rem solid #02A7F0 !important;


}

::v-deep .el-tabs__header {
    border-bottom: none;
}

::v-deep .el-tabs__item {
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: .75rem;
}

::v-deep .is-active {
    background-color: #CEEEFC;
    // border: 0.0625rem solid #02A7F0 !important;
    border: none !important;
    color: #333;
}
</style>
