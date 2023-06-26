import request from '@/config/axios'

// 获取入库指令分页信息
export const getTabNumber = async (params) => {
 return await request.get({ url: '/jinko/gscwhstockpallets/getTabNumber', params })
}