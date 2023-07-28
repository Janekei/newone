<template>
    <div>
        <TopOutboundTabs v-if="show" :tabList="tabList" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TopOutboundTabs from './components/TopOutboundTabs.vue'
import { getOutboundListTotal } from '@/api/inventorysnapshot/outboundinstruction'

// 获取对应状态调度列表的行数
const tabList: any = ref([])
let show = ref(false)
const getListTotal = async () => {
    const res = await getOutboundListTotal({})
    res.forEach((item) => {
        tabList.value.push({
            title: item.description,
            number: item.number,
            status: item.status,
            name: item.description
        })
    })
    show.value = true
}

onBeforeMount(() => {
    getListTotal()
})

</script>

<style lang="scss" scoped></style>
