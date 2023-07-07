<template>
    <div>
        <TableK url="/jinko/fee/template/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
            <template #operation="{ operateRow }">
                <el-link class="link" type="primary" :icon="View" @click="checkTemplate(operateRow.id)">查看</el-link>
                <el-link class="link" type="primary" :icon="Edit" @click="updateTemplate(operateRow.id)">修改</el-link>
                <el-link type="primary" :icon="DArrowRight">更多</el-link>
            </template>
        </TableK>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { formatTime } from '@/utils'
import { useRouter } from 'vue-router'
import { View, Edit, DArrowRight } from '@element-plus/icons-vue'
import SearchContent from './SearchContent.vue'
import TableK from '@/components/TableK/index.vue'
const props = defineProps({
    code: {
        type: String,
        default: ''
    }
})

const formData = ref({
    code: props.code
})
const tableOption = reactive([
    {
        prop: 'name',
        label: '计费规则模板'
    },
    {
        prop: 'bsWhareaName',
        label: '区域'
    },
    {
        prop: 'bsWhType',
        label: '仓库种类'
    }
])

// 搜索
const tableRef = ref()
const clickSearch = () => {
    refresh()
}
const updateSearchData = (val) => {
    formData.value = {
        code: props.code
    }
    Object.assign(formData.value, val)
}
const resetForm = () => {
    refresh()
}


// 刷新列表
const refresh = () => {
    tableRef.value.refresh()
}

// 查看模板
const router = useRouter()
const checkTemplate = (id) => {
    router.push({ path: '/warehousebilling/billingtemplate/operatetemplate', query: { id, type: 0 } })
}

const updateTemplate = (id) => {
    router.push({ path: '/warehousebilling/billingtemplate/operatetemplate', query: { id, type: 1 } })
}


</script>
<style lang="scss" scoped>
.table {
    margin-top: .625rem;
}

.link {
    margin-right: .625rem;
}
</style>
