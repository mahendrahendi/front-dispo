import request from '@/utils/request'

export function postBalance(data) {
  return request({
    url: '/balance',
    method: 'put',
    data
  })
}

export function getBalance() {
    return request({
      url: '/balance/header',
      method: 'get'
    })
  }