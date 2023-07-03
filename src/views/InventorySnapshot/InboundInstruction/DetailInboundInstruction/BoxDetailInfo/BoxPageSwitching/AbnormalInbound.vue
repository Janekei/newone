<template>
    <TableK url="/jinko/gscwhinboundcontainer/page" method="get" :params="formData" :firstPages="20" ref="tableRef"
        :showFixedOperation="true" :showIndex="true" :tableOption="tableOption" @selectThisColumn="selectThisColumn">
        <template #buttons>
            <SearchContent :formOption="formOption" @click-search="clickSearch" @update:form-state="updateSearchData" />
        </template>
        <template #createTime="{ row }">
            <span>{{ formatTime(row.row.estInTime, "yyyy-MM-dd") }}</span>
        </template>
        <template #updateTime="{ row }">
            <span>{{ formatTime(row.row.estInTime, "yyyy-MM-dd") }}</span>
        </template>
        <template #operation="{ operateRow }">
            <ElButton class="edit-btn" type="warning" @click="clickTray(operateRow)">选托</ElButton>
        </template>
    </TableK>
    <div class="box-btn">
        <el-button class="button" type="primary" @click="back">返回</el-button>
        <el-button class="button" type="primary" @click="errorRecord">异常登记</el-button>
    </div>
    <DialogInbound :inboundIdsBox="inboundIdsBox" ref="refDialog" @success="refresh" />
</template>

<script lang="ts" setup>
import { ElButton, ElMessage } from "element-plus";
import { formatTime } from "@/utils";
import TableK from "@/components/TableK/index.vue";
import DialogInbound from "../../../components/DialogInbound.vue";
import SearchContent from "../../../components/SearchContent.vue";

const props = defineProps({
    inboundId: {
        type: Number,
        default: 1,
    },
});
let formData = ref({
    inboundId: props.inboundId,
});

// 保存当前行的id
let inboundIdsBox: any = ref([]);
const selectThisColumn = (rows) => {
    inboundIdsBox.value = [];
    rows.forEach((item) => {
        inboundIdsBox.value.push(item.id);
    });
};

// 搜索
const tableRef = ref();
const formOption = reactive([
    {
        type: "input",
        field: "containerNo",
        placeholder: "请填写箱号",
        label: "箱号",
    },
    {
        type: "input",
        field: "lockNo",
        placeholder: "请输入锁号",
        label: "锁号",
    },
]);
const clickSearch = () => {
    refresh();
};
const updateSearchData = async (val) => {
    formData.value = {
        inboundId: props.inboundId,
    };
    await Object.assign(formData.value, val);
};
// 刷新列表
const refresh = () => {
    tableRef.value.refresh();
};

// ref弹窗
const refDialog = ref();
// 确认异常登记
const errorRecord = () => {
    if (inboundIdsBox.value.length > 0) {
        refDialog.value.open("异常登记", "异常类型确认", "箱");
    } else {
        ElMessage.error("请选择所需要入库的箱！");
    }
};

// 选托
const emits = defineEmits(["backWaybill", "showTrayList"]);
const clickTray = (row) => {
    emits("showTrayList", row.id);
};

// 返回运单信息
const back = () => {
    emits("backWaybill");
};

// table表格列数据
const tableOption = reactive([
    {
        prop: "containerNo",
        label: "箱号",
        width: "180",
    },
    {
        prop: "bl",
        label: "提单号",
        width: "180",
    },
    {
        prop: "cabinetTypeName",
        label: "箱型",
        width: "180",
    },
    {
        prop: "lockNo",
        label: "锁号",
        width: "180",
    },
    {
        prop: "totalQuantity",
        label: "件数",
        width: "180",
    },
    {
        prop: "totalWeight",
        label: "重量",
        width: "180",
    },
    {
        prop: "totalVolumn",
        label: "体积",
        width: "180",
    },
    {
        prop: "creator",
        label: "创建人",
        width: "120",
    },
    {
        prop: "createTime",
        label: "创建时间",
        slotName: "createTime",
        width: "180",
    },
    {
        prop: "updater",
        label: "更新人",
        width: "120",
    },
    {
        prop: "updateTime",
        label: "更新时间",
        slotName: "updateTime",
        width: "180",
    },
]);
</script>
<style lang="scss" scoped>
.box-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.125rem;
    width: 100%;
    // background-color: aqua;
    margin: 1.25rem 0;

    .button {
        margin-right: 1.25rem;
    }
}

.edit-btn {
    font-weight: 700;
    border: none;
}
</style>
