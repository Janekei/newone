import request from '@/config/axios'

//  创建新建仓储计费规则
export const createBillingRrule = (data) => {
    return request.post({ url: '/jinko/fee/template/rule/create', data})
}

// 使用仓储计费模板
export const toUsedTemps = (data) => {
    return request.post({ url: '/jinko/fee/template/rule/usedTemp', data })
}

// 获得仓储计费规则明细分页
export const getRuleDetail = (params) => {
    return request.get({ url: '/jinko/fee/template/rule/details/page', params })
}

// 新建仓储计费规则明细
export const createRuleDetail = (data) => {
  return request.post({ url: '/jinko/fee/template/rule/details/create', data })
}

// 更新仓储计费规则明细
export const updateRuleDetail = (data) => {
  return request.post({ url: '/jinko/fee/template/rule/details/update', data })
}

// 删除仓储计费规则明细
export const deleteRuleDetail = (id: number) => {
  return request.delete({ url: '/jinko/fee/template/rule/details/deleteById?id=' + id})
}

// 获得仓储计费规则基础信息
export const getRuleBaseInfo = (params) => {
  return request.get({ url: '/jinko/fee/template/rule/findById', params })
}

// 更新仓储计费规则基础信息
export const updateRuleBaseInfo = (data) => {
  return request.post({ url: '/jinko/fee/template/rule/update', data })
}