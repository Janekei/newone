<template>
    <div>
        <TableK url="/gsc/fee/template/rule/page" method="get" ref="tableRef" :params="formData" :firstPages="10"
            :tableOption="tableOption" :showFixedOperation="true" :showCheckBox="false" :showIndex="true">
            <template #buttons>
                <SearchContent @click-search="clickSearch" @update:form-state="updateSearchData" @reset-form="resetForm" />
            </template>
          <template #bsWhType="{ row }">
            {{getIntDictOptions('billing_warehouse_type')[row.row.bsWhType].label}}
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
import {getIntDictOptions} from "@/utils/dict";
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
        label: '计费规则名称'
    },
    {
        prop: 'bsWhareaName',
        label: '区域'
    },
    {
        prop: 'supplierName',
        label: '供应商'
    },
    {
        prop: 'bsWhName',
        label: '仓库'
    },
    {
        prop: 'bsWhType',
        slotName:'bsWhType',
        label: '仓库种类'
    },
    {
        prop: 'notes',
        label: '备注'
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
    router.push({ path: '/gsc/fee/rules/operate', query: { id, type: 0 } })
}

const updateTemplate = (id) => {
    router.push({ path: '/gsc/fee/rules/operate', query: { id, type: 1 } })
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
