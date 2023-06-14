import request from '@/config/axios'


// 获取仓库信息 ----传入参数id
export const getWarehouseList = async (params) => {
    return await request.get({ url: '/jinkotms/baseWarehouse/get', params })
}

// 新增数据
export const addWarehouseItem = async (data) => {
    return await request.post({ url: '/jinkotms/baseWarehouse/create', data })
}

// 更新数据
export const changeWarehouseItem = async (data) => {
    // console.log(params)
    return await request.put({ url: '/jinkotms/baseWarehouse/update', data })
}

// 删除数据
export const deleteWarehouseItem = async (params) => {
    console.log(params)
    return await request.delete({ url: '/jinkotms/baseWarehouse/delete', params })
} 

// 导出数据
export const exportData = async (params) => {
    console.log(params)
    return await request.get({ url: '/jinkotms/baseWarehouse/export-excel', params })
} 