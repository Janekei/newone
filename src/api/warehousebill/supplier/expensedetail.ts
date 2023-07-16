import request from '@/config/axios'

//  通过id获取账单明细信息
export const getExpenseDetail = (params) => {
    return request.get({ url: '/gsc/fee/summary/details/findById', params })
}

// 对账审批
export const approvalBill = (data) => {
    return request.post({ url: '/gsc/fee/summary/details/updateSalesmanNotes', data })
}
