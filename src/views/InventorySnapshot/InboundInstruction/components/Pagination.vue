<template>
    <el-pagination v-model:current-page="curPage" v-model:page-size="pageSize" layout="prev, pager, next, jumper"
        :total="props.total" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElPagination } from 'element-plus'
const props = defineProps({
    page: { type: Number, default: 1 },
    size: { type: Number, default: 8 },
    total: { type: Number, default: 30 },
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
})

const emit = defineEmits(['update:size', 'update:page', 'pagination'])

const pageSize = computed({
    get: () => props.size,
    set: (val) => {
        emit('update:size', val)
    }
})
const curPage = computed({
    get: () => props.page,
    set: (val) => {
        emit('update:page', val)
    }
})

// function handleSizeChange(current: Number) {
//     console.log('size', current);
//     emit('pagination', current)
// }

function handleCurrentChange(current: Number) {
    // console.log('curr', current);
    emit('pagination', current)

}
</script>


<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>
