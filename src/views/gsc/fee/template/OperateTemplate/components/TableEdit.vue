<template>
    <div>
        <ElTable :data="tableData" style="width: 100%" border element-loading-text="数据加载中" :size="size" ref="tableRef"
            @selection-change="handleSelectionChange" @row-click="rowClick" @row-dblclick="rowDblclick"
            :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <ElTableColumn type="selection" width="55" v-if="showCheckBox" />
            <ElTableColumn label="序号" type="index" width="100" align="center" v-if="showIndex" />
            <ElTableColumn :show-overflow-tooltip="true" :prop="item.prop" :label="item.label" :width="item.width"
                v-for="(item, index) in tableOption" :key="index + 'a'">
                <template #default="{ row }" v-if="item.slotName">
                    <slot :name="item.slotName" :row="{ row }">{{ index }}</slot>
                </template>
            </ElTableColumn>
            <ElTableColumn type="expand" fixed="right" v-if="showExpand">
                <template #default="{ row }">
                    <slot name="expand" :expandRow="row"></slot>
                </template>
            </ElTableColumn>
            <ElTableColumn fixed="right" label="操作" width="180" v-if="showFixedOperation">
                <template #default="{ row }">
                    <slot name="operation" :operateRow="row"></slot>
                </template>
            </ElTableColumn>
        </ElTable>

    </div>
    <div class="btn-box">
        <slot name="buttons" :selectRow="selectAll"></slot>
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
defineProps({
    size: {
        type: String as any,
        default: 'default'
    },
    tableOption: {
        type: Array as any,
        default: () => []
    },
    showCheckBox: {
        type: Boolean,
        default: true
    },
    showIndex: {
        type: Boolean,
        default: false
    },
    showExpand: {
        type: Boolean,
        default: false
    },
    showFixedOperation: {
        type: Boolean,
        default: false
    }
})

const tableData = ref([])
const tableRef = ref()
const selectAll = ref([])
const emits = defineEmits(['clickThisColumn', 'selectThisColumn', 'sendTableData'])
const handleSelectionChange = (rows) => {
    selectAll.value = rows
    emits('selectThisColumn', rows)
}
const rowClick = (row) => {
    emits('clickThisColumn', row)
    tableRef.value!.toggleRowSelection(row, undefined)
}
const rowDblclick = (row) => {
    tableRef.value!.clearSelection()
    tableRef.value!.toggleRowSelection(row, undefined)
}

defineExpose({
    tableData
})
</script>
<style lang="scss" scoped>
.btn-box {
    display: flex;
    justify-content: flex-end;
    margin-right: 1.875rem;
    margin-top: 1.25rem;
}
</style>
