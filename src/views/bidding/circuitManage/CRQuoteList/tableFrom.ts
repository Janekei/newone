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
    field: 'mail',
    isSearch: false
  },
  {
    label: '承运商名称',
    field: 'username',
    isSearch: true
  },
  {
    label: '线路',
    field: 'password'
  },
  {
    label: '运输方式',
    field: 'host'
  },
  {
    label: '起运地编码',
    field: 'host'
  },
  {
    label: '起运地名称',
    field: 'host',
    isSearch: true
  },
  {
    label: '目的地编码',
    field: 'host'
  },
  {
    label: '目的地名称',
    field: 'host',
    isSearch: true
  },
  {
    label: 'FOB协议选项',
    field: 'host'
  },
  {
    label: '费用项',
    field: 'host'
  },
  {
    label: '计费工具',
    field: 'host'
  },
  {
    label: '承运商编码',
    field: 'host',
    isSearch: true
  },
  {
    label: '报价',
    field: 'host'
  },
  {
    label: '报价生效日期',
    field: 'createTime',
    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '报价失效日期',
    field: 'createTime',
    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '项目编号',
    field: 'host'
  },
  {
    label: '销售合同号',
    field: 'host'
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
