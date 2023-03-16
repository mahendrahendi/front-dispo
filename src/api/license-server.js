import request from '@/utils/request'

export function getLicenseServerList(query) {
  return request({
    url: '/servers',
    method: 'get',
    params: query
  })
}
export function getLicenseTypesList(query) {
  return request({
    url: '/server/licensetypes',
    method: 'get',
    params: {
      domainUrl: query
    }
  })
}
export function getLicenseServerDetail(query) {
  return request({
    url: '/server/detail',
    method: 'get',
    params: query
  })
}
