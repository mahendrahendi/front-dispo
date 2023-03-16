import request from '@/utils/request'

export function getBillList(query) {
  return request({
    url: '/bills',
    method: 'get',
    params: query
  })
}

export function postBill(data) {
  return request({
    url: '/bill',
    method: 'post',
    data
  })
}

export function changeBillStatus(bill_id, bill_status) {
  return request({
    url: `/bill/${bill_id}`,
    method: 'put',
    data: {
      bill_status
    }
  })
}

export function getBillById(id) {
  return request({
    url: '/bill/' + id,
    method: 'get'
  })
}

export function getBillHeader() {
  return request({
    url: '/bill/header',
    method: 'get'
  })
}

export function deleteBill(bill_id) {
  return request({
    url: '/bill/' + bill_id,
    method: 'delete'
  })
}