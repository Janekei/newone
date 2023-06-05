<template>
  <div style="width: 50px; height:50px; background-color:white;">
  </div>
  <el-row>
    <el-col :span="4">
      <div class="CTitle">
        <text>起运地</text>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="CTitle">
        <text>目的地</text>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="CTitle">
        <text>权重</text>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="CTitle">
        <text>运输方式</text>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="CTitle">
        <text>操作</text>
      </div>
    </el-col>
  </el-row>

  <div v-for="(item,index) in circiutList" :key="index">
    <el-row class="circiutInputView">
      <el-col :span="4">
        <div class="circiutInput">
          <el-input placeholder="请选择起运地" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="circiutInput">
          <el-input   placeholder="请选择目的地" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="circiutInput">
          <el-input   placeholder="请输入权重" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="circiutInput">
          <el-input   placeholder="请选择运输方式" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="circiutToolView">
          <div v-if="circiutList.length != 1" @click="delCircuit(index)">
            <img class="itemSubIcon" src="@/assets/imgs/itemSub.png"/>
          </div>
          <div @click="addCircuit()">
            <img class="itemAddIcon" src="@/assets/imgs/itemAdd.png"/>
          </div>
          <div class="addText" @click="openCircuit(item)">
            <text>展开费用项</text>
          </div>
        </div>
      </el-col>
    </el-row>

    <div v-if="item.ifShow">
      <div class="cardView" v-for="(item_i,index_i) in item.list" :key="index_i">
        <el-row type="flex" style="padding:10px 0;" justify="end">
          <el-col :span="3">
            <div class="insideTitle">
              <text>费用项</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>计费工具</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>计费单位</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>币种</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>权重</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>报价下限</text>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="insideTitle">
              <text>报价上限</text>
            </div>
          </el-col>
          <el-col :span="2"/>
        </el-row>

        <el-row type="flex" style="padding:10px 0;" justify="end">
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入计费项" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入计费工具" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入权重" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入权重" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入权重" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入报价下限" />
            </div>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center; margin: 0 10px 0 0;">
              <el-input   placeholder="请输入报价上限" />
            </div>
          </el-col>
          <el-col :span="2">
            <div class="circiutToolView">
              <div v-if="item.list.length != 1" @click="delMoreItem(item,index_i)">
                <img class="itemSubIcon" src="@/assets/imgs/itemSub.png"/>
              </div>
              <div @click="addMoreItem(item)">
                <img class="itemAddIcon" src="@/assets/imgs/itemAdd.png"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="PayMerchantForm" setup>

// import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
// import { CommonStatusEnum } from '@/utils/constants'

// const { t } = useI18n() // 国际化

const circiutList = reactive([
  {
    name:'1',
    ifShow:false,
    list:[
      {
        t:'1'
      }
    ]
  }
])

//点击添加路线
const addCircuit = () => {
  circiutList.push({
    name:'1',
    ifShow:false,
    list:[
      {
        t:'1'
      }
    ]
  })
  // console.log('circiutList',circiutList)
}

//点击添加更多费用项
const addMoreItem = (CRItem : Object) => {
  // console.log('CRItem',CRItem.list)
  CRItem.list.push({t:'1'})
  console.log('CRItem',CRItem.list)
}

//点击关闭或展开费用项
const openCircuit = (CRElement : Object) => {
  // console.log('CRItem',CRItem.list)
  CRElement.ifShow = ! CRElement.ifShow
}

//点击删除某个费用项
const delMoreItem = (CRElement : Object,CRItemIndex : Number) => {
  CRElement.list.splice(CRItemIndex,1)
}

//点击删除某个线路
const delCircuit = (CRElementIndex : Number) => {
  circiutList.splice(CRElementIndex,1)
}


</script>

<style lang="scss" scoped>
  .CTitle{
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  .addText{
    // font-size: 22px;
    //color: #0000FF;
    color: var(--el-color-primary);
    font-weight: 700;
    cursor:pointer;
  }

  .insideTitle{
    font-size: 18px;
  }

  .cardView{
    box-shadow: 5px 5px 5px #CCCCCC;
    margin:10px 20px 20px 0;
    border: solid 1px #CCCCCC;
  }

  .circiutInputView{
    padding-top:20px;
    .circiutInput{
      text-align: center;
      margin: 0 10px;
    }

  }

  .circiutToolView{
      display:flex;
      align-items: center;
      .itemSubIcon{
        width: 30px;
        height: 30px;
        margin: 0 10px;
      }
      .itemAddIcon{
        width: 30px;
        height: 30px;
        margin: 0 10px 0 0;
      }
    }
</style>
