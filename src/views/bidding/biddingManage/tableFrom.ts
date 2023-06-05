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
  // {
  //   label: '项目编号',
  //   field: 'mail',
  //   isSearch: false
  // },
  // {
  //   label: '项目名称',
  //   field: 'username',
  //   isSearch: true
  // },
  // {
  //   label: '状态',
  //   field: 'password',
  //   isSearch: true
  // },
  // {
  //   label: '销售合同号',
  //   field: 'host'
  // },
  // {
  //   label: '项目区域',
  //   field: 'host'
  // },
  // {
  //   label: '项目总量',
  //   field: 'host'
  // },
  // {
  //   label: '项目有效期',
  //   field: 'host'
  // },
  // {
  //   label: '开标时间',
  //   field: 'createTime',
  //   isForm: false,
  //   formatter: dateFormatter,
  //   detail: {
  //     dateFormat: 'YYYY-MM-DD HH:mm:ss'
  //   }
  // },
  // {
  //   label: '截标时间',
  //   field: 'createTime',
  //   isForm: false,
  //   formatter: dateFormatter,
  //   detail: {
  //     dateFormat: 'YYYY-MM-DD HH:mm:ss'
  //   }
  // },
  // {
  //   label: '中标服务商',
  //   field: 'host'
  // },
  // {
  //   label: '币种',
  //   field: 'host'
  // },
  // {
  //   label: '技术占比',
  //   field: 'host'
  // },
  // {
  //   label: '最多可出价次数',
  //   field: 'host'
  // }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
