import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
// import { dateFormatter } from '@/utils/formatTime'
const { t } = useI18n() // 国际化
const accountList = reactive([])

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
    label: '线路',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '状态',
    field: 'templateNickname',
    isSearch: false
  },
  {
    label: '运输方式',
    field: 'username'
  },
  {
    label: '起运地编码',
    field: 'password',
    isSearch: true
  },
  {
    label: '起运地名称',
    field: 'host',
    isSearch: true,
    search: {
      show: true,
      component: 'Select',
      api: () => accountList,
      componentProps: {
        optionsAlias: {
          labelField: 'mail',
          valueField: 'id'
        }
      }
    }
  },

  {
    label: '目的地编码',
    field: 'host',
    isSearch: true
  },
  {
    label: '目的地名称',
    field: 'host',
    isSearch: true
  },
  {
    label: '操作',
    field: 'actions',
    name:'actions'
    // isForm: false,
    // isDetail: false
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
