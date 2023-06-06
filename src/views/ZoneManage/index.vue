<template>
    区域管理
    <div>
        <TableK url="/jinkotms/BaseWharea/page" method="get" :params="formData" ref="myTable" 
            :tableOption="tableOption">
            <template #buttons="{ selectRow }">
                <span>{{ selectRow.length }}</span>
            </template>
            <template #date="{ row }">
                <span style="color: red">{{ row.row.date }}</span>
            </template>
        </TableK>
        <ElButton @click="getList">增加</ElButton>
        <ElButton>删除</ElButton>
        <ElButton>修改</ElButton>
        <Search :schema="schema" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search } from '@/components/Search'
import { FormSchema } from '@/types/form'
import * as ZoneManageApi from '@/api/zonemanage'


const getList = async () => {
    const data = await ZoneManageApi.getTableList()
    console.log('获取到接口的数据', data)
}

import TableK from '@/components/TableK/index.vue'

const formData = ref({
    code: 123,
    region: 1,
    time: '2023-05-25',
    entName: 'vue'
})

const myTable = ref()

const tableOption = reactive([
    {
        prop: 'id',
        label: 'id',
        width: '180'
    },
    {
        prop: 'code',
        label: 'code',
        width: '180'
    },
    {
        prop: 'name',
        label: 'name'
    }
])

// 查找
const schema = reactive<FormSchema[]>([
    {
        field: 'field1',
        component: 'Input'
    }
])
</script>
<style lang="scss" scoped></style>
