<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in props.tabList" :label="item.title + '(' + item.number + ')'" :key="item.title" :name="item.name"
            v-loading="loading">
            <slot :name="item.name" v-if="activeName == item.name">
                <div v-if="(item.name !== 'waybill' && item.name != 'materialInfo')">
                    <OutboundList :status="item.status" />
                </div>
                <div v-else-if="item.name === 'waybill'">
                    <WayBillInfo @pickGoods="pickGoods" />
                </div>
                <div v-else>
                    <MaterialInfo :showPickPart="showPickPart" @back="back" @changeShowPickPart="changeShowPickPart" />
                </div>
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import OutboundList from './OutboundList.vue';
import WayBillInfo from '../waybill/WayBillInfo/index.vue'
import MaterialInfo from '../waybill/MaterialInfo/index.vue'

const props = defineProps({
    tabList: {
        type: Array as any,
        default: () => []
    },
    totalNumber: {
        type: Array as any,
        default: () => []
    }
})

const loading = ref(false)
let activeName = ref(props.tabList[0].name)

//拣货事件---隐藏全部物料信息、显示操作版物料信息
// showPickPart:是否点击拣货
const showPickPart = ref(false)
const pickGoods = () => {
    activeName.value = 'materialInfo'
    showPickPart.value = true
}

// 物料信息（选托操作页）返回功能
const back = () => {
    activeName.value = 'waybill'
    showPickPart.value = false
}

const changeShowPickPart = () => {
    showPickPart.value = false
}

// 选中的tab触发
const handleClick = (tab) => {
    activeName.value = tab.props.name
    if (tab.props.name === 'waybill') {
        showPickPart.value = false
    }
}

</script>
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
}
</style>