<template>
  <TopTabs :tabList="tabList" :boxDetailInfo="boxDetailInfo"/>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import TopTabs from '../components/TopTabs.vue'
import * as InboundInstruction from '@/api/inventorysnapshot/inboundinstruction'

const tabList = reactive([
  { title: '运单信息', name: 'waybill' },
  { title: '柜信息', name: 'boxInfo' },
])

// 获取运单信息、柜信息数据
// listItemId：入库指令列表传过来的参数
const route = useRoute()
let listItemId: number = parseInt(JSON.parse(route.query.id as any));
let boxDetailInfo;
const getMainData = async () => {
  const res = await InboundInstruction.getListItemDetail({ id: listItemId })
  boxDetailInfo = res.data
}
onBeforeMount(() => {
  getMainData()
})

</script>
<style lang="scss" scoped></style>
