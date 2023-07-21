import request from '@/config/axios'

// 根据id查询额外费用
export const selectAddition = (params) => {
    return request.get({ url: '/gsc/fee/details/findById', params })
}

// 审批额外费用
export const approvalAddition = (data) => {
    return request.post({ url: '/gsc/fee/details/examineAdditional', data })
}