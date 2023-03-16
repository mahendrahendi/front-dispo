import request from '@/utils/request'

export function getSupplierList(query) {
  return request({
    url: '/suppliers',
    method: 'get',
    params: query
  })
}

export function getItemBySuppId(id) {
  return request({
    url: `/supplier/${id}/items`,
    method: 'get',
  })
}

export function postSupplier(data) {
  return request({
    url: '/supplier',
    method: 'post',
    data
  })
}