import prisma from '~/server/database/client'

// 获取最新课程
export async function getNewCourses() {
  return await prisma.course.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 4,
  })
}
