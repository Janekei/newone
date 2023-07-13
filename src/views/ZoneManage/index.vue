<template>
    <div>
        <TableK url="/gsc/wharea/pages" method="get" :params="formData" ref="myTable" :tableOption="tableOption"
            :showCheckBox="true">
            <template #buttons>
                <div class="form-box">
                    <FormK :formOption="formOption" v-model:formState="formData" labelWidth="5rem" ref="formK" />
                </div>
                <div class="btn-box">
                    <ElButton @click="search">查询</ElButton>
                    <ElButton @click="openForm('增加')">增加</ElButton>
                    <ElButton @click="deleteZoneListItem()">删除</ElButton>
                    <ElButton @click="openForm('修改')">修改</ElButton>
                    <ElButton @click="refresh">刷新</ElButton>
                </div>
            </template>
        </TableK>
        <ZoneManageDialog ref="formRef" @success="refresh" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import FormK from '@/components/FormK/index.vue'
import * as ZoneManageApi from '@/api/zonemanage'
import TableK from '@/components/TableK/index.vue'
import ZoneManageDialog from './ZoneManageForm/index.vue'


// 搜索表单区域
let formData = ref({
    id: undefined,
    code: undefined,
    name: undefined
})
const formOption = reactive([
    {
        type: 'input',
        field: 'name',
        placeholder: '请输入名称',
        label: '名称',
        rules: [
            { required: true, message: '请输入ID', trigger: 'change' }
        ]
    }
])

// 新增/修改信息
// 新增/修改操作
const formRef = ref()
const openForm = (type: string) => {
    if (type === '修改') {
        let id = myTable.value.selectAll[0].id
        console.log(id, 'selectId')
        formRef.value.open(type, id)

    } else {
        formRef.value.open(type)
    }
}


// 刷新表格内容
const refresh = () => {
    myTable.value.refresh()
}


// 表格区域
const myTable = ref()
const tableOption = reactive([
    {
        prop: 'id',
        label: 'id'
    },
    {
        prop: 'code',
        label: 'code'
    },
    {
        prop: 'name',
        label: 'name'
    }
])

// 查找
const search = () => {
    refresh()
}



// 删除区域
const deleteZoneListItem = async () => {
    // 获取删除区域id
    let id = myTable.value.selectAll[0].id
    const res = await ZoneManageApi.deleteZoneItem({ id })
    console.log(res, 'deleteZone')
    refresh()
}

</script>
<style lang="scss" scoped>
.btn-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3.125rem;
    width: 100%;
    margin-left: 4rem;
}
</style>
