import { getNewCourses } from '../../database/repositories/courseRepository'

export default defineEventHandler(async (e) => {
  try {
    const courses = await getNewCourses()
    return {
      statusCode: 200,
      statusMessage: '查询成功',
      data: courses,
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      message: '查询失败',
    }))
  }
})
