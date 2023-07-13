import request from '@/config/axios'
import { getIntDictOptions } from '@/utils/dict'

// 获取国家/港口信息
export const findCountry = async (data) => {
    return await request.post({ url: '/gsc/standardTime/findCountry', data })
}

// 新增标准时间规则
export const addTimeRules = async (data) => {
    return await request.post({ url: '/gsc/standardTime/create', data })
}

// 查询时间规则
export const searchTimeRules = async (params) => {
    return await request.get({ url: '/gsc/standardTime/get', params })
}

// 更新时间规则
export const updateTimeRules = async (data) => {
    return await request.put({ url: '/gsc/standardTime/update', data })
}

// 删除时间规则
export const deleteTimeRules = async (params) => {
    return await request.delete({ url: '/gsc/standardTime/delete', params })
}

// 获取运输方式数据字典
export const getDictOptions = (dictType:string) => {
    return getIntDictOptions(dictType)
}
export const getDictLabel = (dictType: string, value: any) => {
    const dictOptions = getDictOptions(dictType)
    const dictLabel = ref('')
    dictOptions.forEach((dict) => {
        if (dict.value === value) {
            dictLabel.value = dict.label
        }
    })
    return dictLabel.value
}