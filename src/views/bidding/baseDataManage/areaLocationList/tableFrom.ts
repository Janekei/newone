import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'
const { t } = useI18n() // 国际化

// 表单校验
export const rules = reactive({
  mail: [
    { required: true, message: t('profile.rules.mail'), trigger: 'blur' },
    {
      type: 'email',
      message: t('profile.rules.truemail'),
      trigger: ['blur', 'change']
    }
  ],
  username: [required],
  password: [required],
  host: [required],
  port: [required],
  sslEnable: [required]
})

// CrudSchema
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '编码',
    field: 'code',
    isSearch: false
  },
  {
    label: '名称',
    field: 'name',
    width:'200',
    isSearch: true
  },
  {
    label: '全称',
    field: 'fullName',
    width:'200',
    isSearch: true
  },
  {
    label: '上级名称',
    field: 'parentName'
  },
  {
    label: '详细地址',
    field: 'addDetail'
  },
  {
    label: '类型',
    field: 'type'
  },
  {
    label: '运输点类型',
    field: 'nodeType'
  },
  {
    label: '状态',
    field: 'status'
  },
  {
    label: '街道',
    field: 'street'
  },
  {
    label: '门牌号',
    field: 'number'
  },
  {
    label: '经度',
    field: 'longitude'
  },
  {
    label: '纬度',
    field: 'latitude'
  },
  {
    label: '创建时间',
    field: 'createTime',
    width:'200',
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
