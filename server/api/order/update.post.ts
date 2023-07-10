import { updateOrder } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  try {
    await updateOrder(Number(body.id), { status: body.status })
    return {
      statusCode: 200,
      statusMessage: '更新成功',
    }
  }
  catch (error) {
    return sendError(e, createError('订单状态更新失败'))
  }
})
