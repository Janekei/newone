<template>
    <ElSelect v-model="curValue" :placeholder="placeholder" @change="change" @visible-change="visibleChange"
        :disabled="disabled" :loading="loading" clearable style="width: 100%;">
        <ElOption v-for="item in listOption" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import request from '@/config/axios'

const emits: any = defineEmits(['onChange'])
const props = defineProps({
    placeholder: {
        type: String,
        default: '选择'
    },
    options: {
        type: Array as any,
        default: () => []
    },
    requestOptions: {
        type: Object as any,
        default: null
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
    console.log(value, 'selece')
    emits('update:modelValue', value)
    emits('onChange')
}

let listOption = ref(props.options)
const loading = ref(false)
const visibleChange = async (value: boolean) => {
    if (!value) return
    if (!props.requestOptions) return
    loading.value = true
    let res = await request[props.requestOptions.method]({ url: props.requestOptions.url, params: props.requestOptions.params })
    loading.value = false
    if (props.requestOptions.handleOptions) {
        listOption.value = props.requestOptions.handleOptions(res)
    }
}

</script>