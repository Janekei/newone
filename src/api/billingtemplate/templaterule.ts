import request from '@/config/axios'

//  创建模板
export const createTemplate = (data) => {
    return request.post({ url: '/jinko/fee/template/create', data })
}

// 创建模板明细
export const createTemplateDetail = (data) => {
    return request.post({ url: '/jinko/fee/template/details/create', data })
}

// 获取模板基础信息
export const getTemplate = (params) => {
    return request.get({ url: '/jinko/fee/template/findById', params })
}

// 获得模板明细分页
export const getTemplateDetail = (params) => {
    return request.get({ url: 'jinko/fee/template/details/page', params })
}

// 更新模板明细信息
export const updateTempDetail = (data) => {
    return request.post({ url: '/jinko/fee/template/details/update', data })
}

// 删除模板明细
export const deleteTempDetail = (params) => {
    return request.delete({ url: '/jinko/fee/template/details/deleteById', params})
}