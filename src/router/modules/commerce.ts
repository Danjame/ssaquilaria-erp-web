import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'commerce',
  component: RouterView,
  meta: { title: '订单管理' },
  children: [
    {
      path: 'purchase',
      name: 'purchase',
      component: () => import('@/views/commerce/purchase/index.vue'),
      meta: { title: '采购' }
    },
    {
      path: 'sale',
      name: 'sale',
      component: () => import('@/views/commerce/sale/index.vue'),
      meta: { title: '销售' }
    },
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('@/views/commerce/supplier/index.vue'),
      meta: { title: '供应商' }
    },
    {
      path: 'trace',
      name: 'trace',
      component: () => import('@/views/commerce/trace/index.vue'),
      meta: { title: '溯源' }
    }
  ]
}

export default routes
