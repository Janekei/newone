<template >
    <div class="header">
        <div class="list-title">订单列表</div>
        <div class="left-part">
            <div class="arrive-time">
                <div class="title">到仓时间：</div>
                <el-select v-model="value" class="m-2" placeholder="所有进度">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="select-part">
                <div class="title">订单号：</div>
                <el-input class="input" v-model="input" placeholder="" />
                <el-button class="select-btn" type="primary" round>查询</el-button>
            </div>
        </div>
    </div>
    <ListTable :listData="props.tableData" />
</template>

<script lang="ts" setup>
import { ElSelect, ElOption, ElInput, ElButton } from 'element-plus'
import ListTable from './ListTable/index.vue'
import { ref, defineProps, onMounted } from 'vue'
const props = defineProps({
    tableData: {
        type: Array
    }
})
onMounted(() => {
    console.log('tableData', props.tableData);
})

const value = ref('')
let input = ref('')

const options = [
    {
        value: '1天内到仓',
        label: '1天内到仓',
    },
    {
        value: '2-3天到仓',
        label: '2-3天到仓',
    },
    {
        value: '4-7天到仓',
        label: '4-7天到仓',
    },
    {
        value: '8-14天到仓',
        label: '8-14天到仓',
    }
]
</script>
<style lang="less" scoped>
.header {
    display: flex;
    // padding: .125rem;
    // background-color: aqua;
    align-items: center;
    justify-content: space-between;

    .list-title {
        background-color: #CEEEFC;
        padding: .3125rem;
        width: 8.125rem;
        height: 2rem;
        font-size: .875rem;
        text-align: center;
        color: #333;
        border-radius: 0.25rem;
    }

    .left-part {
        display: flex;
        align-items: center;

        .title {
            height: 1.875rem;
            width: 7.5rem;
            font-size: .875rem;
            text-align: right;
            // background-color: rgb(122, 120, 227);
            padding: .3125rem;
        }

        .arrive-time {
            display: flex;
            align-items: center;
            // background-color: aquamarine;
        }

        .select-part {
            display: flex;
            align-items: center;

            .input {
                height: 2rem;
            }

            .select-btn {
                margin: 0 .625rem;
            }
        }
    }
}
</style>
