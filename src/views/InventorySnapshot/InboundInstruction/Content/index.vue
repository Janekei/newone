<template>
    <TypeChoose @getTabState="getStateName">
        <template #all>
            <InboundInstructionList :tableData="allList"/>
        </template>
        <template #wdg>
            <InboundInstructionList :tableData="wdgInfo"/>
        </template>
        <template #wqg>
            <InboundInstructionList :tableData="wqgInfo"/>
        </template>
        <template #qgz>
            <InboundInstructionList :tableData="qgzInfo"/>
        </template>
        <template #qgwc>
            <InboundInstructionList :tableData="qgwczInfo"/>
        </template>
    </TypeChoose>
</template>

<script lang="ts" setup>
import TypeChoose from '../TypeChoose/index.vue'
import InboundInstructionList from '../InboundInstructionList/index.vue'
import { reactive, ref } from 'vue'
let name = ref('all')
const getStateName = (state) => {
    name.value = state
}
// 全部数据
let allList: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到岗'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    }
])

// 未到港数据
let wdgInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到岗'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到岗'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到岗'
    },
])

// 未清关数据
let wqgInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
])

// 清关中数据
let qgzInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    }
])

// 清关完成数据
let qgwczInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    }
])


</script>
<style scoped></style>
