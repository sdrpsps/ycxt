import { getCourses } from '~/server/database/repositories/courseRepository'

export default defineEventHandler(async (e) => {
  try {
    // 获取分页信息
    const query = getQuery(e)
    const page = query.page ? Number.parseInt(query.page as string) : 0
    const size = query.size ? Number.parseInt(query.size as string) : 8
    // 分页获取课程列表和总条数
    const { courses, total } = await getCourses(page, size)

    return {
      statusCode: 200,
      statusMessage: '获取成功',
      data: { list: courses, total },
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      statusMessage: '获取数据失败',
    }))
  }
})
