<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle" width="700" center>
    <div ref="refDialog">
      {{ formData }}
      <FormK
        :formOption="formOption"
        v-model:formState="formData"
        labelWidth="6em"
        ref="myForm"
      />
    </div>
    <template #footer>
      <el-button type="primary" :disabled="formLoading" @click="submitForm"
        >确认</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ElButton } from "element-plus";
import { Dialog } from "@/components/Dialog";
import { ref } from "vue";
import * as InboundInstruction from "@/api/inventorysnapshot/inboundinstruction";

const props = defineProps({
  ids: {
    type: Array as any,
    default: () => {},
  },
});

let formData = ref({
  id: undefined,
  name: undefined,
  countryName: undefined,
  provinceName: undefined,
  cityName: undefined,
  zipCode: undefined,
  address: undefined,
});

const formOption = reactive([
  {
    type: "inputTable",
    field: "name",
    placeholder: "请输入仓库名称",
    label: "仓库名称",
    rules: [{ required: true, message: "请输入仓库名称", trigger: "change" }],
    valueKey: "name",
    setFormData: (row) => {
      formData.value["id"] = row.id;
      formData.value["name"] = row.name;
      formData.value["countryName"] = row.countryName;
      formData.value["provinceName"] = row.provinceName;
      formData.value["cityName"] = row.cityName;
      formData.value["zipCode"] = row.zipCode;
      formData.value["address"] = row.address;
    },
    tableConfig: {
      url: "/jinko/baseWarehouse/page",
      tableOption: [
        {
          prop: "name",
          label: "仓库名",
        },
        {
          prop: "id",
          label: "Code",
        },
      ],
    },
  },
  {
    type: "input",
    field: "countryName",
    placeholder: "",
    label: "国家",
    disabled: true,
  },
  {
    type: "input",
    field: "provinceName",
    placeholder: "",
    label: "省份",
    disabled: true,
  },
  {
    type: "input",
    field: "cityName",
    placeholder: "",
    label: "城市",
    disabled: true,
  },
  {
    type: "input",
    field: "address",
    placeholder: "",
    label: "具体地址",
    disabled: true,
  },
  {
    type: "input",
    field: "zipCode",
    placeholder: "",
    label: "zip code",
    disabled: true,
  },
]);

// 表单内容区域
const dialogVisible = ref(false); // 弹窗的是否展示
const dialogTitle = ref(""); // 弹窗的标题
const formLoading = ref(false); // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const myForm = ref();

// 打开弹窗方法
const open = async (title: string) => {
  dialogVisible.value = true;
  dialogTitle.value = title;
  reset();
};

const emit = defineEmits(["success"]);

const submitForm = async () => {
  const res = await InboundInstruction.allotWhareahouse({
    ids: props.ids,
    warehouseId: formData.value.id,
  });
  if (res) {
    ElMessage.success("分配仓库成功！");
  } else {
    ElMessage.error("分配仓库失败！");
  }
  dialogVisible.value = false;
  // 发送操作成功的事件
  emit("success");
};

defineExpose({
  open,
});

const reset = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    countryName: undefined,
    provinceName: undefined,
    cityName: undefined,
    zipCode: undefined,
    address: undefined,
  };
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header,
.el-dialog__header {
  border: none !important;
}

.content {
  width: 100%;
  text-align: center;
  font-size: 1.125rem;
  color: #333;
}

.formContent {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
