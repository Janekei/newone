<template>
    <div class="flex-box-form">
        <div class="form-title-color filter">筛选</div>
        <div>
            <FormK :formOption="formOption" v-model:formState="formData" :marginBottom="false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FormK from '@/components/FormK/index.vue'

const formOption = reactive([
    {
        type: 'inputTable',
        field: 'areaId',
        placeholder: '请选择区域',
        label: '区域',
        tableConfig: {
            url: '/jinko/baseWharea/page',
            method: 'get',
            params: {},
            tableOption: [
                {
                    prop: 'name',
                    label: '国家'
                },
                {
                    prop: 'code',
                    label: 'Code'
                }
            ]
        }
    },
    {
        type: 'inputTable',
        field: 'warehouseId',
        placeholder: '请选择仓库',
        label: '仓库',
        requestOptions: {
            url: '/jinko/baseWarehouse/get',
            method: 'get',
            params: {
                id: 1
            },
            handleOptions: (res: any) => {
                return res.data.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            }
        }
    },
    {
        type: 'date',
        field: 'time',
        placeholder: '请选择时间',
        label: '时间'
    },
])

const formData = ref({
    userName: '张三'
})
</script>

<style scoped lang="scss">
.flex-box-form {
    display: flex;
    align-items: center;
    background-color: #d3e4ee;
    padding: .375rem .75rem;
    font-size: 1rem;
}

.filter {
    margin-right: 1rem;
}
</style>
