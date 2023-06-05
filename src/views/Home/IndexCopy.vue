<template>
  <div class="indexFullScreen" :class="fullscreen ? 'indexBg':''" style="">
    <div style="display: flex; justify-content: flex-end; padding:10px 0;" @click="handleFullScreen">
      {{fullscreen ? '关闭全屏':'打开全屏'}}
    </div>
    <div v-if="fullscreen" class="indexTitle">
      招投标看板
    </div>
    <el-row :class="prefixCls" :gutter="1" justify="space-between">
      <el-col :lg="5" :md="12" :sm="12" :xl="4" :xs="24" v-for="(item, index) in [1,2,3,4,5]" :key="index">
        <div class="mb-20px" shadow="hover" :style="index == 3 || index == 2 || index == 4 ? 'background-color:#86BDFB;':'background-color:#A3F0E3;'" style="position: relative; padding: 5px 10px; border-radius: 0 12px 0 12px; box-shadow: 2px 2px 2px #AAAAAA; ">
          <el-skeleton :loading="loading" :rows="2" animated>
              <div :class="`${prefixCls}__item flex`" style="justify-content: center; text-align: center;">
                <div style="position: absolute; top:5px; left: 10px;">
                  <!-- <div
                    :class="`${prefixCls}__item--icon ${prefixCls}__item--peoples p-16px inline-block rounded-6px`"
                  > -->
                    <!-- <Icon :size="40" icon="svg-icon:peoples" /> -->
                    <img v-if="index == 3 || index == 2 || index == 4" src="@/assets/imgs/text.png" alt="" style="width: 58px; height: 58px;"/>
                    <img v-else src="@/assets/imgs/bell.png" alt="" style="width: 58px; height: 58px;" />
                  <!-- </div> -->
                </div>
                <div class="flex flex-col justify-between">
                  <!-- <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`"
                    >{{ t('analysis.newUser') }}
                  </div>
                  <CountTo
                    :duration="2600"
                    :end-val="102400"
                    :start-val="0"
                    class="text-20px font-700 text-right"
                  /> -->
                  <div style="font-size: 48px; font-weight: 700;">
                    <CountTo
                      :duration="2600"
                      :end-val="132"
                      :start-val="0"
                    />
                  </div>
                  <div style="font-size: 23px; ">
                    待发标数
                  </div>
                </div>
              </div>
          </el-skeleton>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-between">
      <el-col :lg="10" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 20px;">
          <el-skeleton :loading="loading" animated>
            <Echart :height="300" :options="OptionsDataLeftTop" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :lg="7" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 20px;">
          <!-- <el-skeleton :loading="loading" animated>
            <Echart :height="300" :options="OptionsDataCenterTop" />
          </el-skeleton> -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 23px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              承运商中标次数排行
            </div>
            <div style="font-size:18px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              中标次数/次
            </div>
          </div>

          <el-table class="biddingStatusView" :data="circiutList" height="258" fit>
            <el-table-column label="承运商名称" prop="templateNickname" width="100px" show-overflow-tooltip />
            <el-table-column label="进度调" prop="progress">
              <div class="progressPosition">
                <div class="progressBgView">
                </div>
                <div class="progressView">
                </div>
              </div>
            </el-table-column>
            <el-table-column
              label="中标数"
              prop="number"
              width="60px"
              show-overflow-tooltip
            />
          </el-table>

          <!-- <Table
            class="biddingStatusView"
            :columns="tableColumns"
            :data="circiutList"
            height="258"
            :loading="formLoading"
          >
            <template #progress>
              <div class="progressBgView">
              </div>
              <div class="progressView">
              </div>
            </template>
            <template #number="{ row }">
              <div>
                {{row.number}}
              </div>
            </template>
          </Table> -->
        </el-card>
      </el-col>
      <el-col :lg="7" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 0 20px 20px 20px; position: relative; height: 340px;">
          <div style="font-weight: 700; font-size: 28px; padding-bottom: 21px;">
            中标结果公告
          </div>
          <div style="position: absolute; left: 0; top:0; width: 10px; height: 82px; background-color: rgba(103, 230, 211, 1);">
          </div>
          <div style="position: absolute; left: 0; top:82px; width: 90%; height: 1px; background-color: rgba(103, 230, 211, 1);">
          </div>
          <div>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 20px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="8" style="text-align: center;">
                上海立远国际物流
              </el-col>
              <el-col :span="4">
                <img src="@/assets/imgs/winBidding.png" alt="" style="width: 45px; height: 45px" />
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 20px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="8" style="text-align: center;">
                上海立远国际物流
              </el-col>
              <el-col :span="4">
                <img src="@/assets/imgs/winBidding.png" alt="" style="width: 45px; height: 45px" />
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 20px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="8" style="text-align: center;">
                上海立远国际物流
              </el-col>
              <el-col :span="4">
                <img src="@/assets/imgs/winBidding.png" alt="" style="width: 45px; height: 45px" />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="24">
        <el-card class="mb-20px" shadow="hover">
          <el-skeleton :loading="loading" :rows="4" animated>
            <Echart :height="350" :options="lineOptionsData" />
          </el-skeleton>
        </el-card>
      </el-col> -->
    </el-row>
    <el-row :gutter="20" justify="space-between">
      <el-col :lg="10" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 20px;">
          <el-skeleton :loading="loading" animated>
            <Echart :height="300" :options="OptionsDataLeftBottom" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :lg="7" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 20px;">
          <el-skeleton :loading="loading" animated>
            <Echart :height="300" :options="OptionsDataCenterBottom" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :lg="7" :md="24" :sm="24" :xl="8" :xs="24">
        <el-card class="mb-20px" shadow="hover" style="border-radius: 0 20px 20px 20px; position: relative; height: 340px;">
          <div style="font-weight: 700; font-size: 28px; padding-bottom: 21px;">
            招标情况
          </div>
          <div style="position: absolute; left: 0; top:0; width: 10px; height: 82px; background-color: rgba(134, 189, 251, 1);">
          </div>
          <div style="position: absolute; left: 0; top:82px; width: 90%; height: 1px; background-color: rgba(134, 189, 251, 1);">
          </div>
          <div>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 18px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="6" style="text-align: center; color: #03B615;">
                [进行中]
              </el-col>
              <el-col :span="4">
                2023/4/25
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 18px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="6" style="text-align: center; color: #03B615;">
                [进行中]
              </el-col>
              <el-col :span="4">
                2023/4/25
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" style="align-items: center; font-size: 18px; padding-top: 20px;">
              <el-col :span="10">
                欧洲中转仓280兆瓦
              </el-col>
              <el-col :span="6" style="text-align: center; color: #03B615;">
                [进行中]
              </el-col>
              <el-col :span="4">
                2023/4/25
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" name="Home2" setup>
import { set } from 'lodash-es'
import { ref, onMounted } from 'vue'
import { EChartsOption } from 'echarts'
import 'echarts/lib/component/dataZoom'
import {useWatermark} from "@/hooks/web/useWatermark";

import { useDesign } from '@/hooks/web/useDesign'
import type { AnalysisTotalTypes } from './types'
import { barOptions, lineOptions, pieOptions } from './echarts-data'

const { t } = useI18n()
const loading = ref(true)
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('panel')
const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption
const { setWatermark } = useWatermark()

// const loadMore = () => {
//   console.log('进行加载')
// }
const fullscreen = ref(false)

const handleFullScreen = () => {
  let element = document.getElementsByClassName("indexFullScreen")[0]
  // console.log(element,element.requestFullscreen)
  if(!fullscreen.value){
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
    //不同浏览器之间需要添加前缀
      element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  }else{
    if (document.exitFullscreen()){
      document.exitFullscreen();
    }else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }else if (document.mozCancelFullScreen){
      document.mozCancelFullScreen
    }else if (document.msExitFullScreen){
      document.msExitFullScreen
    }
  }

  fullscreen.value = !fullscreen.value

  // if (fullscreen.value){
  //   if (document.exitFullscreen()){
  //     document.exitFullscreen();
  //   }else if (document.webkitCancelFullScreen) {
  //     document.webkitCancelFullScreen();
  //   }else if (document.mozCancelFullScreen){
  //     document.mozCancelFullScreen
  //   }else if (document.msExitFullScreen){
  //     document.msExitFullScreen
  //   }

  // }else {
  //   // let element=document.documentElement
  //   let element = document.getElementsByClassName("indexBg")
  //   if (element.requestFullscreen){
  //     element.requestFullscreen()
  //   }else if (element.webkitRequestFullScreen){
  //     element.webkitRequestFullScreen()
  //   }else if (element.mozRequestFullScreen){
  //     element.mozRequestFullScreen()
  //   }else if (element.msRequestFullScreen){
  //     element.msRequestFullScreen()
  //   }
  // }
  // fullscreen.value =! fullscreen.value
}

const OptionsDataLeftTop = reactive(
   {
    title: {
      text: '供应商应标中标率',
      left: 0,
      textStyle:{
        fontWeight: 'normal' ,
        fontSize:23
      }
    },
    xAxis: {
      name:'承运商',
      nameTextStyle:{
        color: '#333333'
      },
      data: [
        // '23222222222222222222222222222222222',
        t('analysis.january'),
        t('analysis.february'),
        t('analysis.march'),
        t('analysis.april'),
        t('analysis.may'),
        t('analysis.june'),
        t('analysis.july'),
        t('analysis.august'),
        t('analysis.september'),
        t('analysis.october'),
        t('analysis.november'),
        t('analysis.december')
      ],
      boundaryGap: false,
      axisTick: {
        show: false
      },
      axisLine:{
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset:[0, 12],
        lineStyle:{
          color: '#DCDCDC'
        }
      },
      axisLabel: {
        textStyle: {
            color: '#333333',//坐标值得具体的颜色
        },
        interval:0, //控制X轴刻度全部显示
        rotate:45, //倾斜角度
        formatter:function(value){
            return value.split("").join("\n");
        }
      },
    },
    grid: {
      left: 0,
      right: 20,
      bottom: 20,
      top: 80,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      },
      axisLine:{
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset:[0, 12],
        lineStyle:{
          color: '#DCDCDC'
        }
      },
      axisLabel: {
        textStyle: {
            color: '#333333',//坐标值得具体的颜色
        }
      },
    },
    legend: {
      data: [t('analysis.estimate'), t('analysis.actual')],
      width: 100,
      top: 0,
      right: 0
    },
    series: [
        {
          name: t('analysis.estimate'),
          // smooth: true,
          type: 'line',
          data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
          label: {
            show: true,
            position: 'top'
          },
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: t('analysis.actual'),
          // smooth: true,
          type: 'line',
          itemStyle: {},
          label: {
            show: true,
            position: 'top'
          },
          data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
  }
)

// const tableColumns =[
//   {
//     label: '标题',
//     field: 'templateNickname',
//     width:100,
//     align:'left',
//     isSearch: false
//   },
//   {
//     label: '进度',
//     field: 'progress',
//     isSearch: false
//   },
//   {
//     label: '数值',
//     field: 'number',
//     width:60,
//     align:'center',
//     isSearch: false
//   }
// ]

const circiutList = [
  {
    templateNickname:'上海安点',
    number:500
  },
  {
    templateNickname:'上海安点',
    number:300
  },
  {
    templateNickname:'DAMCO US',
    number:200
  },
  {
    templateNickname:'上海立远',
    number:80
  },
  {
    templateNickname:'上海立远',
    number:80
  },
  {
    templateNickname:'上海立远',
    number:80
  },
  {
    templateNickname:'上海立远',
    number:80
  }
]

const OptionsDataLeftBottom = reactive(
   {
    title: {
      text: '海运段招标平均价格趋势',
      left: 0,
      textStyle:{
        fontWeight: 'normal' ,
        fontSize:23
      }
    },
    xAxis: {
      data: [
        '2022-5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
        '2023-1月',
        '2月',
        '3月',
        '4月',
        '5月'
      ],
      boundaryGap: false,
      axisTick: {
        show: false
      },
      axisLine:{
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset:[0, 12],
        lineStyle:{
          color: '#DCDCDC'
        }
      },
      axisLabel: {
        textStyle: {
            color: '#333333',//坐标值得具体的颜色
        },
        interval:0, //控制X轴刻度全部显示
        rotate:45, //倾斜角度
      },
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 80,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      name:'每柜单价/万',
      nameTextStyle:{
        color: '#333333'
      },
      axisTick: {
        show: false
      },
      axisLine:{
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset:[0, 12],
        lineStyle:{
          color: '#DCDCDC'
        }
      },
      axisLabel: {
        textStyle: {
            color: '#333333',//坐标值得具体的颜色
        }
      },
    },
    legend: {
      data: [t('analysis.estimate'), t('analysis.actual')],
      width: 100,
      top: 0,
      right: 0
    },
    series: [
        {
          name: t('analysis.estimate'),
          // smooth: true,
          type: 'line',
          data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: t('analysis.actual'),
          // smooth: true,
          type: 'line',
          itemStyle: {},
          data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
  }
)

const OptionsDataCenterBottom = reactive(
   {
    title: {
      text: '近半年项目情况',
      left: 0,
      textStyle:{
        fontWeight: 'normal' ,
        fontSize:23
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      width: 100,
      top: 0,
      right: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '75',
      bottom: 0,
      containLabel: true
    },
    xAxis: [
      {
        boundaryGap: true,
        axisTick: {
          show: false
        },
        axisLine:{
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset:[0, 12],
          lineStyle:{
            color: '#DCDCDC'
          }
        },
        axisLabel: {
          textStyle: {
              color: '#333333',//坐标值得具体的颜色
          },
          interval:0, //控制X轴刻度全部显示
          // rotate:45, //倾斜角度
        },
        containLabel: true,
        data: ['2022-12月', '1月', '2月', '3月', '4月', '5月']
      }
    ],
    yAxis: [
      {
        name:'项目数/个',
        nameTextStyle:{
          color: '#333333'
        },
        type: 'value',
        axisLine:{
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset:[0, 12],
          lineStyle:{
            color: '#DCDCDC'
          }
        },
        axisLabel: {
          textStyle: {
              color: '#333333',//坐标值得具体的颜色
          }
        },
      }
    ],
    dataZoom:[
      {
        type: "inside", // 内嵌入图标中
        startValue: 0, // 用绝对值的方式定义了窗口数据默认展示的数据开始范围
        endValue: 3, // 用绝对值的方式定义了窗口数据默认展示的数据终止范围
        filterMode: 'filter',
        /**
        不指定时，当 dataZoom-slider.orient 为 'horizontal'时，
        默认控制和 dataZoom 平行的第一个 xAxis。但是不建议使用默认值，建议显式指定。
        如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。
        */
        xAxisIndex: [0]
      }
    ],
    series: [
      {
        name: '发布数',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        barWidth: 20,
        barGap:'0%',
        barCategoryGap:'0%',
        data: [39, 32, 31, 33, 90, 30],
        itemStyle: {
          color: 'rgba(103, 230, 211, 1)'
        },
        label: {
          show: true,
          position: 'top'
        },
      },
      {
        name: '中标项目数',
        type: 'bar',
        data: [82, 10, 94, 80, 10 ,60],
        emphasis: {
          focus: 'series'
        },
        barWidth: 20,
        barGap:'0%',
        barCategoryGap:'0%',
        markLine: {
          lineStyle: {
            type: 'dashed'
          },
          data: [[{ type: 'min' }, { type: 'max' }]]
        },
        itemStyle: {
          color: 'rgba(2, 167, 240, 1)'
        },
        label: {
          show: true,
          position: 'top'
        },
      },
      {
        name: '临时项目数',
        type: 'bar',
        data: [62, 18, 64, 80, 10 ,60],
        emphasis: {
          focus: 'series'
        },
        barWidth: 20,
        barGap:'0%',
        barCategoryGap:'0%',
        markLine: {
          lineStyle: {
            type: 'dashed'
          },
          data: [[{ type: 'min' }, { type: 'max' }]]
        },
        itemStyle: {
          color: 'rgba(250, 205, 145, 1)'
        },
        label: {
          show: true,
          position: 'top'
        },
      }
    ]
  }
)

let totalState = reactive<AnalysisTotalTypes>({
  users: 0,
  messages: 0,
  moneys: 0,
  shoppings: 0
})

const getCount = async () => {
  const data = {
    users: 102400,
    messages: 81212,
    moneys: 9280,
    shoppings: 13600
  }
  totalState = Object.assign(totalState, data)
}

// 用户来源
const getUserAccessSource = async () => {
  const data = [
    { value: 335, name: 'analysis.directAccess' },
    { value: 310, name: 'analysis.mailMarketing' },
    { value: 234, name: 'analysis.allianceAdvertising' },
    { value: 135, name: 'analysis.videoAdvertising' },
    { value: 1548, name: 'analysis.searchEngines' }
  ]
  set(
    pieOptionsData,
    'legend.data',
    data.map((v) => t(v.name))
  )
  set(pieOptionsData, 'series.data', data)
}
const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption

// 周活跃量
const getWeeklyUserActivity = async () => {
  const data = [
    { value: 13253, name: 'analysis.monday' },
    { value: 34235, name: 'analysis.tuesday' },
    { value: 26321, name: 'analysis.wednesday' },
    { value: 12340, name: 'analysis.thursday' },
    { value: 24643, name: 'analysis.friday' },
    { value: 1322, name: 'analysis.saturday' },
    { value: 1324, name: 'analysis.sunday' }
  ]
  set(
    barOptionsData,
    'xAxis.data',
    data.map((v) => t(v.name))
  )
  set(barOptionsData, 'series', [
    {
      name: t('analysis.activeQuantity'),
      data: data.map((v) => v.value),
      type: 'bar'
    }
  ])
}

const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption

// 每月销售总额
const getMonthlySales = async () => {
  const data = [
    { estimate: 100, actual: 120, name: 'analysis.january' },
    { estimate: 120, actual: 82, name: 'analysis.february' },
    { estimate: 161, actual: 91, name: 'analysis.march' },
    { estimate: 134, actual: 154, name: 'analysis.april' },
    { estimate: 105, actual: 162, name: 'analysis.may' },
    { estimate: 160, actual: 140, name: 'analysis.june' },
    { estimate: 165, actual: 145, name: 'analysis.july' },
    { estimate: 114, actual: 250, name: 'analysis.august' },
    { estimate: 163, actual: 134, name: 'analysis.september' },
    { estimate: 185, actual: 56, name: 'analysis.october' },
    { estimate: 118, actual: 99, name: 'analysis.november' },
    { estimate: 123, actual: 123, name: 'analysis.december' }
  ]
  set(
    lineOptionsData,
    'xAxis.data',
    data.map((v) => t(v.name))
  )
  set(lineOptionsData, 'series', [
    {
      name: t('analysis.estimate'),
      smooth: true,
      type: 'line',
      data: data.map((v) => v.estimate),
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: t('analysis.actual'),
      smooth: true,
      type: 'line',
      itemStyle: {},
      data: data.map((v) => v.actual),
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ])
}

const getAllApi = async () => {
  await Promise.all([getCount(), getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()])
  loading.value = false
}

getAllApi()

const setWater = (waterMark : String) => {
  setWatermark(waterMark)
}

onMounted(() => {
  console.log(window.localStorage.getItem('USER_INFO'))
  setWater(window.localStorage.getItem('USER_INFO') +  '@运柯能inKenno')
})
</script>

<style lang="scss" scoped>
.indexBg{
  background-color: white;
  padding: 20px;
}

.indexTitle{
  width: 100%;
  background-color:rgba(163, 240, 227, 1);
  height: 65px;
  margin:10px 0 20px 0;
  border-radius: 12px;
  font-size:36px;
  font-weight:700;
  text-align: center;
}

$prefix-cls: #{$namespace}-panel;

.#{$prefix-cls} {
  &__item {
    &--peoples {
      color: #40c9c6;
    }

    &--message {
      color: #36a3f7;
    }

    &--money {
      color: #f4516c;
    }

    &--shopping {
      color: #34bfa3;
    }

    &:hover {
      :deep(.#{$namespace}-icon) {
        color: #fff !important;
      }

      .#{$prefix-cls}__item--icon {
        transition: all 0.38s ease-out;
      }

      .#{$prefix-cls}__item--peoples {
        background: #40c9c6;
      }

      .#{$prefix-cls}__item--message {
        background: #36a3f7;
      }

      .#{$prefix-cls}__item--money {
        background: #f4516c;
      }

      .#{$prefix-cls}__item--shopping {
        background: #34bfa3;
      }
    }
  }
}

.biddingStatusView{
  position: relative;
  :deep(th){
    display:none !important;
  }

  :deep(.el-table__cell){
     padding: 15px 0 !important;
    border-bottom: 0 !important;
    position: relative;
  }

  :deep(.el-table__row){
    //margin: 20px 0 !important;
    //height: 50px;
  }

  .progressView{
    position: absolute;
    top: 8px;
    z-index: 10;
    width:50%;
    height: 20px;
    background-color: rgba(2, 167, 240, 1);
    border-radius:50px;
    padding:0;
    font-size: 18px;
    font-weight: 700;
    color: white;
  }

  .progressBgView{
    position: absolute;
    top: 8px;
    width:90%;
    height: 20px;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 50px;
    padding: 0;
  }

  .progressPosition{
    position:absolute;
    top: 1px;
    left:50%;
    transform: translate(-50%,8px);
    width:100%;
    height: 20px;
  }
}
</style>
