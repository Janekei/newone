<template>
    <div>
        <TableK url="/jinko/standardTime/page" method="get" :params="formData" ref="tableRef" :tableOption="tableOption"
            :showFixedOperation="true" :showCheckBox="false" :showIndex="true" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TableK from '@/components/TableK/index.vue'


let formData = ref()

const tableOption = [
    {
        prop: 'departureCountryName',
        label: '起运国',
        width: '180'
    },
    {
        prop: 'departurePortName',
        label: '起运港',
        width: '180'
    },
    {
        prop: 'arrivalCountryName',
        label: '目的国',
        width: '180'
    },
    {
        prop: 'arrivalPortName',
        label: '目的港',
        width: '180'
    },
    {
        prop: 'transportMode',
        label: '运输方式',
        width: '120',
        slotName: 'transportMode'
    },
    {
        prop: 'transferPort',
        label: '直达/中转',
        width: '120',
        slotName: 'transferPort'
    },
    {
        prop: 'deapportDeaprture',
        label: '进港未离港',
        width: '180'
    },
    {
        prop: 'departureArrport',
        label: '离港未到港',
        width: '180'
    },
    {
        prop: 'transportDeapport',
        label: '中转港未离港',
        width: '180'
    },
    {
        prop: 'departureTransport',
        label: '离港未到中转港',
        width: '180'
    },
    {
        prop: 'arrportBl',
        label: '到港未提货',
        width: '180'
    }
]


// 搜索
// const tableRef = ref()
// const clickSearch = () => {
//     refresh()
// }
// const updateSearchData = (val) => {
//     formData.value = {}
//     Object.assign(formData.value, val)
// }
// const resetForm = () => {
//     refresh()
// }


// 刷新列表
// const refresh = () => {
//     tableRef.value.refresh()
// }





</script>
<style lang="scss" scoped></style>