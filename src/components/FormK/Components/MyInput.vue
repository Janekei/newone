<template>
    <ElInput v-model="curValue" :disabled="disabled" :placeholder="placeholder" @input="change" :clearable="true"
        style="width: 100%" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElInput } from 'element-plus'

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
    disabled: {
        type: Boolean,
        default: false
    }
})

const curValue = ref()
watch(() => props.modelValue, () => {
    curValue.value = props.modelValue
}, { immediate: true })

const change = (value: any) => {
    emits('update:modelValue', value)
    emits('onChange', value)
}

// const showSearchIcon = ref(true)
// const blur = () => {
//  showSearchIcon.value = true
// }
</script>