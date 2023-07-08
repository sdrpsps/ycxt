import type { Column } from '@prisma/client'
import prisma from '~/server/database/client'

// 获取最新专栏
export async function getNewColumns() {
  return await prisma.column.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 4,
  })
}

export async function getColumns(page: number, size: number): Promise<{ columns: Column[] | null; total: number }> {
  const [columns, total] = await Promise.all([
    prisma.column.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * size,
      take: size,
    }),
    prisma.column.count(),
  ])
  return { columns, total }
}
