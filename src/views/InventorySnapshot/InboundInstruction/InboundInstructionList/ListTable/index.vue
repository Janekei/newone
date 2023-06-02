<template>
    <table class="table">
        <tr class="tr" v-for="item in dataList" :key="item.sapNo"
            @click="goToInboundDetail(item.sapNo, item.billNo, item.inBoundTime)">
            <td class="td">
                <span>SAP任务号:&nbsp;&nbsp;{{ item.sapNo }}</span>
                <span>提单号:&nbsp;&nbsp;{{ item.billNo }}</span>
                <span>预计入库时间:&nbsp;&nbsp;{{ item.inBoundTime }}</span>
                <span>贸易条款:&nbsp;&nbsp;{{ item.tradeType }}</span>
                <span class="last">
                    <button class="type">{{ item.type }}</button>
                    <img src="@/assets/imgs/inbound/jiantou.png" width="16" alt="" />
                </span>
            </td>
        </tr>
    </table>
    <div class="footer">
        <Pagination :page-size="state.pageSize" :current-page="state.curPage" :total="list.length" @pagination="pagination"
            class="mt-3" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from '../../components/Pagination.vue';

// 列表展示功能
// props.name---传过来的tab栏的状态名  list---全部信息 wdgInfo---未到港信息
// wqgInfo---未清关信息  qgzInfo---清关中信息 qgwcInfo---清关完成信息
// dataList---最终渲染到列表的信息
const props = defineProps({
    name: {
        type: String,
        default: ""
    }
})
let list: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到岗'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    }
])

let wdgInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到港'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到港'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '未到港'
    }
])

let wqgInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '待清关'
    }
])

let qgzInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '清关中'
    }
])

let qgwcInfo: Array<any> = reactive([
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    },
    {
        sapNo: '200000088888',
        billNo: '2000088888',
        inBoundTime: '2023-5-2 10:10:10',
        tradeType: 'ABC',
        type: '已清关'
    }

])

let dataList: Array<any> = reactive([])
const state = reactive({
    curPage: 1,
    pageSize: 8,
    total: 30
})

onBeforeMount(() => {
    // console.log('mount', props.name);
    switch (props.name) {
        case 'wdg':
            list = wdgInfo;
            break;
        case 'wqg':
            list = wqgInfo;
            break;
        case 'qgz':
            list = qgzInfo;
            break;
        case 'qgwc':
            list = qgwcInfo;
            break;
        default:
            break;
    }
    pagination(1)
})

const pagination = (current) => {
    dataList = list.slice((current - 1) * state.pageSize, current * state.pageSize)
    state.curPage = current
}

// 跳转页面功能
const router = useRouter()
const goToInboundDetail = (sapId, billNo, inboundTime) => {
    router.push({ path: '/inventorysnapshot/inboundDetail', query: { sapId, billNo, inboundTime } })
}

</script>
<style lang="less" scoped>
.table {
    // padding: 5px;
    width: 100%;

    border-collapse: separate;


    .tr {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        height: 3.125rem;
        width: 100%;
        overflow: hidden;
        border: .0625rem solid #d4d3d3;
        margin-bottom: 5px;
        border-radius: .625rem;



        .td {
            // background-color: #fff;
            font-size: .875rem;
            // border: 0.0625rem solid #d4d3d3;
            padding: 0.625rem;
            // border-radius: .625rem;

            span {
                // display: inline-block;
                padding: 20px 100px 0 0;
                // background-color: aqua;

                .type {
                    display: inline-block;
                    padding: 8px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
            }

            .last {
                // background-color: aqua;
                padding-right: 110px;

                img {
                    display: inline;
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
    }
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
