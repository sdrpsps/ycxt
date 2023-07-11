<script setup lang="ts">
import type { IOrderDetailResponse } from '~/types/order'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const id = route.query.id
const { data } = await useGet<IOrderDetailResponse>(`/api/order/${id}`)

// 创建订单
async function confirmOrder(price: string) {
  if (Number(price) === 0) {
    const { data } = await usePost('/api/order/update', { id, status: 'COMPLETED' })

    if (data.value.statusCode === 200) {
      message.success('购买成功')
      navigateTo(`/column/detail/${id}`)
    }
  }
  navigateTo(`/order/pay?id=${id}`)
}
</script>

<template>
  <div>
    <NCard class="mb-3 font-semibold text-gray-500" size="medium">
      <h2>产品信息</h2>
      <div class="mb-5 flex">
        <NImage
          :src="`/${data?.data.course.cover}`" object-fit="cover"
          class="mr-5 h-[210px] w-[380px] rounded"
        />
        <div class="ml-4 flex flex-1 flex-col">
          <h5 class="flex text-xl text-gray-600 ">
            {{ data?.data.course.title }}
          </h5>
          <p class="my-2 ml-[0.1rem] text-sm text-gray-400">
            {{ data?.data.course.desc }}
          </p>
        </div>
      </div>

      <div class="mb-5 flex items-center">
        <span class="text-xl text-red-400">请在 30 分钟内完成支付</span>
      </div>

      <div class="flex items-center justify-end">
        总计：
        <span class="pr-4 text-2xl font-bold text-green-600">
          🌱 {{ data?.data.course.price }}
        </span>
        <NButton type="primary" @click="confirmOrder(data!.data.course.price)">
          确认订单
        </NButton>
      </div>
    </NCard>
  </div>
</template>
