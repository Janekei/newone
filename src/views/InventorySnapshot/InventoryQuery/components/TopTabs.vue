<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.title + '(' + item.number + ')'" :key="item.title"
            :name="item.name">
            <slot :name="item.name">
                <TableContent />
            </slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElTabPane, ElTabs } from 'element-plus'
import TableContent from '../components/TableContent.vue'
import { getTabNumber } from '@/api/inventorysnapshot/outboundQuery'

const tabList = ref([
    { title: '全部', name: 'all', number: 30 },
    { title: '7日内库存', name: 'wdg', number: 12 },
    { title: '7到30日内库存', name: 'wqg', number: 6 },
    { title: '30日外库存', name: 'qgz', number: 13 }
])


const emit = defineEmits(['getTabState'])

const activeName = ref(tabList.value[0].name)

onMounted(() => {
    getTabCount()
})

const handleClick = (tab) => {
    // console.log(tab.props.name, event)s
    emit('getTabState', tab.props.name)
}

const getTabCount = () => {
    getTabNumber({}).then(res => {
        let allCount = 0
        res.map(item => {
            allCount += item.number
        })
        res.unshift({ number: allCount })
        tabList.value.map((item, index) => {
            item.number = res[index].number
        })
    })
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
