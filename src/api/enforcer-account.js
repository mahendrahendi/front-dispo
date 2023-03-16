import request from '@/utils/request'

export function getEnforcerList(query) {
  return request({
    url: '/enforcer/users',
    method: 'get',
    params: query
  })
}
export function postEnforcer(data) {
  return request({
    url: '/enforcer/add',
    method: 'post',
    data
  })
}
export function putEnforcer(data, enforcerId) {
  return request({
    url: '/enforcer/user/' + enforcerId,
    method: 'put',
    data
  })
}
export function putEnforcerPassword(data, enforcerId) {
  return request({
    url: '/enforcer/password/' + enforcerId,
    method: 'put',
    data
  })
}
export function deleteEnforcer(enforcerId) {
  return request({
    url: '/enforcer/user/' + enforcerId,
    method: 'delete'
  })
}
