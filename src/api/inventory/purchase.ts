import request from '@/utils/request'
import { Purchase } from './types/purchase'

interface PurchaseAttrs {
  orderNum: string
  productId: number | undefined
  supplierId: number | undefined
  price: number | undefined
  quantity: number | undefined
  amount: number | undefined
  comment: string
}

interface PurchaseConditions {
  orderNum?: number
  productId?: number
  supplierId?: number
  page?: number
  size?: number
}

export const createPurchase = (data: PurchaseAttrs) => {
  return request<Purchase>({
    method: 'POST',
    url: '/inventory/purchases',
    data
  })
}

export const getPurchasesByConditions = (params?: PurchaseConditions) => {
  return request<{
    results: Purchase[],
    size: number,
    page: number,
    total: number
  }>({
    method: 'GET',
    url: '/inventory/purchases/conditions',
    params
  })
}

export const deletePurchaseById = (id: number) => {
  return request<Purchase>({
    method: 'DELETE',
    url: `/inventory/purchases/${id}`
  })
}
