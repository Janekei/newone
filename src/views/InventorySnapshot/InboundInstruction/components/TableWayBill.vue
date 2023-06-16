<template>
    <div class="box">
        <el-row class="title">
            <el-col :span="24">
                <div class="ep-bg-purple-dark">{{ props.data.title }}</div>
            </el-col>
        </el-row>
        <div class="content">
            <el-row class="el_row" :gutter="20" v-for="(item, index) in list" :key="index">
                <el-col class="el_col" :span="6">
                    <div class="ep-bg-purple">{{ item[0].title }}</div>
                </el-col>
                <el-col class="el_col" :span="6">
                    <div class="ep-bg-purple">{{ item[0].value }}</div>
                </el-col>
                <el-col class="el_col" :span="6">
                    <div class="ep-bg-purple">{{ item[1].title }}</div>
                </el-col>
                <el-col class="el_col" :span="6">
                    <div class="ep-bg-purple">{{ item[1].value }}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElRow, ElCol } from 'element-plus'
const props = defineProps({
    data: {
        type: Array as any,
        default: () => { }
    }
})
// 过滤数据
const list = computed(() => {
    let data: any = []
    for (let i = 0; i < props.data.list.length; i = i + 2) {
        data.push([
            props.data.list[i],
            props.data.list[i + 1]
        ])
    }
    console.log(data, 'data')
    return data
})
onBeforeMount(() => {
    console.log(props.data)
})
</script>
<style lang="scss" scoped>
.box {
    width: 90%;
    margin: 0 auto;
}

.title {
    text-align: center;
    padding: 0.125rem;
    background-color: #d1e8ff;
    font-family: '黑体';
    font-weight: 700;
    border: .0625rem solid #409EFF;
}

.content {
    border: .125rem solid #bebebe;
    border-top: none;
    border-bottom: none;
    overflow: hidden;
}

.el_col {
    border: 0.0625rem solid #bebebe;
    padding: .25rem;
    font-size: .875rem;
}
</style>
