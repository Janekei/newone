<template>
  <ElInput v-model="curValue" :placeholder="placeholder" @input="change" :clearable="true" @keyup.enter="enterFn"
    style="width: 100%" @blur="onBlur" @clear="clearFn">
    <template #append>
      <ElButton :icon="Search" style="margin: 0 -23px" ref="buttonRef" v-click-outside="onClickOutside" />
    </template>
  </ElInput>
  <ElPopover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" virtual-triggering width="auto"
    v-model:visible="showPopoverRef">
    <ElInput v-model="searchKey" :clearable="true">
      <template #append>
        <ElButton :icon="Search" style="margin: 0 -23px" @click="searchTable" />
      </template>
    </ElInput>
    <TableK :tableOption="tableConfig.tableOption" size="small" :firstPages="5" :showCheckBox="false" pageSmall
      ref="TableKRef" @clickThisColumn="clickThisColumn" :url="tableConfig.url" :params="params"
      :method="tableConfig.method" :data="tableConfig.data" />
  </ElPopover>
</template>

<script lang="ts" setup>
import { ref, unref, watch, computed } from "vue";
import {
  ElInput,
  ElButton,
  ElPopover,
  ClickOutside as vClickOutside,
} from "element-plus";
import { Search } from "@element-plus/icons-vue";
import TableK from "@/components/TableK/index.vue";

const emits: any = defineEmits(["onChange", "getMyInputTableData"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "请输入",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  valueKey: {
    type: String,
    default: "",
  },
  tableConfig: {
    type: Object as any,
    default: () => ({}),
  },
  setFormData: {
    type: Function,
    default: null,
  },
  clearData: {
    type: Function,
    default: null,
  },
});

const curValue = ref();
// 按钮
const buttonRef = ref();
// ElPopover
const popoverRef = ref();
// 按钮点击事件
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

// 表格请求参数
const searchKey = ref();
const params = computed(() => {
  return {
    ...props.tableConfig.params,
    searchKey: searchKey.value,
  };
});
// const getTableData = (tableData) => {
//   emits('getMyInputTableData', tableData)
// }

// 回车事件
const showPopoverRef = ref(false);
const enterFn = () => {
  searchKey.value = curValue.value;
  showPopoverRef.value = true;
};

// 点击×清空按钮清空输入框
const clearFn = () => {
  console.log(111);
};

watch(
  () => props.modelValue,
  () => {
    curValue.value = props.modelValue;
  },
  { immediate: true }
);

watch(showPopoverRef, (newV) => {
  if (newV) {
    TableKRef.value.refresh();
  }
});

const change = (value: any, row?) => {
  emits("update:modelValue", value);
  emits("onChange");
  props.setFormData && props.setFormData(row);
};

const clickThisColumn = (row: any) => {
  change(row[props.valueKey], row);
};

// 搜索可选项
const TableKRef = ref();
const searchTable = () => {
  TableKRef.value.refresh();
};

// 外层input失去焦点
const onBlur = () => {
  change("");
};
</script>

<style lang="scss"></style>
