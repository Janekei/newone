import request from '@/config/axios'

//获取线路管理-线路列表
export const getBiddingLineList = async (params: PageParam) => {
  return await request.get({ url: '/bidding/line/page', params })
}
