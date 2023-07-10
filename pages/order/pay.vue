<script setup lang="ts">
import type { IOrderDetailResponse } from 'types/order'

const route = useRoute()
const { id } = route.query

// 获取订单过期时间，用于倒计时，如果已过期可以设置isTimeout，略
const { data: orderData } = await useGet<IOrderDetailResponse>(`/api/order/${id}`)

if (process.client) {
  setTimeout(async () => {
    const { data } = await usePost('/api/order/update', { id, status: 'COMPLETED' })

    if (data.value.statusCode === 200) {
      message.success('购买成功')
      navigateTo(`/course/detail/${orderData.value?.data.courseId}`)
    }
  }, 5000)
}

const isTimeout = ref(false)
</script>

<template>
  <div class="flex justify-center">
    <NCard class="mb-10 w-[450px] text-center">
      <h1 class="mb-2 text-center text-3xl">
        确认支付
      </h1>
      <p class="flex  justify-center text-gray-500">
        <span v-if="!isTimeout">
          距离过期还有&nbsp;
          <Counter :expire="30" class="text-rose-500" @end="isTimeout = true" />
        </span>
        <span v-else>订单已过期，请重新订阅课程</span>
      </p>
      <h5 class="mb-3 mt-0 flex items-center justify-center">
        总额：
        <span class="text-2xl font-bold text-green-600">
          🌱 {{ orderData?.data.course.price }}
        </span>
      </h5>
      <img src="/qrcode.jpg">
      <div class="flex items-center justify-center py-4 text-green-500">
        <div class="ml-3 text-sm text-gray-500">
          <p>请用防狼枪扫射二维码</p>
        </div>
      </div>
    </NCard>
  </div>
</template>
