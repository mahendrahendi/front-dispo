import request from '@/utils/request'

export function getApplication(group) {
  return request({
    url: '/application/'+group,
    method: 'get',
  })
}

export function getApplicationDetail(id) {
  return request({
    url: '/application/detail/'+id,
    method: 'get',
  })
}

export function postApplication(data) {
  return request({
    url: '/application',
    method: 'post',
    data
  })
}

export function getApplicationGroupDropdown() {
  return request({
    url: '/appgroup/dropdown',
    method: 'get',
  })
}

export function postApplicationGroup(data) {
  return request({
    url: '/appgroup',
    method: 'post',
    data
  })
}