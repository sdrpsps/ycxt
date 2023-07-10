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

// 获取专栏列表
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

// 获取专栏详情
export async function getColumnById(id: number): Promise<Column | null> {
  return await prisma.column.findFirst({
    where: {
      id,
    },
  })
}
