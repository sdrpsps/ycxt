import { getOrderById } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const id = e.context.params?.id ? Number.parseInt(e.context.params.id) : undefined
  if (!id) {
    return sendError(e, createError({
      statusCode: 400,
      statusMessage: '缺少订单id',
    }))
  }
  const order = await getOrderById(id)
  return {
    statusCode: 200,
    statusMessage: '获取成功',
    data: order,
  }
})
