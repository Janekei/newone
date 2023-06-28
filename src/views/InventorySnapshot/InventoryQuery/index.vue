<template>
    <TopTabs v-if="show" :tabList="tabList" />
</template>

<script lang="ts" setup>
import TopTabs from './components/TopTabs.vue'
import { getTabNumber } from '@/api/inventorysnapshot/inventoryquery'

// 获取对应状态调度列表的行数
const tabList: any = ref([])
let show = ref(false)
const getListTotal = async () => {
    const res = await getTabNumber()
    res.forEach((item) => {
        tabList.value.push({
            title: item.name,
            number: item.number,
            code: item.code
        })
    })
    console.log(res, 111)
    show.value = true
}

onBeforeMount(() => {
    getListTotal()
})

</script>

<style scoped ></style>
