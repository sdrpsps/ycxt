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
