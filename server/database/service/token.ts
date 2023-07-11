import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import type { UserInfo } from '~/types/user'

export function getTokenInfo(e: H3Event): Omit<UserInfo, 'exp'> | void {
  let userInfo

  const token = getHeader(e, 'Authorization')

  // 令牌不存在
  if (!token) {
    return sendError(e, createError({
      statusCode: 403,
      statusMessage: 'token不存在!',
    }))
  }

  try {
    // 解析token
    userInfo = jwt.verify(token, process.env.SECRET_TOKEN!) as UserInfo
    const currentTime = Date.now() / 1000

    if (userInfo.exp < currentTime) {
      return sendError(e, createError({
        statusCode: 403,
        statusMessage: 'token 过期',
      }))
    }

    return userInfo
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 403,
      statusMessage: 'token 不合法',
    }))
  }
}
