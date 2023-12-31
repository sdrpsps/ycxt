import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '~/server/database/repositories/userRepository'

interface userInfo extends JwtPayload {
  exp: number
  username: string
}

export default defineEventHandler(async (e) => {
  // 获取 token
  const token = getHeader(e, 'Authorization')
  if (!token) {
    return sendError(e, createError({
      statusCode: 403,
      statusMessage: 'token 过期',
    }))
  }

  let userInfo
  try {
    // 解析 token
    userInfo = jwt.verify(token, process.env.SECRET_TOKEN) as userInfo
    const currentTime = Date.now() / 1000
    if (userInfo.exp < currentTime) {
      return sendError(e, createError({
        statusCode: 403,
        statusMessage: 'token 过期',
      }))
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 401,
      statusMessage: 'token 不合法',
    }))
  }

  try {
    const user = await getUserByUsername(userInfo.username)
    if (!user) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: '用户不存在',
      }))
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 500,
      statusMessage: '获取用户信息失败',
    }))
  }
})
