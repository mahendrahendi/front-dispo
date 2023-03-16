import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getUser() {
  return request({
    url: '/admin/user',
    method: 'get',
  })
}

export function getTokenRefresh() {
  return request({
    url: '/auth/refreshtoken',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

