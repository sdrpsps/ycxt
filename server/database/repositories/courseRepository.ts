import type { Course } from '@prisma/client'
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

// 获取课程列表
export async function getCourses(page: number, size: number): Promise<{ courses: Course[] | null; total: number }> {
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * size,
      take: size,
    }),
    prisma.column.count(),
  ])
  return { courses, total }
}

// 获取课程详情
export async function getCourseById(id: number): Promise<Course | null> {
  return await prisma.course.findFirst({
    where: {
      id,
    },
    include: { Catalogue: true },
  })
}
