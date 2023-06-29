<template>
    <div class="text">{{ dictData }}</div>
</template>

<script lang="ts" setup>
import { getDictLabel } from '@/utils/dict'
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    value: {
        type: Number,
        default: 0
    },
    dictData: {
        type: String,
        default: ''
    },
})


let dictData = ref()

onMounted(() => {
    dictData.value = getDictLabel(props.type, props.value)
})
</script>
<style lang="scss"scoped>
.text {
    background-color: none;
}
</style>
