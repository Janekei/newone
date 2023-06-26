<template>
    <ElInput v-model="curValue" :placeholder="placeholder" @input="change" :clearable="true" :disabled="disabled"
        @keyup.enter="enterFn" @mousedown="onClickOutside" style="width: 100%">
        <template #append> 
            <ElButton :icon="Search" style="margin: 0 -23px" ref="buttonRef" v-click-outside="onClickOutside" />
        </template>
    </ElInput>
    <ElPopover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" virtual-triggering width="auto"
        v-model:visible="showPopoverRef">
        <ElInput v-model="searchKey" :clearable="true">
            <template #append>
                <ElButton :icon="Search" style="margin: 0 -23px" @click="searchTable" />
            </template>
        </ElInput>
        <TableK :tableOption="tableOption" size="small" :firstPages="5" :showCheckBox="false" pageSmall ref="TableKRef"
            @clickThisColumn="clickThisColumn" :url="tableConfig.url" :params="params" />
    </ElPopover>
</template>

<script lang="ts" setup>
import { ref, unref, watch, computed } from 'vue'
import { ElInput, ElButton, ElPopover, ClickOutside as vClickOutside } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import TableK from '@/components/TableK/index.vue'

const emits: any = defineEmits(['onChange'])
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入'
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    valueKey: {
        type: String,
        default: ''
    },
    tableConfig: {
        type: Object as any,
        default: () => ({})
    },
    tableOption: {
        type: Array as any,
        default: () => ([{
            prop: 'name',
            label: '名称'
        }, {
            prop: 'code',
            label: '代码'
        }])
    },
    disabled: {
        type: Boolean,
        default: false
    }
})


const curValue = ref()
// 按钮
const buttonRef = ref()
// ElPopover
const popoverRef = ref()
// 按钮点击事件
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}
// 模拟表格数据
// const tableData = ref([
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: 'qw'
//   },
//   {
//     name: 'hahaha',
//     code: 'dfdf'
//   },
//   {
//     name: 'hahaha',
//     code: '3433'
//   },
//   {
//     name: 'hahaha',
//     code: 'jmk'
//   },
//   {
//     name: 'hahaha',
//     code: 'tyr'
//   },
//   {
//     name: 'hahaha',
//     code: 'ert'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '123'
//   },
//   {
//     name: 'hahaha',
//     code: '54'
//   },
//   {
//     name: 'hahaha',
//     code: '78'
//   },
//   {
//     name: 'hahaha',
//     code: 'd8'
//   },
//   {
//     name: 'hahaha',
//     code: 'sdf'
//   },
// ])

// const tableOption = [{
//   prop: 'name',
//   label: '名称'
// }, {
//   prop: 'code',
//   label: '代码'
// }]

// const tableOption = [{
//   prop: 'name',
//   label: '名称'
// }, {
//   prop: 'code',
//   label: '代码'
// }]

// 表格请求参数
const searchKey = ref()
const params = computed(() => {
    return {
        ...props.tableConfig.params,
        searchKey: searchKey.value
    }
})

// 回车事件
const showPopoverRef = ref(false)
const enterFn = () => {
    searchKey.value = curValue.value
    showPopoverRef.value = true
}

watch(() => props.modelValue, () => {
    curValue.value = props.modelValue
}, { immediate: true })

const change = (value: any) => {
    emits('update:modelValue', value)
    emits('onChange', value)
}

// table行点击事件
const clickThisColumn = (row: any) => {
    console.log(row, props.valueKey, 'row')
    change(row[props.valueKey])
}

// 搜索可选项
const TableKRef = ref()
const searchTable = () => {
    TableKRef.value.refresh()
}
</script>

<style lang="scss"></style>