import request from '@/config/axios'

//  创建额外费用
export const createAddition = (data) => {
    return request.post({ url: '/gsc/fee/details/additionalCreate', data })
}

// 根据id查询额外费用
export const selectAddition = (params) => {
    return request.get({ url: '/gsc/fee/details/findById', params })
}
