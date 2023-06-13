<template>
    <div class="header">
        <div class="form-box">
            <FormK :formOption="props.formOption" v-model:formState="formData" labelWidth="" ref="formK" />
        </div>
        <div class="btn-box">
            <el-button type="primary">高级查询</el-button>
            <el-button type="primary" :icon="Search">查询</el-button>
            <el-button type="default">重置</el-button>
        </div>
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
const formData = ref({})
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: flex-start;
    border: 1px solid #dadcdf;
    border-radius: 10px;
    background-color: #f5f8ff;
    padding: 1.25rem;
    padding-bottom: 0;
    margin-bottom: .625rem;
    margin-top: 0;

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
