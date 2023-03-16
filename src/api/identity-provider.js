import request from '@/utils/request'

export function getIdp(query) {
  return request({
    url: '/idp',
    method: 'get',
    params: query
  })
}

export function getIdpDetail(id) {
  return request({
    url: '/idp/'+id,
    method: 'get',
  })
}

export function postIdp(data) {
  return request({
    url: '/idp',
    method: 'post',
    data
  })
}

export function getIdpType(query) {
  return request({
    url: '/idp/types',
    method: 'get',
    params: query
  })
}

export function getIdpTypeParam(id) {
  return request({
    url: '/idp/params/'+id,
    method: 'get',
  })
}

export function postIdpTypeParam(data) {
  return request({
    url: '/idp/typeparams',
    method: 'post',
    data
  })
}

export function getIdpTypeDropdown(){
  return request({
    url: '/idp/dropdown/types',
    method: 'get',
  })
}

export function getIdpNameDropdown(){
  return request({
    url: '/idp/dropdown/name',
    method: 'get',
  })
}

export function getIdpParamDropdown(){
  return request({
    url: '/idp/dropdown/param',
    method: 'get',
  })
}

