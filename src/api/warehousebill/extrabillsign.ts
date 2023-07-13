import request from '@/config/axios'

//  创建模板
export const createTemplate = (data) => {
    return request.post({ url: '/gsc/fee/template/create', data })
}
