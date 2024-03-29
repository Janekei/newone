import request from '@/config/axios'

export const transportStatistics = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/transportStatistics', data })
}

export const deliveringAmount = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/deliveringAmount', data })
}

export const transitNotPOD = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/transitNotPOD', data })
}

export const podAchievementRate = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/podAchievementRate', data })
}

export const timelyBookingRate = (data: any): Promise<IResponse> => {
 return request.post({ url: '/lcdp/logisticsHome/timelyBookingRate', data })
}