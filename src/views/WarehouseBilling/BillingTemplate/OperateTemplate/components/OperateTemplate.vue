<template>
    <div>
        <div class="title">基础信息</div>
        <div class="content">
            <Formk :formOption="formOption" labelWidth="8em" />
        </div>
    </div>
    <div>
        <div class="title">计费规则明细</div>
        <div class="content">
            <Formk :formOption="formOption" labelWidth="8em" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Formk from '@/components/FormK/index.vue'

const formOption = reactive([
    {
        type: 'input',
        field: 'transportMode',
        placeholder: '请输入计费规则名称',
        label: '运输方式：',
        width: '500px',
        rules: [
            { required: true, message: '请输入仓库', trigger: 'change' }
        ],
    },
    {

        type: 'select',
        field: 'warehouse',
        placeholder: '请选择区域',
        label: '区域：',
        requestOptions: {
            url: '/jinko/baseWharea/page',
            method: 'get',
            params: {},
            handleOptions: (res: any) => {
                return res.data.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.code
                    }
                })
            }
        }
    },
    {
        type: 'inputTable',
        field: 'arrivalPortName',
        placeholder: '请输入供应商',
        label: '供应商：',
        rules: [
            { required: true, message: '请输入供应商', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {

        },
        setFormData: () => {

        },
        tableConfig: {
            method: 'post',
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'inputTable',
        field: 'arrivalPortName',
        placeholder: '请输入仓库',
        label: '仓库：',
        rules: [
            { required: true, message: '请输入仓库', trigger: 'change' }
        ],
        valueKey: 'name',
        clearData: () => {

        },
        setFormData: () => {

        },
        tableConfig: {
            method: 'post',
            url: '/jinko/standardTime/findCountry',
            tableOption: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'id',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'input',
        field: 'transportMode',
        placeholder: '请输入仓库种类',
        label: '仓库种类：',
        rules: [
            { required: true, message: '请输入仓库种类', trigger: 'change' }
        ],
    },
])

</script>
<style lang="scss" scoped>
.title {
    padding: .625rem;
    background-color: #409EFF;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
}

.content {
    margin-top: 1.25rem;
}

:deep(.el-form) {
    display: inline-flexbox;
    flex-wrap: wrap;
    width: 100%;
}

:deep(.el-form-item) {
    flex: 1;
}

:deep(.el-form-item__content) {
    width: 500px !important;
}
</style>
