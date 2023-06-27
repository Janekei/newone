<template>
 <div class="header">
  <FormK :formOption="formOption" v-model:formState="formData" labelWidth="7rem" :marginBottom="false" />
  <div class="btn-box">
   <el-button type="primary">新增查询条件</el-button>
   <el-button type="primary" :icon="Search">查询</el-button>
   <el-button type="default">重置</el-button>
  </div>
 </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'

const formData = ref({})

const formOption = reactive(
 [
  {
   type: 'input',
   field: 'client',
   placeholder: '请输入客户',
   label: '客户：',
   rules: [
    { required: true, message: '请输入码值', trigger: 'change' }
   ]
  },
  {
   type: 'input',
   field: 'billNo',
   placeholder: '请输入提单号码',
   label: '提单号码：',
   rules: [
    { required: true, message: '请输入码值', trigger: 'change' }
   ]
  }
 ]
)
onBeforeMount(() => {
 console.log(1)
})
</script>
<style lang="scss" scoped>
.header {
 display: flex;
 justify-content: flex-start;
 align-items: center;
 border: 1px solid #dadcdf;
 border-radius: 10px;
 background-color: #f5f8ff;
 padding: 16px;

 .btn-box {
  display: inline-flex;
  margin-left: 7.125rem;
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
