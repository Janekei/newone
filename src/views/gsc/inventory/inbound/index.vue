<template>
    <TopTabs v-if="show" :tabList="tabList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TopTabs from './components/TopTabs.vue'
import { getInboundListTotal } from '@/api/inventorysnapshot/inboundinstruction'

// 获取对应状态调度列表的行数
const tabList: any = ref([])
let show = ref(false)
const getListTotal = async () => {
    const res = await getInboundListTotal({})
    res.forEach((item) => {
        tabList.value.push({
            title: item.description,
            number: item.number,
            status: item.status,
            name: item.description
        })
        console.log(tabList.value, 9999)
    })

    show.value = true
}

onBeforeMount(() => {
    getListTotal()
})


// const tabList = reactive([
//     { title: '全部', name: 'all', number: 1, transportStatus: 0 },
//     { title: '未到港', name: 'wdg', number: 1, transportStatus: 1 },
//     { title: '未清关', name: 'wqg', number: 1, transportStatus: 2 },
//     { title: '清关中', name: 'qgz', number: 1, transportStatus: 3 },
//     { title: '清关完成', name: 'qgwc', number: 1, transportStatus: 4 }
// ])

</script>

<style scoped ></style>