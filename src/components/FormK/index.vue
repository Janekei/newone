<template>
  <ElForm :model="formData" :label-width="labelWidth" :inline="true" :rules="rules" ref="myForm">
    <ElFormItem v-for="item in formOption" :key="item.field" :label="item.label" :prop="item.field">
      <MyInput v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="formData[item.field]"
        @onChange="onChange" />
      <MySelect v-else-if="item.type === 'select'" :placeholder="item.placeholder" v-model="formData[item.field]"
        :options="item.options" :requestOptions="item.requestOptions" :disabled="item.disabled" @onChange="onChange" />
      <MyDatePicker v-else-if="item.type === 'date'" :placeholder="item.placeholder" v-model="formData[item.field]"
        @onChange="onChange" />
      <MyAutodcomplete v-else-if="item.type === 'autocomplete'" :placeholder="item.placeholder"
        :requestOptions="item.requestOptions" v-model="formData[item.field]" @onChange="onChange" />
      <MyInputTable v-else-if="item.type === 'inputTable'" :placeholder="item.placeholder" v-model="formData[item.field]"
        :valueKey="item.valueKey" :tableData="item.tableData" :tableConfig="item.tableConfig" @onChange="onChange" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, onMounted, computed } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import MyInput from './Components/MyInput.vue'
import MySelect from './Components/MySelect.vue'
import MyDatePicker from './Components/MyDatePicker.vue'
import MyAutodcomplete from './Components/MyAutodcomplete.vue'
import MyInputTable from './Components/MyInputTable.vue'

const emits = defineEmits(['update:formState'])
const props = defineProps({
  formState: {
    type: Object as any,
    default: () => ({})
  },
  formOption: {
    type: Array as any,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '2.5rem'
  },
  marginBottom: {
    type: Boolean,
    default: true
  }
})

let defaultFormData = ref({})
onMounted(() => {
  defaultFormData.value = cloneDeep(props.formState)
})

const formData = ref({})
watch(() => props.formState, (newV: Object) => {
  formData.value = cloneDeep(newV)
}, { immediate: true })

const onChange = () => {
  emits('update:formState', formData.value)
}

// 校验
const rules = reactive({})
props.formOption.forEach((item: any) => {
  rules[item.field] = item.rules
})

// 提交前校验
const myForm = ref()
const validate = async (validateFn) => {
  await myForm.value.validate((valid, fields) => {
    if (validateFn) {
      validateFn(valid, fields)
    }
  })
}

// 清空表单
const resetFields = () => {
  myForm.value.resetFields()
  emits('update:formState', defaultFormData.value)
}

// 是否添加外边距
const addMar = computed(() => {
  return props.marginBottom ? '1rem' : ''
})

defineExpose({
  validate,
  resetFields
})
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: v-bind(addMar);
  margin-right: 0;
  margin-left: .625rem;
}

:deep(.el-form-item__content) {
  min-width: 218.4px;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
</style>