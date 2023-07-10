import type { Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'
import { getTokenInfo } from '~/server/database/service/token'
import { createOrder } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const { courseId } = await readBody(e)

  const result = getTokenInfo(e)

  const orderData = {
    courseId: Number(courseId),
    userId: result.id,
    createdAt: new Date(),
    status: OrderStatus.WAIT_CONFIRM,
  } as Order

  const order = await createOrder(orderData)

  return {
    statusCode: 200,
    statusMessage: '创建成功',
    data: { orderId: order.id },
  }
})
