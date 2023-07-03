<template>
    <div class="cards">
        <template v-if="show">
            <div class="card-item card-item-border">
                <div class="date">
                    平均时间
                </div>
                <div class="days">
                    {{ state.averageTime }} <span class="tian">天</span>
                </div>
            </div>
            <div class="card-item">
                <div class="card-item-top">
                    <span class="form">工厂</span>
                    <span>
                        <ElIcon style="color: #219ddd">
                            <DArrowRight />
                        </ElIcon>
                    </span>
                    <span>离岗</span>
                </div>
                <div class="card-item-bottom">
                    <div class="true-date">运行时间</div>
                    <div class="day">{{ state.factoryToDeparture.reality }} <span class="min-tian">天</span> </div>
                    <div class="standard">标准时间</div>
                    <div class="day">{{ state.factoryToDeparture.standard }} <span class="min-tian">天</span> </div>
                </div>
            </div>
            <div class="card-item">
                <div class="card-item-top">
                    <span class="form">离岗</span>
                    <span>
                        <ElIcon style="color: #219ddd">
                            <DArrowRight />
                        </ElIcon>
                    </span>
                    <span>到岗</span>
                </div>
                <div class="card-item-bottom">
                    <div class="true-date">运行时间</div>
                    <div class="day">{{ state.departureToArrival.reality }} <span class="min-tian">天</span> </div>
                    <div class="standard">标准时间</div>
                    <div class="day">{{ state.departureToArrival.standard }} <span class="min-tian">天</span> </div>
                </div>
            </div>
            <div class="card-item">
                <div class="card-item-top">
                    <span class="form">到岗</span>
                    <span>
                        <ElIcon style="color: #219ddd">
                            <DArrowRight />
                        </ElIcon>
                    </span>
                    <span>客户</span>
                </div>
                <div class="card-item-bottom">
                    <div class="true-date">运行时间</div>
                    <div class="day">{{ state.arrivalToCustomer.reality }} <span class="min-tian">天</span> </div>
                    <div class="standard">标准时间</div>
                    <div class="day">{{ state.arrivalToCustomer.standard }} <span class="min-tian">天</span> </div>
                </div>
            </div>
        </template>
    </div>
    <Echects />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElIcon } from 'element-plus'
import Echects from '../Echects/index.vue'
import { phaseTime } from '@/api/standardTime/index'

const state = ref({})
const show = ref(false)

const getPhaseTime = () => {
    phaseTime({}).then(res => {
        console.log(res, 6);
        state.value = res
        show.value = true
    })
}

onMounted(() => {
    getPhaseTime()
})
</script>

<style scoped lang="scss">
.cards {
    margin-top: 1rem;
    display: flex;
    padding: 0.5rem;

    .card-item {
        margin: 0.75rem;
        flex: 1;

        &-top {
            box-shadow: 2px 2px 10px #909090;
            border-radius: .5rem;
            background-color: #fff;
            padding: .5rem;
            font-size: 1.5625rem;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .form {
                font-weight: 700;
            }
        }

        &-bottom {
            border: 1px solid #d4d8ee;
            background-color: #fff;
            border-radius: .5rem;
            margin-top: .875rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .true-date,
            .standard {
                font-size: 1.5625rem;
            }

            .day {
                font-size: 1.5625rem;
                font-weight: 700;
                color: #2656d3;

                .min-tian {
                    font-size: 1rem;
                }
            }
        }
    }

    .card-item-border {
        border: 1px solid #d4d8ee;
        background-color: #fff;
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .date {
            color: #de4053;
            font-size: 2.5rem;
        }

        .days {
            color: #2656d3;
            font-size: 2.8125rem;
            font-weight: 700;

            .tian {
                font-size: 1.5625rem;
            }
        }
    }
}
</style>
