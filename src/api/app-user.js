import request from '@/utils/request'

export function getAppUser(query) {
  return request({
    url: '/user/all',
    method: 'get',
    params: query
  })
}

export function getAppUserDetail(regNum) {
  return request({
    url: '/user/'+regNum,
    method: 'get',
  })
}