<template>
 <ElForm :model="formData" :label-width="labelWidth" :inline="true">
  <ElFormItem v-for="item in formOption" :key="item.field" :label="item.label">
   <MyInput v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="formData[item.field]"
    @onChange="onChange" />
   <MySelect v-else-if="item.type === 'select'" :placeholder="item.placeholder" v-model="formData[item.field]"
    :options="item.options" :requestOptions="item.requestOptions" @onChange="onChange" />
   <MyDatePicker v-else-if="item.type === 'date'" :placeholder="item.placeholder" v-model="formData[item.field]"
    @onChange="onChange" />
  </ElFormItem>
 </ElForm>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import _ from 'lodash'
import MyInput from './Components/MyInput.vue'
import MySelect from './Components/MySelect.vue'
import MyDatePicker from './Components/MyDatePicker.vue'

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
 }
})

const formData = ref({})
watch(props.formState, (newV: Object) => {
 formData.value = _.cloneDeep(newV)
}, { immediate: true })

const onChange = () => {
 emits('update:formState', formData.value)
}
</script>

<style scoped lang="less">
/deep/.el-form-item {
 margin-bottom: 0;
}
</style>