<template>
 <el-tabs v-model="activeName" @tab-click="handleClick">
  <el-tab-pane v-for="item in tabList" :label="item.title + '(' + item.number + ')'" :key="item.title" :name="item.name">
   <slot :name="item.name">
    <SearchContent />
    <TableContent />
   </slot>
  </el-tab-pane>
 </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import SearchContent from '../components/SearchContent.vue'
import TableContent from '../components/TableContent.vue'

const tabList = reactive([
 { title: '全部', name: 'all', number: 30 },
 { title: '7日内库存', name: 'wdg', number: 12 },
 { title: '7到30日内库存', name: 'wqg', number: 6 },
 { title: '30日外库存', name: 'qgz', number: 13 }
])


const emit = defineEmits(['getTabState'])

const activeName = ref(tabList[0].name)
// console.log(tabList)


const handleClick = (tab) => {
 // console.log(tab.props.name, event)
 emit('getTabState', tab.props.name)
}
</script>
<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
 padding: 32px;
 color: #6b778c;
 font-size: 1.75rem;

 background-color: #6b778c;
}
</style>
