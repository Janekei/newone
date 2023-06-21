<template>
 <div class="header">
  <el-form class="form-box" ref="formRef" :model="formData" label-width="100px">
   <el-form-item label="客户:" prop="client">
    <el-input v-model="formData.client" placeholder="请输入客户" />
   </el-form-item>
   <el-form-item label="提单号码:" prop="billNo">
    <el-input v-model="formData.billNo" placeholder="请输入提单号码" />
   </el-form-item>
  </el-form>
  <div class="btn-box">
   <el-button type="primary">新增查询条件</el-button>
   <el-button type="primary" :icon="Search">查询</el-button>
   <el-button type="default">重置</el-button>
  </div>
 </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const formData = ref({
 client: undefined,
 billNo: undefined
})
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
