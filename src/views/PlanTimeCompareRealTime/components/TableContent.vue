<template>
    <div>
        <TableK v-if="show" url="/jinko/standardTime/standardPlanPage" method="get" :params="formData" ref="tableRef"
            :tableOption="tableOption" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
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
        prop: 'orderNo',
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
            type: item.value,
            label: item.label,
            multiColoumn: [
                {
                    prop: 'orderNo',
                    label: '标准时间',
                    width: '160'
                },
                {
                    prop: 'orderNo',
                    label: '实际时间',
                    width: '160'
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