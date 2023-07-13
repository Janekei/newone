import request from '@/config/axios'

//  创建模板
export const createAddition = (data) => {
    return request.post({ url: '/gsc/fee/details/additionalCreate', data })
}
