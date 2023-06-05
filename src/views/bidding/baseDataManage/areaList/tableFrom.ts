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
    isSearch: true
  },
  {
    label: '名称',
    field: 'name',
    isSearch: true
  },
  {
    label: '创建人',
    field: 'host'
  },
  {
    label: '创建时间',
    field: 'createTime',
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '更新人',
    field: 'host'
  },
  {
    label: '更新时间',
    field: 'createTime',
    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
