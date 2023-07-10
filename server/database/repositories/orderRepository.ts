import type { Order } from '@prisma/client'
import prisma from '~/server/database/client'

export async function createOrder(data: Order) {
  const user = await prisma.order.create({ data })
  return user
}

export async function getOrderById(id: number) {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      course: {
        select: {
          desc: true,
          title: true,
          cover: true,
          price: true,
        },
      },
    },
  })
  return result
}

export async function updateOrder(id: number, data: Partial<Order>) {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data,
  })
  return result
}
