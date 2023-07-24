<template>
    <div class="echarts-list">
        <div class="item">
            <ListTemp title="发货量">
                <DeliveringAmount v-if="showDeliveringAmount" :data="deliveringAmountData" />
            </ListTemp>
        </div>
        <div class="item">
            <ListTemp title="POD及时率">
                <POD v-if="showListTemp" :data="PODData" />
            </ListTemp>
        </div>
        <div class="item">
            <ListTemp title="准时交付率">
                <OnTime v-if="showOnTime" :data="OnTimetData" />
            </ListTemp>
        </div>
        <div class="item">
            <ListTemp title="运输周期">
                <Cycle v-if="showCycle" :data="CycleData" />
            </ListTemp>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ListTemp from './Components/ListTemp.vue'
import DeliveringAmount from './MapList/DeliveringAmount.vue'
import POD from './MapList/POD.vue'
import OnTime from './MapList/OnTime.vue'
import Cycle from './MapList/Cycle.vue'
import { deliveringAmount, timelinessRate, punctuality, transportationCycle } from '@/api/standardTime/index'

const showDeliveringAmount = ref(false)
const showListTemp = ref(false)
const showOnTime = ref(false)
const showCycle = ref(false)

const deliveringAmountData = ref()
const PODData = ref()
const OnTimetData = ref()
const CycleData = ref()

const getDeliveringAmount = () => {
    deliveringAmount({}).then((res: any) => {
        const amountList: any = {
            list: [],
            country: []
        }
        res.forEach(item => {
            amountList.list.push(item.total)
            amountList.country.push(item.name)
        })
        deliveringAmountData.value = amountList
        showDeliveringAmount.value = true
    })
}

const getTimelinessRate = () => {
    timelinessRate({}).then(res => {
        PODData.value = res
        showListTemp.value = true
    })
}

const getPunctuality = () => {
    punctuality({}).then((res: any) => {
        const ontimeList: any = {
            list: [],
            country: []
        }
        res.forEach(item => {
            ontimeList.list.push(item.TOTAL)
            ontimeList.country.push(item.NAME)
        })
        OnTimetData.value = ontimeList
        showOnTime.value = true
    })
}

const getTransportationCycle = () => {
    transportationCycle({}).then((res: any) => {
        const cycleList: any = {
            warehousing: [],
            outbound: [],
            country: []
        }
        res.forEach(item => {
            cycleList.warehousing.push(item.WAREHOUSING)
            cycleList.outbound.push(item.CNT)
            cycleList.country.push(item.NAME)
        })
        CycleData.value = cycleList
        showCycle.value = true
    })
}

onMounted(() => {
    getDeliveringAmount()
    getTimelinessRate()
    getPunctuality()
    getTransportationCycle()
})
</script>

<style lang="scss">
#app {
    overflow: scroll;
}

.echarts-list {
    margin: 0 1.25rem .5rem 1.25rem;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: calc(50% - 0.75rem);
        background-color: #fff;
        padding: .5rem 3rem;
        border-radius: .5rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

        .item:nth-child(odd) {
            margin-right: .75rem;
        }

        .item:nth-child(even) {
            margin-left: .75rem;
        }


    }

    .item:nth-child(1) {
        margin-bottom: 1.25rem;
    }

    .item:nth-child(2) {
        margin-bottom: 1.25rem;
    }
}
</style>
