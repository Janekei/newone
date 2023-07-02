<template>
    <div>
        <TableK v-if="show" url="/jinko/standardTime/standardPlanPage" method="get" :params="formData" ref="tableRef"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #planTime="{ row }">
                <!-- <span>{{ row.row.standardPlanNodeList }}</span> -->
                <span>{{ row }}</span>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getIntDictOptions } from '@/utils/dict'
import TableK from '@/components/TableK/index.vue'
import SearchContent from './SearchContent.vue'


let tableOption: any = ref([
    {
        prop: 'disCode',
        label: '订单号',
        width: '160'
    }
])


// 获取数据字典的表头
// let tableHeader: any = ref([])
let show = ref(false)
const getDictList = () => {
    const res = getIntDictOptions('standard_time_compare_real_time')
    res.forEach((item, index) => {
        tableOption.value.push({
            label: item.label,
            childrenColumn: [
                {
                    type: item.value,
                    prop: 'planTime',
                    label: '标准时间',
                    width: '160',
                    slotName: 'planTime'
                },
                {
                    type: item.value,
                    prop: 'actualTime',
                    label: '实际时间',
                    width: '160',
                    slotName: 'actualTime'
                },
            ]
        })
        if (index === res.length - 1) {
            show.value = true
            console.log(tableOption.value, 9999)
        }
    }
    )

}
onBeforeMount(() => {
    getDictList()
})

// 处理表格数据
// const editData = (list) => {
//     console.log(list, 66);
// }



let formData = ref()


// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {}
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}


// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}





</script>
<style lang="scss" scoped></style>