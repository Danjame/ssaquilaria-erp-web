<template>
  <Index
    title="溯源"
    :params="listParams"
    :count="count"
    :data="traces"
    :load="loadTraces"
    :handler-btns="false"
  >
    <template #form-item>
      <el-form-item label="产品" prop="productId">
        <el-select v-model="listParams.productId" placeholder="请选择产品" clearable>
          <el-option v-for="(product, i) in products" :key="i" :label="product.name" :value="product.id" />
        </el-select>
      </el-form-item>
    </template>
    <template #table-column>
      <el-table-column label="序列号" prop="serialNum" align="center" />
      <el-table-column label="查询次数" prop="queryCount" align="center" />
      <el-table-column label="产品" align="center">
        <template #default="scope">
          <span>{{ scope.row.transaction?.product?.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产区" align="center">
        <el-table-column label="林场" align="center">
          <template #default="scope">
            <span>{{ scope.row.transaction.product?.material?.farm ? scope.row.transaction.product?.material?.farm?.name : '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="林区" align="center">
          <template #default="scope">
            <span>{{ scope.row.transaction.product?.material?.area ? scope.row.transaction.product?.material?.area?.name : '-' }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="批次" align="center">
        <template #default="scope">
          <span>{{ scope.row.transaction ? moment(scope.row.transaction.createdAt).format('YYYY/MM/DD HH:mm') : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status === AVAILABLE" type="success">未售</el-tag>
          <el-tag v-else type="danger">已售</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template #default="scope">
          <el-space>
            <el-button type="primary" link @click="downloadQRCode(scope.row)">下载二维码</el-button>
            <el-popconfirm title="确定要删除该溯源项吗?" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="primary" link>删除</el-button>
              </template>
            </el-popconfirm>
          </el-space>
        </template>
      </el-table-column>
    </template>
  </Index>
</template>

<script lang="ts" setup>
import { getAllProducts } from '@/api/inventory/product'
import { Product } from '@/api/inventory/types/product'
import { getTracesByConditions, deleteTrace } from '@/api/commerce/trace'
import { getAllMaterials } from '@/api/inventory/material'
import { Material } from '@/api/inventory/types/material'
import { Trace } from '@/api/commerce/types/trace'
import { AVAILABLE } from '@/utils/constants'
import moment from 'moment'
import QRCode from 'qrcode'

onMounted(() => {
  loadAllProducts()
  loadAllMaterials()
  loadTraces()
})

// 产品
const products = ref<Product[]>([])
const loadAllProducts = async () => {
  products.value = await getAllProducts()
}

// 原料
const materials = ref<Material[]>([])
const loadAllMaterials = async () => {
  materials.value = await getAllMaterials()
}

// 溯源列表
const listParams = reactive({
  productId: undefined,
  page: 1,
  size: 10
})
const traces = ref<Trace[]>([])
const count = ref(0)
const loadTraces = async () => {
  const data = await getTracesByConditions(listParams)
  traces.value = data.results
  count.value = data.count
}

// 下载二维码
const downloadQRCode = async (trace: Trace) => {
  const a = document.createElement('a')
  a.href = await QRCode.toDataURL(trace.serialNum, { width: 300 })
  a.download = `${trace.transaction.product.name}_${trace.serialNum}`
  a.click()
  a.remove()
}

const handleDelete = async (id: number) => {
  await deleteTrace(id)
  ElMessage.success('删除成功')
  loadTraces()
}

// 监听参数变化
watch(() => listParams.productId, id => {
  listParams.productId = !id ? undefined : id
})
</script>

<style lang="scss" scoped>

</style>
