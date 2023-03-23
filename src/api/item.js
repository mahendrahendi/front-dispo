import request from '@/utils/request'

export function getItemList(query) {
  return request({
    url: '/suppliers',
    method: 'get',
    params: query
  })
}

export function getItemListBySuppID(id) {
  return request({
    url: `/supplier/${id}/items`,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: `/item/${id}`,
    method: 'delete'
  })
}

export function postItem(data) {
  return request({
    url: '/item',
    method: 'post',
    data
  })
}

export function putItem(data, id) {
  return request({
    url: '/item/' + id,
    method: 'put',
    data
  })
}