import { getNewColumns } from '~/server/database/repositories/columnRepository'

export default defineEventHandler(async (e) => {
  try {
    const columns = await getNewColumns()

    return {
      statusCode: 200,
      statusMessage: '查询成功',
      data: columns,
    }
  }
  catch (error) {
    return sendError(e, createError('获取数据失败'))
  }
})
