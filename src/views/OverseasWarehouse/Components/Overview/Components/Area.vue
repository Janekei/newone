
<template>
    <div class="area area-top">
        <Header title="各港库存情况" />
        <div class="area-top-detail">
            <div class="detail" v-for="item in portSituation" :key="item">
                <div class="detail-box">
                    <div class="title"><span class="name">{{ item.product }}</span> <span class="date">较上周 {{ item.data1
                    }}</span></div>
                    <div class="detail-item">在库库存： {{ item.data2 }}</div>
                    <div class="detail-item">在港库存： {{ item.data3 }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="area area-bottom">
        <Header title="各供应商库存情况" />
        <div class="area-top-detail">
            <div class="detail" v-for="item in supplierSituation" :key="item">
                <div class="detail-box">
                    <div class="title"><span class="name">{{ item.product }}</span> <span class="date">较上周 {{ item.data1
                    }}</span></div>
                    <div class="detail-item">在库库存：{{ item.data2 }}</div>
                    <div class="detail-item">在港库存：{{ item.data3 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '../../Header.vue'
import { getPortSituationData, getSupplierSituationData } from '@/api/overseasWarehouse/index'

let portSituation: any = ref([])
let supplierSituation: any = ref([])
const getSituation = () => {
    getPortSituationData({}).then(res => {
        console.log(res, 888)
        res.forEach((element, index) => {
            if (index <= 2) {
                portSituation.value.push(element)
            } else {
                return;
            }
        })
        // portSituation.value = res
    })
    getSupplierSituationData({}).then(res => {
        res.forEach((element, index) => {
            if (index <= 2) {
                supplierSituation.value.push(element)
            } else {
                return;
            }
        })
        // supplierSituation.value = res
    })
}

getSituation()

</script>

<style lang="scss" scoped>
.area {
    height: 50%;
    display: flex;
    flex-direction: column;
}

.area-top-detail {
    display: flex;
    flex: 1;

    .detail {
        width: calc(100% / 3);
        height: 100%;
        padding: 0.25em;

        &-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border: 1px solid #11cca5;
            width: 100%;
            height: 100%;
            padding: 0 .75rem;

            .title {
                font-weight: 700;
            }

            .name {
                font-size: 1.25rem;
            }

            .date {
                font-size: 1rem;
            }
        }
    }
}
</style>