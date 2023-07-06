import jwt from 'jsonwebtoken'
import { verify } from 'argon2'
import type { IUserLogin } from '~/types/user'
import { getUserByUsername } from '~/server/database/repositories/userRepository'

export default defineEventHandler(async (e) => {
  try {
    // 读取请求体
    const data = await readBody<IUserLogin>(e)

    // 查询数据库，是否存在同名用户
    const user = await getUserByUsername(data.username)
    if (!user) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: '用户不存在',
      }))
    }

    // 存在同名用户，进入登录流程
    // 校验密码
    const res = await verify(user.password, data.password)
    if (!res) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: '密码错误',
      }))
    }

    // 生成 JWToken 并返回
    const token = jwt.sign({ username: user.username }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
    return {
      statusCode: 200,
      statusMessage: '登录成功',
      data: {
        username: user.username,
        token,
      },
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      statusMessage: '登录失败',
    }))
  }
})
