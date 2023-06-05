import request from '@/config/axios'

//获取基础数据-区域列表
export const getAreaRegionList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/area/region/page', params })
}

//获取基础数据-承运商列表
export const getCarrierList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/carrier/page', params })
}

//获取基础数据-国内行政区列表
export const getDDList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/area/district/domestic/page', params })
}

//获取基础数据-海外行政区列表
export const getADList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/area/district/abroad/page', params })
}

//获取基础数据-运输点列表
export const getAreaLocationList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/area/location/page', params })
}
