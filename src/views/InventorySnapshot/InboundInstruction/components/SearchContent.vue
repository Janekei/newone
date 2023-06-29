<template>
  <div class="header">
    <div class="form-box">
      <FormK :formOption="props.formOption" v-model:formState="formData" labelWidth="" ref="formRef"
        @update:form-state="UpdateFormState" />
    </div>
    <div class="btn-box">
      <el-button type="primary">高级查询</el-button>
      <el-button type="primary" :icon="Search" @click="postSearchData">查询</el-button>
      <el-button type="default" @click="resetform">重置</el-button>
    </div>
  </div>
  <div class="center-btn-box">
    <ElButton class="btn" type="primary" @click="allotWshouse">分配仓库</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'
const props = defineProps({
  formOption: {
    type: Object as any,
    default: () => { }
  }
})
let formData = reactive({})
const formRef = ref()
// 查询方法
const emits = defineEmits(['clickSearch', 'update:form-state', 'resetForm', 'allotWshouse'])
const postSearchData = () => {
  emits('clickSearch')
}
const UpdateFormState = () => {
  emits('update:form-state', formData)
}

// 分配仓库
const allotWshouse = () => {
  emits('allotWshouse')
}
const resetform = () => {
  formRef.value.resetFields()
  formData = {}
  setTimeout(() => {
    postSearchData()
  }, 10);
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #dadcdf;
  border-radius: 10px;
  background-color: #f5f8ff;
  padding: 1.25rem;

  .btn-box {
    display: inline-flex;
    margin-left: 7.125rem;
  }
}

.center-btn-box {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 3.25rem;
  margin: .625rem 0;
  width: 100%;
  border: 1px solid #dadcdf;
  // background-color: #f5f8ff;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;

  .btn {
    color: #409EFF;
    background-color: #fff;
    border: .0625rem solid #d5d5d5;
  }
}


.form-box>.el-form-item {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.25rem;
  margin-bottom: 0;
}

::v-deep .el-form-item--default .el-form-item__label {
  font-weight: 700 !important;
  color: #333;
  font-size: .875rem;
  font-family: "黑体";
}
</style>
