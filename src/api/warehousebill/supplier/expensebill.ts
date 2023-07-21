import request from '@/config/axios'

//  新增总费用对账
export const createExpense = (data) => {
    return request.post({ url: '/gsc/fee/bill/ereate', data })
}

//  修改总费用对账
export const updateExpense = (data) => {
    return request.post({ url: '/gsc/fee/bill/update', data })
}

//  获取总费用对账
export const getExpense = (params) => {
    return request.get({ url: '/gsc/fee/bill/findById', params })
}

//  删除总费用对账
export const deleteExpense = (params) => {
    return request.delete({ url: '/gsc/fee/bill/deleteBillById', params })
}
