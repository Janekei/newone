<template>
    <div v-if="show">
        <div>
            <WayBillInfo :waybillInfo="waybillInfo" />
        </div>
        <div class="box-btn">
            <el-button class="button" type="primary" @click="pickGoods">拣货</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import WayBillInfo from '../../components/WayBillInfo.vue'
import { getOutboundDetail } from '@/api/inventorysnapshot/outboundinstruction'

// 根据路由query获取出库指令id
const route = useRoute()
let outboundID = route.query.id

//  获取到运单详情信息
const waybillInfo = ref({})
let show = ref(false)
const getWaybillInfo = async () => {
    const res = await getOutboundDetail({ id: outboundID })
    console.log(res, 'desc')
    waybillInfo.value = res
    show.value = true
}

// 点击拣货按钮
const emits = defineEmits(['pickGoods'])
const pickGoods = () => {
    emits('pickGoods')
}


onBeforeMount(() => {
    getWaybillInfo()
})
</script>
<style lang="scss" scoped>
.box-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3.125rem;
    width: 100%;
    // background-color: aqua;
    margin: 1.25rem 0;

    .button {
        margin-right: 6.25rem;
    }
}
</style>
