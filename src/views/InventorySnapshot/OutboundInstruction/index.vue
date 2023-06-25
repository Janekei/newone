<template>
    <div>
        <TopOutboundTabs :tabList="tabList" :totalNumber="total" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopOutboundTabs from './components/TopOutboundTabs.vue'
import { getOutboundListTotal } from '@/api/inventorysnapshot/outboundinstruction'

// 获取对应状态调度列表的行数
const total: any = ref([])
const getListTotal = async (status, name) => {
    const res = await getOutboundListTotal({ transportStatus: status })
    total.value.push({
        name,
        total: res
    })
    console.log(total.value, 'total')
}

onBeforeMount(() => {
    tabList.forEach((item) => {
        getListTotal(item.status, item.name)
    })
})

const tabList = reactive([
    { title: '全部', name: 'all', number: 30, status: 0 },
    { title: '待出库', name: 'dck', number: 12, status: 1 },
    { title: '待签收', name: 'dqs', number: 12, status: 2 },
])
</script>

<style lang="scss" scoped></style>
