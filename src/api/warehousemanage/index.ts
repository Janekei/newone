import request from '@/config/axios'


// 获取仓库信息 ----传入参数id
export const getWarehouseList = async (params) => {
    return await request.get({ url: '/jinko/baseWarehouse/get', params })
}

// 新增数据
export const addWarehouseItem = async (data) => {
    return await request.post({ url: '/jinko/baseWarehouse/create', data })
}

// 更新数据
export const changeWarehouseItem = async (data) => {
    // console.log(params)
    return await request.put({ url: '/jinko/baseWarehouse/update', data })
}

// 删除数据
export const deleteWarehouseItem = async (params) => {
    console.log(params)
    return await request.delete({ url: '/jinko/baseWarehouse/delete', params })
}

// 导出数据
export const exportData = async (params) => {
    console.log(params)
    return await request.get({ url: '/jinkotms/baseWarehouse/export-excel', params })
}

// 条件查询数据
export const SearchDataItem = async (params) => {
    return await request.get({ url: '/jinkotms/baseWarehouse/conditionalQueryPage', params })
}

// 获取国家数据
export const getAreaData = async (params) => {
    return await request.get({ url: '/bidding/area/location/findCountry', params })
}