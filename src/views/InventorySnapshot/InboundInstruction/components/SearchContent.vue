<template>
  <div class="header">
    <div class="form-box">
      <FormK :formOption="formOption" v-model:formState="formData" labelWidth="" ref="formK" />
    </div>
    <div class="btn-box">
      <el-button type="primary">高级查询</el-button>
      <el-button type="primary" :icon="Search">查询</el-button>
      <el-button type="default">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import FormK from '@/components/FormK/index.vue'

const formOption = reactive([
  {
    type: 'input',
    field: 'code',
    placeholder: '请输入SAP任务号',
    label: 'SAP任务号',
    rules: [
      { required: true, message: '请输入SAP任务号', trigger: 'change' }
    ]
  },
  {
    type: 'input',
    field: 'code',
    placeholder: '请输入预计入库时间',
    label: '预计入库时间',
    rules: [
      { required: true, message: '请输入预计入库时间', trigger: 'change' }
    ]
  }
])
const formData = ref({
  code: 123,
  region: 1,
  time: '2023-05-25',
  entName: 'vue'
})
onBeforeMount(() => {
  console.log(1)
})
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
