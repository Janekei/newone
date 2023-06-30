import request from '@/config/axios'

// 区域管理

// 获取基础数据列表
export const getZoneList = async (params) => {
    return await request.get({ url: '/jinko/baseWharea/list', params })
}

// 新增区域数据
export const addZoneItem = async (data) => {
    return await request.post({ url: '/jinko/baseWharea/create', data })
}

// 更新区域数据
export const changeZoneItem = async (data) => {
    return await request.put({ url: '/jinko/baseWharea/update', data })
}

// 删除区域数据
export const deleteZoneItem = async (params) => {
    return await request.delete({ url: '/jinko/baseWharea/delete', params })
}