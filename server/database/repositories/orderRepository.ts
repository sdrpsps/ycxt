import type { Order } from '@prisma/client'
import prisma from '~/server/database/client'

// 创建订单
export async function createOrder(data: Order) {
  return await prisma.order.create({ data })
}

// 获取订单详情
export async function getOrderById(id: number) {
  return await prisma.order.findUnique({
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
}

// 修改订单详情
export async function updateOrder(id: number, data: Partial<Order>) {
  return await prisma.order.update({
    where: {
      id,
    },
    data,
  })
}

// 通过用户id获取订单列表
export async function getCoursesByUser(userId: number) {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          cover: true,
        },
      },
    },
  })

  const courses = orders.flatMap(order => order.course)
  return courses.filter((course, index, arr) => arr.findIndex(c => c.id === course.id) === index)
}
