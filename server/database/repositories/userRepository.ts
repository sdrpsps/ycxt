import type { User } from '@prisma/client'
import prisma from '~/server/database/client'
import type { IUser } from '~/types/IUser'

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function createUser(data: IUser) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  })
}
