import type { User } from '@prisma/client'
import prisma from '~/server/database/client'
import type { IUserRegister } from '~/types/user'

// 通过唯一用户名查找
export async function getUserByUsername(username: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  })
}

// 创建用户
export async function createUser(data: IUserRegister) {
  return await prisma.user.create({ data })
}
