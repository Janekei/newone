<template>
    <div>
        <TableK url="/gsc/items/page" method="get" :params="formData" ref="tableRef" :tableOption="tableOption"
            :showFixedOperation="true" :editData="editData" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <FormSearch @AddTimeRules="AddTimeRules" @click-search="clickSearch" @update:form-state="updateSearchData"
                    @reset-form="resetForm" />
            </template>
            <template #operation="{ operateRow }">
                <ElButton class="edit-btn" type="warning" :icon="Edit" @click="open('编辑', operateRow.id)" />
                <ElButton class="delete-btn" type="danger" :icon="Delete" @click="deleteTimeRules(operateRow.id)" />
            </template>
        </TableK>
    </div>
    <!-- <ElButton @click="addRow">增加行</ElButton> -->
    <DialogEditForm ref="formRef" @success="refresh" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import FormSearch from './FormSearch.vue';
import DialogEditForm from './DialogEdit.vue';
import TableK from '@/components/TableK/index.vue'




let formData = ref()



let data: any = ref([])
const editData = (list) => {
    data.value = list
    console.log(list)
    return data.value
}

const tableOption = [
    {
        prop: 'id',
        label: '编号'
    },
    {
        prop: 'name',
        label: '计费名称'
    }
]


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


// 调用DialogForm打开弹窗方法
const formRef = ref()
const open = (type: string, id?: number) => {
    formRef.value.open(type, id)
}

// 打开增加功能弹窗
const AddTimeRules = () => {
    open('增加')
}

// 删除时间规则
const deleteTimeRules = async (id) => {
    open('删除', id)
}


</script>
<style lang="scss" scoped>
.edit-btn {
    background-color: #67C23A;
    border: none;
}

.delete-btn {
    background-color: #F56C6C;
    border: none;
}
</style>