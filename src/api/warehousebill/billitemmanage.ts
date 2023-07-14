import request from '@/config/axios'

//  新增计费项
export const createItem = (data) => {
    return request.post({ url: '/gsc/items/create', data })
}

//  修改计费项
export const updateItem = (data) => {
    return request.post({ url: '/gsc/items/update', data })
}

//  删除计费项
export const deleteItem = (params) => {
    return request.delete({ url: '/gsc/items/deleteById', params })
}

//  获得计费项
export const getItem = (params) => {
    return request.get({ url: '/gsc/items/findById', params })
}