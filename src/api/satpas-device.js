import request from '@/utils/request'

export function getSatpasList(query) {
  return request({
    url: '/satpases',
    method: 'get',
    params: query
  })
}
export function getSatpasDropdown() {
  return request({
    url: '/satpas/dropdown',
    method: 'get',
  })
}
export function postSatpas(data) {
  return request({
    url: '/satpas',
    method: 'post',
    data
  })
}
export function putSatpas(data, satpasId) {
  return request({
    url: '/satpas/' + satpasId,
    method: 'put',
    data
  })
}
export function deleteSatpas(satpasId) {
  return request({
    url: '/satpas/' + satpasId,
    method: 'delete'
  })
}
