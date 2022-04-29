import { Product } from './product'
import { Supplier } from './supplier'

export interface Category {
  id: number
  name: string
  value: string
  label: string
  products?: Product[]
  suppliers?: Supplier[]
  createdAt: Date
  updatedAt: Date
}

export interface CategoryConditions {
  productId?: number
  page?: number
  size?: number
}

export interface CategoryAttrs {
  name: string
  value: string
  label: string
}
