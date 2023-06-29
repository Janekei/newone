<template>
    <div class="text">{{ dictData }}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getDictLabel } from "@/utils/dict"
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    value: {
        type: Number,
        default: 0
    }
})


let dictData = ref()

onMounted(() => {
    dictData.value = getDictLabel(props.type, props.value)
})
</script>
<style scoped></style>
