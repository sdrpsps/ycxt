import { getColumns } from '~/server/database/repositories/columnRepository'

export default defineEventHandler(async (e) => {
  try {
    // 获取分页信息
    const query = getQuery(e)
    const page = query.page ? Number.parseInt(query.page as string) : 1
    const size = query.size ? Number.parseInt(query.size as string) : 8
    // 分页获取专栏列表和总条数
    const { columns, total } = await getColumns(page, size)

    return {
      statusCode: 200,
      statusMessage: '获取成功',
      data: { list: columns, total },
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      statusMessage: '获取数据失败',
    }))
  }
})
