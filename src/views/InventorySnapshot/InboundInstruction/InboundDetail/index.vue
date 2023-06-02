<template>
  <div>
    <DetailHeader :title="title" />
  </div>
  <div>
    <ListDetailTabs />
  </div>
</template>

<script lang="ts" setup>
import DetailHeader from '../components/DetailHeader.vue';
import ListDetailTabs from './ListDetailTabs/index.vue';

import { reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = reactive({
  sapId: route.query.sapId,
  billNo: route.query.billNo,
  inboundTime: route.query.inboundTime
})
onBeforeMount(() => {
  console.log('query', route.query)
})


</script>
<style scoped></style>
