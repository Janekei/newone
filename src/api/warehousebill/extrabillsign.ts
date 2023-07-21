import request from '@/config/axios'

//  创建额外费用基础信息
export const createAddition = (data) => {
    return request.post({ url: '/gsc/fee/summary/details/create', data })
}

// 录入额外费用的计费明细
export const createAdditionDetail = (data) => {
    return request.post({ url: '/gsc/fee/details/additionalCreate', data })
}

// 根据id查询额外费用
export const selectAddition = (params) => {
    return request.get({ url: '/gsc/fee/details/findById', params })
}

// 删除额外费用
export const deleteAddition = (params) => {
    return request.delete({ url: '/gsc/fee/details/deleteAdditionalDetailsById', params })
}

// 修改额外费用
export const updateAddition = (data) => {
    return request.post({ url: '/gsc/fee/details/update', data })
}


