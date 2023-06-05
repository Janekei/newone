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
    label: '状态',
    field: 'status',
    isSearch: false
  },
  {
    label: '编码',
    field: 'code',
    width:'200',
    isSearch: true
  },
  {
    label: '名称',
    field: 'name',
    width:'200',
    isSearch: true
  },
  {
    label: '类型',
    field: 'type'
  },
  {
    label: '等级',
    field: 'levels'
  },
  {
    label: '等级系数',
    field: 'coefficient'
  },
  {
    label: '账期(天)',
    field: 'paymentDays'
  },
  {
    label: '账期(天)',
    field: 'paymentDays'
  },
  {
    label: '账期系数',
    field: 'paymentDaysCoefficient'
  },
  {
    label: '关联ID',
    field: 'objId'
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
