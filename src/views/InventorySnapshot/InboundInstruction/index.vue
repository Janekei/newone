<template>
    <TopTabs :tabList="tabList" :totalNumber="total" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import TopTabs from './components/TopTabs.vue'
import { getInboundListTotal } from '@/api/inventorysnapshot/inboundinstruction'

// 获取对应状态调度列表的行数
const total: any = ref([])
const getListTotal = async (transportStatus, name) => {
    const res = await getInboundListTotal({ transportStatus })
    total.value.push({
        name,
        total: res
    })
    console.log(total.value, 'total')
}

onBeforeMount(() => {
    tabList.forEach((item) => {
        getListTotal(item.transportStatus, item.name)
    })
})


const tabList = reactive([
    { title: '全部', name: 'all', number: 1, transportStatus: 0 },
    { title: '未到港', name: 'wdg', number: 1, transportStatus: 1 },
    { title: '未清关', name: 'wqg', number: 1, transportStatus: 2 },
    { title: '清关中', name: 'qgz', number: 1, transportStatus: 3 },
    { title: '清关完成', name: 'qgwc', number: 1, transportStatus: 4 }
])

</script>

<style scoped ></style>