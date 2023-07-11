import { getCoursesByUser } from '~/server/database/repositories/orderRepository'
import { getTokenInfo } from '~/server/database/service/token'
import type { UserInfo } from '~/types/user'

export default defineEventHandler(async (e) => {
  try {
    const userInfo = getTokenInfo(e) as UserInfo

    const courses = await getCoursesByUser(userInfo.id)

    return {
      statusCode: 200,
      statusMessage: '查询成功',
      data: courses,
    }
  }
  catch (error) {
    return sendError(e, createError('获取数据失败'))
  }
})
