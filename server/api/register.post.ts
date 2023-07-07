import { hash } from 'argon2'
import { omit } from 'lodash-es'
import jwt from 'jsonwebtoken'
import type { IUserRegisterBody } from '~/types/user'
import { createUser, getUserByUsername } from '~/server/database/repositories/userRepository'

export default defineEventHandler(async (e) => {
  try {
    // 读取请求体
    const data = await readBody<IUserRegisterBody>(e)

    // 查询数据库，是否存在同名用户
    const user = await getUserByUsername(data.username)
    if (user) {
      return sendError(e, createError({
        statusCode: 400,
        statusMessage: '用户已存在',
      }))
    }

    // 不存在同名用户，进入注册流程
    // 加密用户密码并入库
    const res = await createUser({
      username: data.username,
      password: await hash(data.password),
    })

    // 生成 JWToken，写入 cookies
    const token = jwt.sign({ username: res.username }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
    const response = omit({ ...res, token }, 'password')

    return {
      statusCode: 200,
      statusMessage: '注册成功',
      data: {
        response,
      },
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      message: '注册失败',
    }))
  }
})
